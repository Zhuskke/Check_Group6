from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *  # Import your user model here, replace `.models` with the correct path to your user model
from .serializers import *
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    points = serializers.IntegerField(source='userprofile.points')
    is_active = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    password = serializers.CharField(write_only=True)
    is_premium = serializers.BooleanField(source='userprofile.is_premium', required=False)  # Include is_premium field

    class Meta:
        model = User
        fields = '__all__'

    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)

        # Update password if provided
        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        # Save the updated user instance
        instance.save()

        # Update UserProfile fields if present
        user_profile_data = validated_data.get('userprofile', {})
        if user_profile_data:
            user_profile = instance.userprofile
            user_profile.points = user_profile_data.get('points', user_profile.points)
            user_profile.save()

        return instance

    def create(self, validated_data):
        userprofile_data = validated_data.pop('userprofile', None)  # Extract UserProfile data
        
        user = User.objects.create_user(**validated_data)  # Create User instance
        
        if userprofile_data:
            UserProfile.objects.create(user=user, **userprofile_data)  # Create UserProfile instance
        
        return user

    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    question = serializers.SerializerMethodField(read_only=True)
    is_premium = serializers.BooleanField(source='userprofile.is_premium') # Include is_premium field

    class Meta:
        model = User
        fields = ['id', '_id', 'email', 'username', 'name', 'isAdmin', 'is_premium', 'token', 'question'] # Include is_premium field in fields

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    def get_question(self, obj):  # Implement this method to retrieve user's question
        question = Question.objects.filter(user=obj).last()  # Assuming you want to retrieve the last question created by the user
        if question:
            return question.content
        return None
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    attachment = serializers.FileField(required=False, allow_null=True)
    class Meta:
        model = Question
        fields = '__all__'

    def get_belongs_to_current_user(self, obj):
        request = self.context.get('request')
        return request and obj.user == request.user

class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ['id', 'image', 'uploaded_at']

    def create(self, validated_data):
        return UploadedImage.objects.create(**validated_data)

class TopUpPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopUpPackage
        fields = '__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    question = serializers.PrimaryKeyRelatedField(read_only=True)
    content = serializers.CharField(max_length=255)  

    class Meta:
        model = Comment
        fields = ['id', 'user', 'question', 'content', 'created_at']
class CommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentVote
        fields = ['user', 'comment', 'vote_type']

class AdminCommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    content = serializers.CharField(max_length=255)   

    class Meta:
        model = Comment
        fields = ['id', 'user', 'question', 'content', 'created_at']

class UserRegistrationSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    points = serializers.IntegerField(source='userprofile.points')
    is_active = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    password = serializers.CharField(write_only=True, required=False)
    is_premium = serializers.BooleanField(source='userprofile.is_premium', required=False)

    class Meta:
        model = User
        fields = '__all__'

    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)

        # Update password if provided
        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        # Save the updated user instance
        instance.save()

        # Update UserProfile fields if present
        user_profile_data = validated_data.get('userprofile', {})
        if user_profile_data:
            user_profile = instance.userprofile
            user_profile.points = user_profile_data.get('points', user_profile.points)
            user_profile.is_premium = user_profile_data.get('is_premium', user_profile.is_premium)  # Update is_premium field
            user_profile.save()

        return instance

    
class PremiumPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremiumPackage
        fields = '__all__'  

class WorksheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worksheet
        fields = '__all__'

class WorksheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worksheet
        fields = '__all__'

    def update(self, instance, validated_data):
        # Pop the 'file' field from validated_data
        uploaded_file = validated_data.pop('file', None)

        # Update the instance fields except for the 'file' field
        instance.name = validated_data.get('name', instance.name)
        instance.category = validated_data.get('category', instance.category)

        # Save the instance with the updated fields
        instance.save()

        # Check if a new file is provided
        if uploaded_file:
            # Update the file field if a new file is provided
            instance.file = uploaded_file

            # Save the instance with the new file
            instance.save()

        return instance
