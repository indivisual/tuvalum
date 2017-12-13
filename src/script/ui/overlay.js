
/*
Requires jQuery.
*/

/* function to show and hide popups */
var isDesktop = $(window).width() > 767;

var Tvm = Tvm || {};
var container;

Tvm.Overlay = (function(){

	var _api = {};

	_api.setOverlay = function(container, type, callback) {

		/*container.append($('<div class="overlay"></div>'));*/
		$('.overlay').remove();

		var thisOverlayContent = type ? $('.overlay-wrapper#'+ type).html() : '' ;
		container.append($('<div class="overlay">').html(thisOverlayContent));

		$('.overlay').fadeIn(400, function() {
			closeOverlay();

			if (callback) { callback(); }

		});
	
		var position = isDesktop ? '50%' : 0;
		$('.overlay-content').css({top: '60%', visibility: 'visible'}).animate({
			top: position
		});
		


	};

	_api.removeOverlay = function() {
		$('.overlay').fadeOut(function () {
			$('.overlay').remove();
		});

	};

	function closeOverlay () {
		$('.overlay-close').on('click', function (e) {

			if ( $(this).attr('href') === '#') {
				e.preventDefault();
				_api.removeOverlay();
			}

		});

		//close layer on window click
		$('.overlay').on('click', function() {
			_api.removeOverlay();
		});
		$('.overlay-content').on('click', function(event){
			event.stopPropagation();
		});

	}



	return _api;

})();

