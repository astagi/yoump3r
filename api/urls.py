from django.conf import settings

if settings.TEST:
    from .mock_views import MockSongViewSet as SongViewSet
else:
    from .views import SongViewSet

from django.conf.urls import url, include
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register(r'songs', SongViewSet, 'song')

urlpatterns = [
    url(r'^', include(router.urls)),
]
