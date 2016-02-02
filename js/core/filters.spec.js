describe('Filter: orderSongs', function () {

  beforeEach(module('yoump3r.filters'));

  var orderSongsFilter;
  var songs = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5}
  ];

  beforeEach(inject(function($filter) {
    orderSongsFilter = $filter('orderSongs');
  }));

  it('has a orderSongs filter', function () {
    expect(orderSongsFilter).not.toBeNull();
  });

  it('returns elements if song is not defined', function () {
    var orderedSongs = orderSongsFilter(songs);
    expect(orderedSongs).toEqual(songs);
  });

  it('returns elements if song is not found', function () {
    var orderedSongs = orderSongsFilter(songs, {id: 6});
    expect(orderedSongs).toEqual(songs);
  });

  it('orders songs', function () {
    var orderedSongs = orderSongsFilter(songs, {id: 5});
    expect(orderedSongs[0].id).toEqual(5);
  });

});