from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class LDAPErrorSerializer(serializers.Serializer):
    error = serializers.CharField(max_length=100, default="LDAP Error")
