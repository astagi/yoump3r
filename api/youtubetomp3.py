from apiclient.discovery import build
from apiclient.errors import HttpError


class YouTubeToMp3ServiceException(Exception):
    pass


class YouTubeToMp3Service(object):

    def __init__(self, developer_key):
        self._developer_key = developer_key
        self._youtube = build(
            'youtube', 'v3',
            developerKey=self._developer_key
        )

    def _new_pl_item(self, item):
        item_id = item['id']['videoId']
        item_youtube_url = 'https://www.youtube.com/watch?v={0}'.format(item_id)
        pl_item = {
            'id': item_id,
            'title': item['snippet']['title'],
            'youtube_url': item_youtube_url,
            'mp3_url': 'http://www.youtubeinmp3.com/download/?video={0}&autostart=1'.format(item_youtube_url),
            'image': item['snippet']['thumbnails']['default'],
        }
        return pl_item

    def search(self, query, part='id,snippet', maxResults=10):
        if not query:
            return []
        try:
            search_response = self._youtube.search().list(
                q=query,
                part=part,
                maxResults=maxResults,
                type='video'
            ).execute()

            youtube_items = search_response.get("items", [])

            return [self._new_pl_item(item) for item in youtube_items]
        except HttpError as ex:
            raise YouTubeToMp3ServiceException(ex)
