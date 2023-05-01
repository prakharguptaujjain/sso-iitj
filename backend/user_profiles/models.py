from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
import time

class StudentProfile(models.Model):
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=25)
    mail = models.EmailField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=250)
    token = models.CharField(max_length=500)
    expiryTime = models.FloatField(max_length=100,default=time.time() + 86400)

    def save(self, *args, **kwargs):
        # Hash the password before saving
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def verify_user_with_token(self, user,token):
        if user.token == token:
            return user
        else:
            return None
        
    def __str__(self):
        return self.user.username