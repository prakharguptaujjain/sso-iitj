from rest_framework.views import APIView
from rest_framework.response import Response
from .ldap_login import LDAPAuth, LDAP_ERRORS


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
