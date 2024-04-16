from django.contrib import admin
from .models import * 

class WorksheetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')  # Add category to list display
    search_fields = ('name', 'category')  # Add category to search fields
    list_filter = ('category',)  # Add category to filter options  

# Register your models here.
admin.site.register(Question)
admin.site.register(UploadedImage)
admin.site.register(UserProfile)
admin.site.register(TopUpPackage)
admin.site.register(Comment)
admin.site.register(Subscription)
admin.site.register(PremiumPackage)
admin.site.register(Worksheet, WorksheetAdmin)