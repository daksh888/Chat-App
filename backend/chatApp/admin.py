from django.contrib import admin
from chatApp.models import MyUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class MyUserAdmin(BaseUserAdmin):
    list_display = ['id', 'email', 'name', 'is_active', 'is_admin']
    list_filter = ('is_admin',)
    search_fields = ('email',)
    ordering = ('email', 'id')
    filter_horizontal = ()

    # Remove 'username' field and adjust fieldsets
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
    )

    # Customizing add fieldset to remove 'username'
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_active', 'is_admin'),
        }),
    )

admin.site.register(MyUser, MyUserAdmin)
