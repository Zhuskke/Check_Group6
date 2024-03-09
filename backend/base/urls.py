from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'user-profile', UserProfileViewSet)

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name = 'user-profile'),
    path('users/', views.getUsers, name='users'),
    path('users/register/', views.registerUser, name='register'),
    path('', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
