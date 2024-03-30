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
    class Meta:
        model = User
        fields = ['id', '_id', 'email', 'username', 'isAdmin', 'name']

    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
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
