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
def getUserProfile (request):
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
    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
        # Create UserProfile instance
        UserProfile.objects.create(user=user)
        
        # Create Question instance if question data is provided
        if 'question' in data:
            Question.objects.create(user=user, content=data['question'])
        
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    



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
            # Construct URL for default profile picture
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
        serializer = QuestionSerializer(question, context={'request': request})
        return Response(serializer.data)
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