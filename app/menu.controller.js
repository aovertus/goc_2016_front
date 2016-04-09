(function() {
  'use strict';

  angular
    .module('app')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$mdSidenav'];

  function MenuController($mdSidenav) {
    var vm = this;

    activate();

    function toggle() {
      $mdSidenav('left')
          .toggle()
          .then(function(response) {
            console.log(response);
          });
    }

    function activate() {
      
    }
  }
})();