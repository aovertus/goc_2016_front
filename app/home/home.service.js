(function() {
	'use strict';

	angular
		.module('app.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$resource'];

	function homeService($resource) {
		var resource = $resource('http://adneom.herokuapp.com/api/posts');

		var service = {
			getPosts: getPosts
		};
		return service;


		function getPosts() {
			return resource.query('http://adneom.herokuapp.com/api/posts').$promise;
		}
	}
})();