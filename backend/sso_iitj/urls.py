from django.contrib import admin
from django.urls import path
from .views import LoginAndGetUserData

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginAndGetUserData.as_view(), name='login'),
]
