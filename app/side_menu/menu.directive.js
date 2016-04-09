(function() {
  'use strict';


  angular
  .module('app.menu')
  .directive('sideMenu', initMenu);

  initMenu.$inject = ['$mdSidenav'];

  function initMenu($mdSidenav) {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      templateUrl: 'app/side_menu/menu.html',
      link: function (scope) {
        scope.toggleMenu = function() {
          console.log($mdSidenav);
          $mdSidenav('left')
            .close()
            .then(function(){
              console.log("menu close!");
            });
        }
      }
    };
  };
})();