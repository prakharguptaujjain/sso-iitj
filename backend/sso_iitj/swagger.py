from django.template.loader import render_to_string
from django.utils.translation import gettext_lazy as _
from drf_yasg import openapi
from drf_yasg.inspectors import SwaggerAutoSchema
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework import serializers

swagger_schema_view = get_schema_view(
    openapi.Info(
        title=_("Single-Sign-On IITJ"),
        default_version='v1',
        description=render_to_string('swagger/description.md'),
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email='gopathi.1@iitj.ac.in'),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


class LoginResponseSerializer(serializers.Serializer):
    " This is a Login serializer for showing my intent"
    username = serializers.CharField(
        help_text=_("This is the `username` of created object.")
    )
    password = serializers.CharField(
        help_text=_("This is the `password` of created object.")
    )


class LoginAutoSchema(SwaggerAutoSchema):
    python_template = None
    curl_template = "swagger/curl_sample.md"

    def get_operation(self, operation_keys=None):
        assert self.python_template, "All SwaggerAutoSchema class must define python_template filed in it"
        assert self.curl_template, "All SwaggerAutoSchema class must define curl_template filed in it"

        operation = super().get_operation(operation_keys)

        # Using django templates to generate the code
        template_context = {
            "request_url": self.request._request.build_absolute_uri(self.path),
        }

        operation.update({
            'x-code-samples': [
                {
                    "lang": "curl",
                    "source": render_to_string(self.curl_template, template_context)
                },
                {
                    "lang": "python",
                    "source": render_to_string(self.python_template, template_context)
                },
            ]
        })
        return operation

    @classmethod
    def responses(cls):
        return {
            201: LoginResponseSerializer(),
            400: "No active account found with the given credentials! Please Register.",
            403: "LDAP Authentication Failed",
        }
