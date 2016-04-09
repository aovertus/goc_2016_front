(function() {
	'use strict';

	angular
		.module('app.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$resource'];

	function homeService($resource) {

		var service = {
			getBusPositionInRealTime: getBusPositionInRealTime,
			GetStops: GetStops,
			getLines: getLines
		};
		return service;

		function getLines() {
			return $resource('http://goc-ror-2016.herokuapp.com/api/lines.json').query().$promise;
		}

		function GetStops(line) {
			return $resource('http://goc-ror-2016.herokuapp.com/api/lines/' + line +'.json').get().$promise;
		}

		function getBusPositionInRealTime(idBus){
			//var idBus = 'id=A=1@O=Limpertsberg, L.T.Michel Lucius@X=6,115154@Y=49,624698@U=82@L=200419022@B=1@p=1459856195';
			if(idBus){
				return $resource("http://travelplanner.mobiliteit.lu/restproxy/departureBoard?accessId=cdt&format=json&"+idBus).get()
				.$promise;
			}
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