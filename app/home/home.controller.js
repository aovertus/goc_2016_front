(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['homeService', 'uiGmapIsReady'];

	function HomeController(homeService, uiGmapIsReady) {
		var vm = this;
		vm.map = { 
			center: { 
				latitude: 49.6116700, 
				longitude: 6.13
			}, 
			zoom: 8 
		};

		activate();

		function activate() {
			homeService.getBusPaths()
				.then(function() {
					console.log('test');
					return Promise.all([
						uiGmapIsReady.promise(1),
						homeService.getBusPath('553ddec59edb05fa3c02cb32')
					]);
				})
				.then(function(results) {
					var map = results[0][0].map;
					console.log(results[1]);
					map.data.addGeoJson(JSON.stringify(results[1]).features);
				})
				.catch(function(err) {
					console.log('err', err);
				});
		}
	}
})();