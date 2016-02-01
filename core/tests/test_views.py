def test_main_view_ok(client):

    response = client.get('/')
    assert 'CreatePlaylistController' in response.content