import re
import requests

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

    @list_route(methods=['get'])
    def link(self, request):
        video_url = request.GET.get('video', '')
        link_url = "https://www.youtubeinmp3.com/fetch/?format=JSON&video={0}".format(video_url)
        r = requests.get(link_url)
        bundle = {'link': ''}
        try:
            bundle['link'] = r.json()['link']
        except:
            bundle['link'] = self._extract_url(r.text)
            return Response(bundle, 404)
        return Response(bundle)


    def _extract_url(self, text):
        match = re.search(".* url=(.*)\"", text)
        if match:
            return match.group(1)
        else:
            return None
