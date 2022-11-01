from rest_framework.response import Response
from .ldap_login import LDAPAuth, LDAP_ERRORS
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from drf_yasg.utils import swagger_auto_schema
from .swagger import (
    LoginAutoSchema
)
from rest_framework_simplejwt.views import TokenObtainPairView
from sso_iitj.serializer import MyTokenObtainPairSerializer


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
            serializer = MyTokenObtainPairSerializer(data=request.data)
            if serializer.is_valid():
                return Response(serializer.validated_data, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response({"error": LDAP_ERRORS[err]}, status=403)
