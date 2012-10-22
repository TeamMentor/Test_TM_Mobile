// Photoswipe Call
$(document).ready(function(){

	var myPhotoSwipe = $("#gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });

});


// Google Maps V3


// Slider Call
$(document).ready(function() {
	$('.slider').cycle({
		fx: 'scrollVert', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
		prev:   '#prev', 
		next:   '#next'
	});
});


// Other Scripts
$(document).bind("mobileinit", function(){
  $.mobile.touchOverflowEnabled = true;
});
 
