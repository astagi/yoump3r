angular.module('yoump3r.components', ['yoump3r.services.client'])

.directive('songrow', ['yoump3rclient', function (yoump3rclient) {
  return {
    scope: {
      ngModel: '=',
    },
    templateUrl: '/static/partials/songrow.html',
    controller: function ( $scope, $element ) {

    }
  };
}])