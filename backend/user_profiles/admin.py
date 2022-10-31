from django.contrib import admin
from user_profiles.models import ProgramAndBranch, StudentProfile


@admin.register(ProgramAndBranch)
class ProgramAndBranchAdmin(admin.ModelAdmin):
    class Meta:
        model = ProgramAndBranch
        fields = '__all__'


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    readonly_fields = ['registration_timestamp', ]
    list_display = ['__str__', 'roll_no', 'program_branch', 'year', 'registration_timestamp']
    list_filter = ['program_branch', 'year', 'registration_timestamp']
    ordering = ['roll_no', ]
    search_fields = ['roll_no', 'user__first_name', 'user__last_name']

    class Meta:
        model = StudentProfile
        fields = '__all__'
