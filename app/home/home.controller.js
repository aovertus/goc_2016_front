(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['homeService'];

	function HomeController(homeService) {
		var vm = this;
		vm.posts = [];

		activate();

		function activate() {
			getPosts();
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