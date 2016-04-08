(function() {
	'use strict';

	angular
		.module('app')
		.config(config);

	function config(uiGmapGoogleMapApiProvider, $mdThemingProvider) {
		uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.20', //defaults to latest 3.X anyhow
	        libraries: 'weather,geometry,visualization'
    	});

    	$mdThemingProvider.theme('default')
    		.primaryPalette('indigo')
    		.accentPalette('pink');
	}

})();