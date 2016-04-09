(function() {
	'use strict';

	angular
		.module('app')
		.config(config);

	function config(uiGmapGoogleMapApiProvider, $mdThemingProvider, $mdIconProvider) {
		uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.20', //defaults to latest 3.X anyhow
	        libraries: 'weather,geometry,visualization'
    	});

    	 $mdIconProvider.defaultIconSet()
              .icon("menu", "./app/menu.svg", 24);

    	$mdThemingProvider.theme('default')
    		.primaryPalette('indigo')
    		.accentPalette('pink');
	}

})();