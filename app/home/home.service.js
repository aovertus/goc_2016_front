(function() {
	'use strict';

	angular
		.module('app.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$resource'];

	function homeService($resource) {

		var service = {
			getBusLines: getBusLines,
			getBusPath: getBusPath,
			getBusPaths: getBusPaths
		};

		var busLines = [];
		return service;

		function getBusLines() {
			if (busLines.length !== 0) {
				return busLines;
			}
			return $resource('http://opendata.vdl.lu/odaweb/index.jsp?describe=1').get().$promise.then(function(success){
				success.data.forEach(function(busLine){
					if (busLine.i18n.fr.name.indexOf("Ligne") > -1) {
						busLines.push(busLine);
					}
				});
				return Promise.resolve(busLines);
			});
		}

		function getBusPath(id){
			var busLine = busLines.find(function(busline) { 
				return busline.id == id;
			});

			if (busLine.path) {
				return busLine;
			} else {
				return $resource("http://opendata.vdl.lu/odaweb/?cat="+busLine.id).get().$promise.then(function(success){
					success.features.forEach(function(feature){
						feature.properties.name = feature.properties.name.replace("<br>", "");
					});
					busLine.path = success;
					return Promise.resolve(busLine);			
				});
			}
		}

		function getBusPaths(){
			return getBusLines().then(function(tmpBusLines) {
				tmpBusLines.forEach(function(tmpBusLine) {
					getBusPath(tmpBusLine.id);
				});
				return Promise.resolve(busLines);
			});
		}


		// function initBusLines(){
		// 	if (!busLines){
		// 		return busLines;
		// 	}
		// 	return getBusLines()
		// 		.then(function(success){
		// 			var promises = [];
		// 			success.data.forEach(function(busLine){
		// 				if (busLine.i18n.fr.name.indexOf("Ligne") > -1) {
		// 					promises.push($resource("http://opendata.vdl.lu/odaweb/?cat="+busLine.id).get().$promise);
		// 				} 			
		// 			})
		// 			console.log('promises', promises);
		// 			return Promise.all(promises);
		// 		})
		// 		.then(function(results) {
		// 				console.log('results', results);
		// 					results.forEach(function(success) {
		// 						success.features.forEach(function(feature){
		// 							feature.properties.name = feature.properties.name.replace("<br>", "");
		// 						})
		// 						busLines[busLine.id] = success;
		// 					})
		// 			console.log("test")
		// 			return Promise.resolve(busLines);
		// 		})
		// }
	}
})();