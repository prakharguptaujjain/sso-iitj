from django.contrib import admin
from user_profiles.models import StudentProfile
from django.contrib.auth.models import User

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'roll_no', 'mail', 'username','password','token','expiryTime')
    search_fields = ('name', 'roll_no', 'mail', 'username')
    list_filter = ('name', 'roll_no', 'mail')
    ordering = ('name', 'roll_no', 'mail')
    actions=['delete_selected']
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ('username',)
        return self.readonly_fields

    def save_model(self, request, obj, form, change):
        print("save_model called with the following parameters:")
        print(f"request: {request}")
        print(f"obj: {obj}")
        print(f"form: {form}")
        print(f"change: {change}")
        if not change:
            print("Creating new user:")
            print(f"Username: {obj.username}")
            print(f"Password: {obj.password}")
            user = User.objects.create_user(username=obj.username, password=obj.password)
            obj.user = user
        super().save_model(request, obj, form, change)

