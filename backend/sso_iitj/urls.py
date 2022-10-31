from django.contrib import admin
from django.urls import path
from .views import LoginAndGetUserData
from .swagger import swagger_schema_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginAndGetUserData.as_view(), name='login'),
    path('redoc/', swagger_schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger/', swagger_schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
