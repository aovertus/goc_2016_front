(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['homeService', 'uiGmapIsReady', '$timeout', '$mdSidenav', '$stateParams'];

	function HomeController(homeService, uiGmapIsReady, $timeout, $mdSidenav, $stateParams) {
		var vm = this;
		vm.getBusInRealTime = getBusInRealTime;
		vm.lastStopByBus;

		vm.line = $stateParams.line;

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

		vm.toggleList = function() {
			console.log('toggle');
      		$mdSidenav('left').toggle();
		};

		function changeMarkerPosition(marker) {
		    var latlng = new google.maps.LatLng(49.598875043690924, 6.104835322800303);
		    marker.setPosition(latlng);
		}

		function activate() {
				Promise.all([
					uiGmapIsReady.promise(1),
					homeService.GetStops(vm.line)
				])
				.then(function(results) {
					var map = results[0][0].map;
					function initialize() {
					    getDirections(map);
					}

					console.log(results[1].line.stops[0])

			    var request = {
			        origin: new google.maps.LatLng(results[1].line.stops[0].stop.coordonnes.lat, results[1].line.stops[0].stop.coordonnes.lng),
			        destination: new google.maps.LatLng(results[1].line.stops[7].stop.coordonnes.lat, results[1].line.stops[7].stop.coordonnes.lng),
			        waypoints: [],
			        travelMode: google.maps.TravelMode.TRANSIT
			    };

					results[1].line.stops.forEach(function(s) {
						var marker = new google.maps.Marker({
						    position: s.stop.coordonnes,
						    map: map
						});
						if (request.waypoints.lenght < 9){
							request.waypoints.push({
					      'location': new google.maps.LatLng(s.stop.coordonnes.lat, s.stop.coordonnes.lng),
					      'stopover': true						
							})
						}
					});

			    var directionsService = new google.maps.DirectionsService();



			    directionsService.route(request, function(result, status) {
			        if (status == google.maps.DirectionsStatus.OK) {
			            autoRefresh(map, result.routes[0].overview_path);
			        }
			    });

					initialize();

					function moveMarker(map, marker, latlng) {
					    marker.setPosition(latlng);
					    map.panTo(latlng);
					}

					function autoRefresh(map, pathCoords) {
					    var i, route, marker;
					    
					    route = new google.maps.Polyline({
					        path: [],
					        geodesic : true,
					        strokeColor: '#e91e63',
					        strokeOpacity: 1.0,
					        strokeWeight: 2,
					        editable: false,
					        map:map
					    });
					    
					    marker =  new google.maps.Marker({map:map, icon:"./app/bus.png"});

					    for (i = 0; i < pathCoords.length; i++) {                
					        setTimeout(function(coords) {
					            route.getPath().push(coords);
					            moveMarker(map, marker, coords);
					        }, 400 * i, pathCoords[i]);
					    }
					}

					function getDirections(map) {
					    var directionsService = new google.maps.DirectionsService();

					    directionsService.route(request, function(result, status) {
					        if (status == google.maps.DirectionsStatus.OK) {
					            autoRefresh(map, result.routes[0].overview_path);
					        }
					    });
					}

					//google.maps.event.addDomListener(window, 'load', initialize);
				})

		}

		function getBusInRealTime(/*line, idBusStop*/) {
			var line = '30';
			var idBusStop = ['id=A=1@O=Limpertsberg, L.T.Michel Lucius@X=6,115154@Y=49,624698@U=82@L=200419022@B=1@p=1459856195'
			,'id=A=1@O=Belair, Wampach@X=6,120548@Y=49,609812@U=82@L=200403020@B=1@p=1459856195',
			'id=A=1@O=Rollingergrund, Beim Klomp@X=6,111181@Y=49,618001@U=82@L=200425004@B=1@p=1459856195'];			
			idBusStop.forEach(function(bus_stop_id){
				//console.log(bus_stop_id);
				homeService.getBusPositionInRealTime(bus_stop_id)
				.then(function(success){
					//console.log("successsss");
					//console.log(success);
					for(var i = 0; i < success.Departure.length; i++){
						if(success.Departure[i].Product.line === line && success.Departure[i]){
							if(vm.lastStopByBus){
								if(vm.lastStopByBus.stop_id === success.Departure[i].stopid) {
									vm.lastStopByBus = {
										stop_id: success.Departure[i].stopid,
										real_time_stop: success.Departure[i].rtTime
									}
								}

							}
							else{
								vm.lastStopByBus = {
									stop_id: success.Departure[i].stopid,
									real_time_stop: success.Departure[i].rtTime
								}
							}
							console.log("last stop id", success.Departure[i].stopid)
							break;
						}
					}
					
					console.log(vm.lastStopByBus);
					//console.log(vm.arrayBusStopped);
					//return vm.lastStopByBus;
				})
				.catch(function(err){
					console.log('err',err);
				});
			})
			
		}

		function animateCircle(line) {
          var count = 0;
          window.setInterval(function() {
            count = (count + 1) % 200;

            var icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
        }, 20);
      }
	}
})();


