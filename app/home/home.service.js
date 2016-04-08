(function() {
	'use strict';

	angular
		.module('app.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$resource'];

	function homeService($resource) {
		var resource = $resource('http://opendata.vdl.lu/odaweb/?cat=553ddec59edb05fa3c02cb32');

		var service = {
			getData: getData
		};
		return service;


		function getData() {
			return resource.get().$promise;
		}
	}
})();