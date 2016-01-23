angular.module('yoump3r.filters', [])
.filter('orderSongs', function(){
  return function(elements, selectedSong) {
    if (!selectedSong) {
      return elements;
    }
    for ( var i = 0 ; i < elements.length ; i++ ) {
      if(elements[i].id == selectedSong.id) {
        var aux = elements[i];
        elements[i] = elements[0];
        elements[0] = aux;
        break;
      }
    }
    return elements;
  };
});