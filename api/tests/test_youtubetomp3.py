from api.youtubetomp3 import YouTubeToMp3Service

from .utils import load_json


def test_youtube_playlist_transformation():

    youtube_item = load_json('api/tests/resources/youtube_item.json')
    service = YouTubeToMp3Service('')
    pl_item = service._new_pl_item(youtube_item)
    expected_item = {
        'youtube_url': 'https://www.youtube.com/watch?v=xo1VInw-SKc',
        'mp3_url': 'http://www.youtubeinmp3.com/download/?video=https://www.youtube.com/watch?v=xo1VInw-SKc&autostart=1',
        'id': 'xo1VInw-SKc',
        'image': {
            'url': 'https://i.ytimg.com/vi/xo1VInw-SKc/default.jpg',
            'width': 120,
            'height': 90
        },
        'title': 'Rachel Platten - Fight Song (Official Video)'
    }
    assert expected_item == pl_item