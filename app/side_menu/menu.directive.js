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
      controllerAs: 'vm',
      templateUrl: 'app/side_menu/menu.html',
      controller: function($scope) {
        var vm = this;
          vm.toggleMenu = function() {
          console.log($mdSidenav);
          $mdSidenav('left').toggle();
        };
      }
    };

  }
})();