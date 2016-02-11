import httplib2

from api.views import SongViewSet
from apiclient.errors import HttpError
from mock import Mock

from .utils import load_json


class GoogleServiceMock:

    def __init__(self, youtube_expected_list):
        self.youtube_expected_list = youtube_expected_list

    def search(self, **kwargs):
        return self

    def list(self, **kwargs):
        return self

    def execute(self, **kwargs):
        return {'items': self.youtube_expected_list}


def test_youtube_search_ok(client, mocker):

    mocker.patch(
        'api.youtubetomp3.build',
        return_value=GoogleServiceMock(
            load_json('api/tests/resources/youtube_response.json')
        ),
        autospec=True
    )
    response = client.get(
        '/api/v1/songs/search/?q={0}'.format('my song')
    )
    assert len(response.data) == 3


def test_youtube_search_no_query(client, mocker):

    mocker.patch(
        'api.youtubetomp3.build',
        return_value=GoogleServiceMock(
            load_json('api/tests/resources/youtube_response.json')
        ),
        autospec=True
    )
    response = client.get(
        '/api/v1/songs/search/'
    )
    assert response.data == []

    response = client.get(
        '/api/v1/songs/search/?q='
    )
    assert response.data == []


def test_youtube_search_exception(client, mocker):
    mocker.patch(
        'api.tests.test_api.GoogleServiceMock.search',
        side_effect=HttpError(
            httplib2.Response({'status': 500, 'reason': 'BAD'}),
            'Service unavailable', 'uri'
        )
    )
    service_mock = GoogleServiceMock(
        load_json('api/tests/resources/youtube_response.json')
    )
    mocker.patch(
        'api.youtubetomp3.build',
        return_value=service_mock,
    )
    response = client.get(
        '/api/v1/songs/search/?q={0}'.format('my song')
    )
    assert response.status_code == 400
    assert response.data == {'error': '<HttpError 500 when requesting uri returned "BAD">'}


def test_extract_url_from_bad_responses():
    song_view_set = SongViewSet()

    url = song_view_set._extract_url('<meta href="things url=http://ciao.com"')
    assert url == 'http://ciao.com'

    url = song_view_set._extract_url('<meta bad things>')
    assert url == None
