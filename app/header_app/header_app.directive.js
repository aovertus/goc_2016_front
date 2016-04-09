(function() {
  'use strict';


  angular
  .module('app.headerApp')
  .directive('headerApp', initHeader);

  initHeader.$inject = ['$mdSidenav'];


  function initHeader($mdSidenav) {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      templateUrl: 'app/header_app/template/header_app.html',
      controllerAs: 'vm',
      controller: function($scope) {
        var vm = this;
            vm.toggleMenu = function() {
            $mdSidenav('left').toggle();
        };
      }
    };
  };
})();