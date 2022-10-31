from django.db import models
from django.contrib.auth.models import User


class ProgramAndBranch(models.Model):
    CATEGORY = (
        ('BTech', 'BTech'),
        ('MTech', 'MTech'),
        ('Phd', 'Phd'),
        ('Msc', 'Msc'),
        ('MBA', 'MBA')
    )
    program = models.CharField(max_length=10, choices=CATEGORY, default="BTech")
    name = models.CharField(max_length=60, default="Computer Science")
    abbreviation = models.CharField(max_length=20, default="BTech CS", blank=True)

    def __str__(self):
        return self.program + " " + self.name

    class Meta:
        verbose_name = "Program and Branch"
        verbose_name_plural = "Programs and Branches"


class StudentProfile(models.Model):
    # Choices
    CATEGORY = (
        ('General', 'General'),
        ('OBC', 'OBC'),
        ('SC', 'SC'),
        ('ST', 'ST'),
    )
    NATION = (
        ('Indian', 'Indian'),
        ('Other', 'Other'),
    )

    GENDER = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Others', 'Others')
    )
    # Model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_image = models.ImageField(default='default.jpg', upload_to='student_images')
    roll_no = models.CharField(max_length=11)
    year = models.SmallIntegerField()
    program_branch = models.ForeignKey(ProgramAndBranch, on_delete=models.SET_NULL, null=True)
    gpa = models.FloatField()
    ug_college = models.TextField(blank=True, default='')
    ug_gpa = models.FloatField(null=True, blank=True, default=0.0)
    ug_passing_year = models.SmallIntegerField(null=True, blank=True, default=0)
    ug_program_branch = models.TextField(blank=True, default='')
    phone = models.CharField(max_length=15)
    dob = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER, default='Male')
    category = models.CharField(max_length=10, choices=CATEGORY)
    jee_air = models.IntegerField(null=True, blank=True)
    physical_disability = models.BooleanField(default=False)
    nationality = models.CharField(max_length=10, choices=NATION)
    permanent_address = models.TextField()
    current_address = models.TextField()
    x_year = models.SmallIntegerField()
    x_board_name = models.CharField(max_length=100)
    x_percentage = models.CharField(max_length=10)
    xii_year = models.SmallIntegerField()
    xii_board_name = models.CharField(max_length=100)
    xii_percentage = models.CharField(max_length=10)
    registration_timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.user.username
