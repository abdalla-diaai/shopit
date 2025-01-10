from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomerUser

# Register your models here.
class CustomerUserAdmin(UserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'first_name', 'last_name', 'email', 'city', 'state', 'address', 'phone', 'password1', 'password2'),
        }),
    )

admin.site.register(CustomerUser, CustomerUserAdmin)
