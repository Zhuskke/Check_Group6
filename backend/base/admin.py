from django.contrib import admin
from .models import * 
# Register your models here.
admin.site.register(Question)
admin.site.register(UploadedImage)
admin.site.register(UserProfile)
admin.site.register(TopUpPackage)
admin.site.register(Comment)
admin.site.register(Subscription)
admin.site.register(PremiumPackage)