from django.conf import settings

def global_settings(request):
    return {
        'MEDIA_BLOG_URL': settings.MEDIA_BLOG_URL,
        'MEDIA_IMG_URL': settings.MEDIA_IMG_URL,
    }