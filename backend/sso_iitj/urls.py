from django.contrib import admin
from django.urls import path
from .views import LoginAndGetUserData
from .swagger import swagger_schema_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginAndGetUserData.as_view(), name='login'),
    path('redoc/', swagger_schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger/', swagger_schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
