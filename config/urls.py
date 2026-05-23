from django.contrib import admin
from django.urls import path, include
from finwizz.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('finwizz.urls')),
]
if settings.DEBUG:
    # This maps the URL '/static/' to the folder defined in settings.STATICFILES_DIRS
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    
    # This maps the URL '/media/' to the folder defined in settings.MEDIA_ROOT
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)