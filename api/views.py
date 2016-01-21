from django.conf import settings
from django.shortcuts import render

from rest_framework import mixins
from rest_framework.decorators import list_route
from rest_framework import viewsets
from rest_framework.response import Response

from .youtubetomp3 import YouTubeToMp3Service, YouTubeToMp3ServiceException


class SongViewSet(viewsets.GenericViewSet):

    @list_route(methods=['get'])
    def search(self, request):
        try:
            youtube_mp3 = YouTubeToMp3Service(settings.YOUTUBE_DEV_KEY)
            songs = youtube_mp3.search(request.GET.get('q', ''))
            return Response(songs)
        except YouTubeToMp3ServiceException as ex:
            return Response({'error': unicode(ex)}, 400)

    def get_queryset(self):
        return []
