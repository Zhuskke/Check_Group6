from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'user-profile', UserProfileViewSet)

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name = 'user-profile'),
    path('users/<int:user_id>/', views.getUser, name='users'),
    path('users/register/', views.registerUser, name='register'),
    path('', include(router.urls)),
    path('questions/', QuestionListCreate.as_view(), name='question-list-create'),
    path('questions/<int:pk>/', views.get_question_details, name='question-detail'),
    path('search/', views.searchQuestions, name='search-questions'),
    path('users/upload-image/', upload_image, name='upload-image'),
    path('users/uploaded-images/', get_uploaded_images, name='get-uploaded-images'),
    path('users/<int:user_id>/questions/', views.get_user_questions, name='user-questions'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
