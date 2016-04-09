(function() {
  'use strict';

  angular
    .module('app.listBusLines')
    .controller('ListBusLinesController', ListBusLinesController);

  ListBusLinesController.$inject = ['homeService'];

  function ListBusLinesController(homeService) {
    var vm = this;

    activate();

    console.log("test");

    function activate() {
      homeService.getBusLines().then(function(success){
        console.log(success);
      });
    }
  }
})();