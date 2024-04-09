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


    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    question = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'email', 'username', 'name', 'isAdmin', 'token', 'question']

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
    attachment = serializers.FileField(required=False)
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