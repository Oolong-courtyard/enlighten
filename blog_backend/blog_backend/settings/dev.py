"""
Django settings for blog_backend project.

Generated by 'django-admin startproject' using Django 2.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""
import datetime
import os
import sys

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# Specify the directory path to the root path.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 把apps加入项目的搜索包路径中
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))
# 把内层blog_backend加入项目的搜索包路径中
sys.path.insert(0, BASE_DIR)
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ef-@^(&ol522la&9a&p0ie)!)7r+iw$oj4x-vr_^o7_$kt%*!g'

# SECURITY WARNING: don't run with debug turned on in production!
"""
当 DEBUG=False时，django不再对外提供静态文件
"""
DEBUG = True

ALLOWED_HOSTS = ["*"]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'django_filters',
    'rest_framework',
    'users.apps.UsersConfig',
    'article.apps.ArticleConfig',
    'oauth.apps.OauthConfig',
    # 'django.contrib.staticfiles',  # required for serving swagger ui's css/js files
    'drf_yasg',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'article.middleware.my_middleware,  # 添加中间件'
]

# 每页数量
NUM_OF_PER_PAGE = 15

# 配置文件中增加异常处理的相关配置
REST_FRAMEWORK = {
    # 异常处理
    'EXCEPTION_HANDLER': 'blog_backend.utils.exceptions.exception_handler',
    # 指定分页配置
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 15,  # 每页数目
    # 添加过滤配置选项,增加过滤功能
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    # 指定认证类
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

JWT_AUTH = {
    # 指明token的有效期
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
}

ROOT_URLCONF = 'blog_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'blog_backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'enlighten_db',
        'USER': 'postgres',
        'PASSWORD': 'gresql',
        'HOST': '106.15.8.3',
        'PORT': '5432',
    }
}

# 配置 django-redis 的存储位置信息
CACHES = {
    # 配置缓存中第一个存储区域:
    "default": {
        # 缓存使用redis进行存储
        "BACKEND": "django_redis.cache.RedisCache",
        # 缓存的位置: 0 号库
        "LOCATION": "redis://127.0.0.1:6379/0",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    },
    # 配置缓存中第二个存储区域:
    "session": {
        # 缓存使用redis进行存储
        "BACKEND": "django_redis.cache.RedisCache",
        # 缓存的位置: 1 号库
        "LOCATION": "redis://127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}
# 设置缓存引擎
SESSION_ENGINE = "django.contrib.sessions.backends.cache"
# 设置保存在缓存中的位置
SESSION_CACHE_ALIAS = "session"

# 配置日志打印信息
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,  # 是否禁用已经存在的日志器
    'formatters': {  # 日志信息显示的格式
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(lineno)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(module)s %(lineno)d %(message)s'
        },
    },
    'filters': {  # 对日志进行过滤
        'require_debug_true': {  # django在debug模式下才输出日志
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {  # 日志处理方法
        'console': {  # 向终端中输出日志
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'file': {  # 向文件中输出日志
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(os.path.dirname(BASE_DIR),
                                     "logs/enlighten.log"),  # 日志文件的位置
            'maxBytes': 300 * 1024 * 1024,
            'backupCount': 10,
            'formatter': 'verbose'
        },
    },
    'loggers': {  # 日志器
        'django': {  # 定义了一个名为django的日志器
            'handlers': ['console', 'file'],  # 可以同时向终端与文件中输出日志
            'propagate': True,  # 是否继续传递日志信息
            'level': 'INFO',  # 日志器接收的最低日志级别
        },
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# 一般我们把项目中的CSS、图片、js以及html等看做静态文件
"""
Django 仅在调试模式下（DEBUG=True）能对外提供静态文件。
当DEBUG=False工作在生产模式时，Django不再对外提供静态文件，
需要是用collectstatic命令来收集静态文件并交由其他静态文件服务器来提供。
"""
# 存放查找静态文件的路径
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static_files'),
)
# 访问静态文件的url前缀
STATIC_URL = '/static/'
# 图片保存在static_files下面的media文件夹下:
MEDIA_ROOT = os.path.join(BASE_DIR, "static_files/media")
# 上传文件的URL
MEDIA_URL = "/static_files/media/"
#
# # 自定义user模型类
AUTH_USER_MODEL = 'users.UserProfile'

# ================================================================
# 允许跨域
# 添加 django-cors-headers 的白名单, 使白名单中的 host 可以进行跨域请求
# CORS_ORIGIN_WHITELIST = (
#     # 'http://localhost:8080',
#     'http://106.15.8.3:80',
# )
# 跨域允许证书
CORS_ALLOW_CREDENTIALS = True

# 配置允许跨站访问本站的地址
CORS_ORIGIN_ALLOW_ALL = True
# CORS_ORIGIN_WHITELIST = (
#     'localhost:8000',  # 请求的域名(此处仅在CORS_ORIGIN_ALLOW_ALL = False时有效)
# )


# 定义允许的匹配路径正则表达式
CORS_URLS_REGEX = '^.*$'

# 设置允许访问的方法
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW',
)

# 设置允许的header
CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)
# ================================================================
# QQ登录参数
# 我们申请的 客户端id
QQ_CLIENT_ID = '101912333'
# 我们申请的 客户端秘钥
QQ_CLIENT_SECRET = '2d33b582c3b37cee6f8e704bd0834ce9'
# 我们申请时添加的: 登录成功后回调的路径
QQ_REDIRECT_URI = 'http://localhost:8080/index'
QQ_STATE = '/'
