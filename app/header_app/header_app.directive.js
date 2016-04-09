(function() {
  'use strict';


  angular
  .module('app.headerApp')
  .directive('headerApp', initHeader);


  function initHeader() {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      templateUrl: 'app/header_app/template/header_app.html'
    };
  };
})();