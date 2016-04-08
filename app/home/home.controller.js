(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['homeService'];

	function HomeController(homeService) {
		var vm = this;
		vm.map = { center: { latitude: 23.0, longitude: 72.58 }, zoom: 8 };

    vm.trackings = [{
        id: 1,
        geotracks: [{
            latitude: 23.0,
            longitude: 72.58
        },{
        	latitude: 23.05,
        	longitude: 74
        }, {
            latitude: 23.1,
            longitude: 72.58
        }]
    }];


		activate();

		function activate() {
			homeService.getBusPaths().then(function(success){
				console.log(success)
			})
		}

		function getPosts() {
			homeService.getPosts()
				.then(function(data) {
					vm.posts = data;
					return vm.posts;
				});
		}
	}
})();