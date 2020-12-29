"""blog_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import include, url, static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

from .settings import dev

schema_view = get_schema_view(
    openapi.Info(
        title="Enlighten Backend API",
        default_version='v1',
        description="enlighten backend api",
        terms_of_service="",
        contact=openapi.Contact(email='zhenghuanluck@163.com'),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    url('admin/', admin.site.urls),
    url(r'users/', include('users.urls')),
    url(r'article/', include('article.urls')),
    url(r'oauth/', include('oauth.urls')),
    url(r'business/', include('business.urls')),
    url(r'verification/', include('verification.urls')),

    # open_api文档可视化
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static.static(dev.MEDIA_URL, document_root=dev.MEDIA_ROOT)
