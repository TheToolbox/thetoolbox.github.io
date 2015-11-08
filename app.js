/*function initialize() {
	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(44.5403, -78.5463),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(mapCanvas, mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
*/

document.addEventListener("DOMContentLoaded", function() {
	
	document.querySelector("#starter").addEventListener("click",startTimer);
	
	var timer;
	function startTimer() {
		timer = Date.now();
		setInterval(updateTime,10000);
	}
	
	function updateTime() {
		alert("BAD THINGS");
	}
});


