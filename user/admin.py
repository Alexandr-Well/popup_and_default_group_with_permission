from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = (
        'username', 'email',
    )

    # fieldsets = (
    #     (None, {
    #         'fields': ('username', 'password')
    #     }),
    #     ('Personal info', {
    #         'fields': ('first_name', 'last_name', 'fathers_name', 'email', 'birthday')
    #     }),
    #     ('Permissions', {
    #         'fields': (
    #             'is_active', 'is_staff', 'is_superuser', 'verification',
    #             'groups', 'user_permissions'
    #         )
    #     }),
    #     ('Important dates', {
    #         'fields': ('last_login', 'date_joined')
    #     })
    # )




admin.site.register(CustomUser, CustomUserAdmin)