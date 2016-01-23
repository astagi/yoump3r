angular.module('yoump3r.filters', [])
.filter('orderSongs', function(){
  return function(elements, selectedSong) {
    console.log(selectedSong);
    console.log(elements);
    for ( var i = 0 ; i < elements.length ; i++ ) {
      if(elements[i].id == selectedSong.id) {
        console.log('selected ');
        console.log(selectedSong)
        var aux = elements[i];
        elements[i] = elements[0];
        elements[0] = aux;
        break;
      }
    }
    return elements;
  };
});