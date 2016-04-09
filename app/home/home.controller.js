(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['homeService', 'uiGmapIsReady', '$timeout'];

	function HomeController(homeService, uiGmapIsReady, $timeout) {
		var vm = this;
		vm.map = { 
			center: { 
				// latitude: 49.6116700, 
				// longitude: 6.13
				latitude: 49.598875043690924,
				longitude: 6.104835322800303
			}, 
			zoom: 16 
		};


		activate();

		function changeMarkerPosition(marker) {
		    var latlng = new google.maps.LatLng(49.598875043690924, 6.104835322800303);
		    marker.setPosition(latlng);
		}

		function activate() {
			homeService.getBusPaths()
				.then(function() {
					console.log('test');
					return Promise.all([
						uiGmapIsReady.promise(1),
					]);
				})
				.then(function(results) {
					var map = results[0][0].map;
					function initialize() {
					    getDirections(map);
					}

					function moveMarker(map, marker, latlng) {
					    marker.setPosition(latlng);
					    map.panTo(latlng);
					}

					function autoRefresh(map, pathCoords) {
					    var i, route, marker;
					    
					    route = new google.maps.Polyline({
					        path: [],
					        geodesic : true,
					        strokeColor: '#FF0000',
					        strokeOpacity: 1.0,
					        strokeWeight: 2,
					        editable: false,
					        map:map
					    });
					    
					    marker=new google.maps.Marker({map:map, icon:"http://maps.google.com/mapfiles/ms/micons/blue.png"});

					    for (i = 0; i < pathCoords.length; i++) {                
					        setTimeout(function(coords) {
					            route.getPath().push(coords);
					            moveMarker(map, marker, coords);
					        }, 200 * i, pathCoords[i]);
					    }
					}

					function getDirections(map) {
					    var directionsService = new google.maps.DirectionsService();

					    var request = {
					        origin: new google.maps.LatLng(49.598875043690924, 6.104835322800303),
					        destination: new google.maps.LatLng(49.624193041532145, 6.122219430159065),
					        travelMode: google.maps.TravelMode.DRIVING
					    };
					    directionsService.route(request, function(result, status) {
					        if (status == google.maps.DirectionsStatus.OK) {
					            autoRefresh(map, result.routes[0].overview_path);
					        }
					    });
					}

					google.maps.event.addDomListener(window, 'load', initialize);
				})
				.catch(function(err) {
					console.log('err', err);
				});
		}
	}
})();


