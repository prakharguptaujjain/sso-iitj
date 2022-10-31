from rest_framework.views import APIView
from rest_framework.response import Response
from .ldap_login import LDAPAuth, LDAP_ERRORS
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from drf_yasg.utils import swagger_auto_schema
from .swagger import (
    LoginAutoSchema
)


@method_decorator(name='post', decorator=swagger_auto_schema(
    responses=LoginAutoSchema.responses(),
    operation_id=_("Login and Get Token"),
))
class LoginAndGetUserData(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')

        ldap_auth = LDAPAuth()
        ldap_data, err = ldap_auth.authenticate(username, password)

        if ldap_data is not None:
            return Response(ldap_data, status=200)
        else:
            if err == 1 or err == 5:
                return Response(LDAP_ERRORS[err], status=500)
            elif err == 2:
                return Response(LDAP_ERRORS[err], status=401)
            elif err == 3:
                return Response(LDAP_ERRORS[err], status=403)
            elif err == 4:
                return Response(LDAP_ERRORS[err], status=403)
