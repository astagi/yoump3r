from rest_framework.decorators import list_route
from rest_framework.response import Response

from .views import SongViewSet


class MockSongViewSet(SongViewSet):

    @list_route(methods=['get'])
    def notfound(self, request):
        return Response('No video was found')

    @list_route(methods=['get'])
    def videotoolong(self, request):
        return Response('Your video is too long')
