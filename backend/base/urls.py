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
    path('users/<int:user_id>/profile/', views.get_other_user_profile, name='user-profile'),
    path('profile-image/', views.get_profile_image, name='get-profile-image'),
    path('update-profile-image/', views.update_profile_image, name='update-profile-image'),
    path('questions/', QuestionListCreate.as_view(), name='question-list-create'),
    path('questions/<int:pk>/', views.get_question_details, name='question-detail'),
    path('search', views.searchQuestions, name='search-questions'),
    path('users/upload-image/', upload_image, name='upload-image'),
    path('users/uploaded-images/', get_uploaded_images, name='get-uploaded-images'),
    path('users/<int:user_id>/questions/', views.get_user_questions, name='user-questions'),
    path('user-points/', views.UserPointsView.as_view(), name='user-points'),
    path('delete-question/<int:pk>/', views.delete_question, name='delete-question'),
    path('user-description/', views.get_user_description, name='get-user-description'),
    path('update-description/', views.update_user_description, name='update-user-description'),
    path('top-up-packages/', views.get_top_up_packages, name='top-up'),
    path('purchase-points/<int:package_id>/', views.purchase_points, name='purchase-points'),
    path('package-details/<int:package_id>/', views.package_detail, name='package-detail'),
    path('admin/users/', views.AdminUserListCreateAPIView.as_view(), name='admin-user-list-create'),
    path('admin/users/<int:pk>/', views.AdminUserRetrieveUpdateDestroyAPIView.as_view(), name='admin-user-detail'),
    path('comments/<int:question_id>/', views.create_comment, name='comment-create'),
    path('admin/questions/', views.AdminQuestionListCreateAPIView.as_view(), name='admin-question-list-create'),
    path('admin/questions/<int:pk>/', views.AdminQuestionRetrieveUpdateDestroyAPIView.as_view(), name='admin-question-detail'),
    path('users/<int:user_id>/activate-subscription/', views.activate_subscription, name='activate-subscription'),
    path('premium-details/', get_premium_details, name='premium-details'),
    path('admin/top-up-packages/', TopUpPackageListCreateAPIView.as_view(), name='top-up-packages-list-create'),
    path('admin/top-up-packages/<int:pk>/', TopUpPackageRetrieveUpdateDestroyAPIView.as_view(), name='top-up-package-detail'),
    path('admin/create-top-up-package/', create_top_up_package, name='create-top-up-package'),
    path('admin/update-top-up-package/<int:pk>/', update_top_up_package, name='update-top-up-package'),
    path('admin/delete-top-up-package/<int:pk>/', delete_top_up_package, name='delete-top-up-package'),
    path('admin/comments/', views.AdminCommentListCreateAPIView.as_view(), name='admin-comment-list-create'),
    path('admin/comments/<int:pk>/', views.AdminCommentRetrieveUpdateDestroyAPIView.as_view(), name='admin-comment-detail'),
]