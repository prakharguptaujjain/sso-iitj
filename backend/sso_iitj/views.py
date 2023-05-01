from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .ldap_login import LDAPAuth, LDAP_ERRORS
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from drf_yasg.utils import swagger_auto_schema
from .swagger import LoginAutoSchema
from rest_framework_simplejwt.views import TokenObtainPairView
from sso_iitj.serializer import MyTokenObtainPairSerializer
from user_profiles.models import StudentProfile
from django.contrib.auth.models import User
import secrets

@method_decorator(name='post', decorator=swagger_auto_schema(
    responses=LoginAutoSchema.responses(),
    operation_id=_("Login and Get Token"),
))
class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = self.request.data.get('username')
        password = self.request.data.get('password')

        ldap_auth = LDAPAuth()
        ldap_data, err = ldap_auth.authenticate(username, password)
        if ldap_data is not None:
            # Check if the user already exists
            try:
                student_profile = StudentProfile.objects.get(username=username)
            except StudentProfile.DoesNotExist:
                # Create a new student profile
                print("Creating new student profile")
                print("#########################################3")
                student_profile = StudentProfile.objects.create(username=username,name=ldap_data['name'],roll_no=ldap_data['roll_no'],mail=ldap_data['mail'],password=password)
            user = StudentProfile.objects.get(username=username)
            # refresh = RefreshToken.for_user(user)
            # access_token = str(refresh.access_token)
            # refresh_token = str(refresh)
            # token_lifetime = refresh.access_token.lifetime.total_seconds() * 60
            
            # # Use the access token to login the user
            response = Response()
            token = secrets.token_hex(32)
            user.token = token
            user.save()
            response.set_cookie(key='jwt_access_token', value=token, httponly=True, max_age=86400)
            response_data = {
                'access_token': token,
                # 'refresh_token': refresh_token,
                'token_lifetime': 86400
            }
            response.data = response_data
            print(response_data)
            return response
        else:
            print("LDAP Authentication failed")
            return Response({"error": LDAP_ERRORS[err]}, status=403)
