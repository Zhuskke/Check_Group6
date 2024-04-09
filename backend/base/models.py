from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='default_profile_picture.jpg', blank=True, null=True)
    points = models.IntegerField(default=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        if self.description:
            return f"{self.user.username} - {self.description}"
        else:
            return f"{self.user.username} - No description provided"


class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    points_spent = models.IntegerField(default=0)
    attachment = models.FileField(upload_to='uploaded_images/', null=True, blank=True)
    
    def __str__(self):
        return self.content

class UploadedImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploaded_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class TopUpPackage(models.Model):
    points = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.points} points at ${self.price}"
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)