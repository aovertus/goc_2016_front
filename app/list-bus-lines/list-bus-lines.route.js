(function() {
    'use strict';

    angular
        .module('app.listBusLines')
        .run(appRun);

   appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'list-bus-lines',
                config: {
                    url: '/list-bus-lines',
                    templateUrl: 'app/list-bus-lines/list-bus-lines.html',
                    controller: 'ListBusLinesController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();


