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
				latitude: 45, 
				longitude: -73 
			}, 
			zoom: 8 
		};

		activate();

		function activate() {
			Promise.all([
				uiGmapIsReady.promise(1),
				homeService.getData()
			])
			.then(function(results) {
				var map = results[0][0].map;
				console.log('map', map);
				map.data.loadGeoJson('http://opendata.vdl.lu/odaweb/?cat=4f33bc2e6613c9dafd6e6907');
			})
			.catch(function(err) {
				console.log('err', err);
			});
		}
	}
})();