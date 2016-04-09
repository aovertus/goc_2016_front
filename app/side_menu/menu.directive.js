(function() {
  'use strict';

  angular
    .module('app.menu')
    .directive('sideMenu', initMenu);

  initMenu.$inject = ['$mdSidenav', 'homeService', '$state'];

  function initMenu($mdSidenav, homeService, $state) {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      controllerAs: 'vm',
      templateUrl: 'app/side_menu/menu.html',
      controller: function($scope, $state) {
        var vm = this;
          homeService.getLines().then(function(lines) {
            vm.lines = lines;
          });

          vm.changeLine = function(line) {
            console.log('line');
            $state.go('home', {line: line});
          };

          vm.toggleMenu = function() {
            $mdSidenav('left').toggle();
        };
      }
    };

  }
})();