from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth.hashers import make_password
from rest_framework import status, viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.db.models import Q
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.templatetags.static import static
from django.urls import reverse
from django.http import JsonResponse
from django.db import IntegrityError

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
            
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUserProfile(request):
    user_id = request.query_params.get('user_id')
    if user_id:
        user = get_object_or_404(User, id=user_id)
    else:
        user = request.user
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    serializer = UserRegistrationSerializer(data=data)  # Use UserRegistrationSerializer for registration

    if serializer.is_valid():
        user = serializer.save()
        # Create UserProfile instance
        UserProfile.objects.create(user=user)
        
        # Create Question instance if question data is provided
        if 'question' in data:
            Question.objects.create(user=user, content=data['question'])
        
        user_serializer = UserSerializerWithToken(user, many=False)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def get_other_user_profile(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        user_profile = UserProfile.objects.get(user=user)
        profile_data = serializer.data
        profile_data['profile_picture_url'] = user_profile.profile_picture.url if user_profile.profile_picture else None
        profile_data['description'] = user_profile.description
        return Response(profile_data)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    parser_classes = [MultiPartParser, FormParser]  # Add parsers for handling file uploads

    @action(detail=False, methods=['post'], url_path='upload-profile-picture')
    def upload_profile_picture(self, request):
        user_profile = UserProfile.objects.get(user=request.user)

        if 'profile_picture' in request.FILES:
            user_profile.profile_picture = request.FILES['profile_picture']
            user_profile.save()
            serializer = self.get_serializer(user_profile)
            return Response(serializer.data)
        else:
            return Response({'error': 'No profile picture provided.'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_image(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        if user_profile.profile_picture:
            profile_picture_url = user_profile.profile_picture.url
            return Response({'profile_picture_url': profile_picture_url})
        else:
            default_profile_picture_url = request.build_absolute_uri(settings.MEDIA_URL + 'default_profile_picture.jpg')
            return Response({'profile_picture_url': default_profile_picture_url})
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile_image(request):
    user_profile = UserProfile.objects.get(user=request.user)
    if 'profile_picture' in request.FILES:
        user_profile.profile_picture = request.FILES['profile_picture']
        user_profile.save()
        return Response({'message': 'Profile picture updated successfully'})
    else:
        user_profile.profile_picture.delete()
        return Response({'message': 'Profile picture removed successfully'})

        

class QuestionListCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        points_spent = int(self.request.data.get('points_spent', 0))
        attachment = self.request.data.get('attachment', None)
        profile = UserProfile.objects.get(user=user)
        if profile.points >= points_spent:
            serializer.save(user=user, points_spent=points_spent, attachment=attachment)
            profile.points -= points_spent
            profile.save()
        else:
            raise serializers.ValidationError("Insufficient points")
        
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

@api_view(['DELETE'])
def delete_question(request, pk):
    question = Question.objects.get(pk=pk)
    question.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_question_details(request, pk):
    try:
        question = Question.objects.get(pk=pk)
        print('question', question.user)
        user = UserProfile.objects.get(user=question.user)
        print('user', user.profile_picture)
        serializer = QuestionSerializer(question, context={'request': request})
        
        serializer_data = serializer.data
        serializer_data['user_profile_link'] = request.build_absolute_uri(reverse('user-profile') + f'?user_id={question.user.id}')
        serializer_data['user_profile_picture_url'] = user.profile_picture.url if user.profile_picture else None
        
        return Response(serializer_data)
    except Question.DoesNotExist:
        return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)



    
    
@api_view(['GET'])
def searchQuestions(request):
    search_query = request.GET.get('q')
    if search_query:
        questions = Question.objects.filter(content__icontains=search_query)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'No search term provided'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    serializer = UploadedImageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['user'] = request.user
        serializer.save()
        return Response({'imageUrl': serializer.data['image']}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_uploaded_images(request):
    images = UploadedImage.objects.filter(user=request.user)
    serializer = UploadedImageSerializer(images, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_user_questions(request, user_id):
    questions = Question.objects.filter(user=user_id)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


class UserPointsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        points = user_profile.points
        return Response({'points': points})
    
@api_view(['DELETE'])
def delete_question(request, pk):
    try:
        question = Question.objects.get(pk=pk)
        question.delete()
        return Response({'message': 'Question deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Question.DoesNotExist:
        return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_description(request):
    user_profile = request.user.userprofile
    description = user_profile.description
    return Response({'description': description})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_description(request):
    user_profile = request.user.userprofile
    new_description = request.data.get('description', '')
    user_profile.description = new_description
    user_profile.save()
    return Response({'message': 'Description updated successfully'})

@api_view(['GET'])
def get_top_up_packages(request):
    packages = TopUpPackage.objects.all()
    serializer = TopUpPackageSerializer(packages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def purchase_points(request, package_id):  # Accept 'package_id' as an argument
    if package_id:
        try:
            package = TopUpPackage.objects.get(pk=package_id)
            user_profile = request.user.userprofile
            user_profile.points += package.points
            user_profile.save()
            return Response({'message': 'Points added successfully'})
        except TopUpPackage.DoesNotExist:
            return Response({'error': 'Point package not found'}, status=404)
    else:
        return Response({'error': 'Package ID not provided'}, status=400)

@api_view(['GET'])
def package_detail(request, package_id):
    try:
        package = TopUpPackage.objects.get(id=package_id)
        serializer = TopUpPackageSerializer(package)
        return Response(serializer.data)
    except TopUpPackage.DoesNotExist:
        return Response({'error': 'Package not found'}, status=404)

class AdminUserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class AdminUserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer 
    permission_classes = [IsAdminUser]

class UserWorksheetListAPIView(generics.ListCreateAPIView):
    queryset = Worksheet.objects.all()
    serializer_class = WorksheetSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request, question_id):
    # Retrieve the question object based on question_id
    question = get_object_or_404(Question, pk=question_id)

    if request.method == 'POST':
        # Create a new comment using the provided data in the request
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            # Save the comment with the authenticated user and associated question
            serializer.save(user=request.user, question=question)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return a response indicating that the method is not allowed
        return Response({"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def get_comments_for_question(request, question_id):
    # Get the question object
    question = get_object_or_404(Question, pk=question_id)
    
    # Get all comments related to the question
    comments = Comment.objects.filter(question=question)
    
    comments_list = []
    for comment in comments:
        # Retrieve vote counts for the current comment
        upvotes_count = CommentVote.objects.filter(comment=comment, vote_type='upvote').count()
        downvotes_count = CommentVote.objects.filter(comment=comment, vote_type='downvote').count()
        total_votes = upvotes_count + downvotes_count
        
        # Serialize the comment data
        comment_data = {
            'id': comment.id,
            'user': comment.user.username,
            'user_id': comment.user.id,
            'content': comment.content,
            'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'upvotes': upvotes_count,
            'downvotes': downvotes_count,
            'total_votes': total_votes
        }
        
        comments_list.append(comment_data)

    # Return JSON response with the list of comments
    return JsonResponse({'comments': comments_list})

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_comment_vote(request):
    user_id = request.data.get('user_id')
    comment_id = request.data.get('comment_id')
    vote_type = request.data.get('vote_type')

    if not user_id or not comment_id or vote_type not in ['upvote', 'downvote']:
        return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, pk=user_id)
    comment = get_object_or_404(Comment, pk=comment_id)

    try:
        comment_vote = CommentVote.objects.get(user=user, comment=comment)

        # User has already voted on this comment
        if comment_vote.vote_type == vote_type:
            # User is trying to vote the same type twice, remove the vote
            comment_vote.delete()
            return Response({'message': 'Vote removed successfully'}, status=status.HTTP_200_OK)
        else:
            # User is changing their vote type, update the vote_type
            comment_vote.vote_type = vote_type
            comment_vote.save()
            return Response({'message': 'Vote updated successfully'}, status=status.HTTP_200_OK)

    except CommentVote.DoesNotExist:
        # User hasn't voted on this comment before, create a new vote
        try:
            serializer = CommentVoteSerializer(data={'user': user_id, 'comment': comment_id, 'vote_type': vote_type})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({'error': 'Integrity error occurred while creating the vote'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def update_points_on_upvote(request):
    user_id = request.query_params.get('user_id')

    if not user_id:
        return JsonResponse({'error': 'User ID not provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve the user object
        user = get_object_or_404(User, pk=user_id)

        # Retrieve all comments by the user
        user_comments = Comment.objects.filter(user=user)

        # List to hold updated comments data
        updated_comments_data = []
        congratulatory_messages = []  # Initialize list to hold congratulatory messages

        # Loop through user's comments to gather data and update points
        for comment in user_comments:
            # Calculate total upvotes for the comment
            upvotes_count = comment.commentvote_set.filter(vote_type='upvote').count()
            downvotes_count = comment.commentvote_set.filter(vote_type='downvote').count()
            total_votes = upvotes_count + downvotes_count  # Calculate net votes

            # Check if the comment has reached the upvote threshold and points haven't been awarded yet
            if total_votes >= 1 and not comment.points_awarded:
                # Retrieve the points_spent from the last question asked by the user
                last_question = user.question_set.last()  # Assuming user has asked questions
                if last_question:
                    points_spent = last_question.points_spent

                    # Award points back to the user's profile
                    user_profile, created = UserProfile.objects.get_or_create(user=user)
                    user_profile.points += points_spent
                    user_profile.save()

                    # Update comment's points_awarded flag
                    comment.points_awarded = True
                    comment.save()

                    # Include a congratulatory message
                    congratulatory_messages.append(
                        f'Congratulations! You earned {points_spent} points for reaching the upvote threshold.'
                    )

            # Include comment data in the response
            comment_data = {
                'id': comment.id,
                'content': comment.content,
                'upvotes': upvotes_count,
                'downvotes': downvotes_count,
                'total_votes': total_votes,
                'points_awarded': comment.points_awarded
            }
            updated_comments_data.append(comment_data)

        # Prepare the response data including user ID, updated comments, and congratulatory messages
        response_data = {
            'user_id': user_id,
            'comments': updated_comments_data,
        }

        if congratulatory_messages:
            response_data['congratulatory_messages'] = congratulatory_messages

        return JsonResponse(response_data, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminQuestionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class AdminQuestionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        clear_attachment = request.data.get('clearAttachment') == 'true'
        
        # If the attachment is being cleared, remove the existing attachment
        if clear_attachment:
            if instance.attachment:
                instance.attachment.delete()
                instance.attachment = None

        self.perform_update(serializer)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def activate_subscription(request, user_id):  # Accept 'user_id' as a parameter
    try:
        user_profile = UserProfile.objects.get(user_id=user_id)  # Retrieve UserProfile using user_id

        # Check if the user is already a premium member
        if user_profile.is_premium:
            return Response({'error': 'User is already a premium member'}, status=status.HTTP_400_BAD_REQUEST)

        user_profile.is_premium = True
        user_profile.save()
        # return Response({'message': 'Subscription activated successfully'})
    
        # Return updated user profile data
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_premium_details(request):
    try:
        premium_details = PremiumPackage.objects.all()
        serializer = PremiumPackageSerializer(premium_details, many=True)
        return Response(serializer.data)
    except PremiumPackage.DoesNotExist:
        return Response({'error': 'Premium details not found'}, status=status.HTTP_404_NOT_FOUND)

class TopUpPackageListCreateAPIView(generics.ListCreateAPIView):
    queryset = TopUpPackage.objects.all()
    serializer_class = TopUpPackageSerializer
    permission_classes = [permissions.IsAdminUser]

class TopUpPackageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TopUpPackage.objects.all()
    serializer_class = TopUpPackageSerializer
    permission_classes = [permissions.IsAdminUser]

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_top_up_package(request):
    serializer = TopUpPackageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_top_up_package(request, pk):
    try:
        package = TopUpPackage.objects.get(pk=pk)
    except TopUpPackage.DoesNotExist:
        return Response({'error': 'Package not found'}, status=404)

    serializer = TopUpPackageSerializer(package, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_top_up_package(request, pk):
    try:
        package = TopUpPackage.objects.get(pk=pk)
    except TopUpPackage.DoesNotExist:
        return Response({'error': 'Package not found'}, status=404)

    package.delete()
    return Response(status=204)

class AdminCommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = AdminCommentSerializer
    permission_classes = [permissions.IsAdminUser]
class AdminCommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = AdminCommentSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminWorksheetListCreateAPIView(generics.ListCreateAPIView):
    queryset = Worksheet.objects.all()
    serializer_class = WorksheetSerializer
    permission_classes = [permissions.IsAdminUser]
class AdminWorksheetRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Worksheet.objects.all()
    serializer_class = WorksheetSerializer
    permission_classes = [permissions.IsAdminUser]
    parser_classes = [MultiPartParser] 

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        uploaded_file = request.data.get('file', None)

        # Assuming you don't modify the file URL here
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            if uploaded_file:
                instance.file = uploaded_file
                instance.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    currentPassword = request.data.get('currentPassword')
    newPassword = request.data.get('newPassword')
    
    user = request.user
    
    # Verify the current password
    if not user.check_password(currentPassword):
        return Response({'error': 'Incorrect current password'}, status=400)
    
    # Update the password
    user.password = make_password(newPassword)
    user.save()
    
    return Response({'message': 'Password changed successfully'})
