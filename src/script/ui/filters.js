var Tvm = Tvm || {};

Tvm.Filters = (function(){

	var _api = {};
	var userSelection = {};


	function init() {
		_api.userFilter = new FilterSelection( userSelection );
		setupRangePriceInput();
		setupFilterTabs();
	}


	function FilterSelection( userSelection /* Array */ ) {
		this.minPrice = userSelection.minPrice;
		this.maxPrice = userSelection.maxPrice;
		this.marca = userSelection.marca;
		this.cuadro = userSelection.cuadro;
		this.ruedas = userSelection.ruedas;
		this.suspension = userSelection.suspension;
		this.recorrido = userSelection.recorrido;
		this.cassette = userSelection.cassette;
	}

	_api.setFilter = function( prop, value ) {
		_api.userFilter[prop] = value;
	}

	function setupRangePriceInput() {
		var sliderSections = document.getElementsByClassName("range-slider");
		for( var x = 0; x < sliderSections.length; x++ ){
			var sliders = sliderSections[x].getElementsByTagName("input");
			for( var y = 0; y < sliders.length; y++ ){
				if( sliders[y].type ==="range" ){
					sliders[y].oninput = getVals;

					// Manually trigger event first time to display values
					sliders[y].oninput();
				}
			}
		}
	}


	function getVals(){
		// Get slider values

		var parent = this.parentNode;
	  	var slides = parent.getElementsByTagName("input");
	    var slide1 = parseFloat( slides[0].value );
	    var slide2 = parseFloat( slides[1].value );

		if( slide1 > slide2 ) { var tmp = slide2; slide2 = slide1; slide1 = tmp; }

		var minPercent = slide1 / 100;
		var maxPercent = slide2 / 100;

		$('.range-slider').children($('.min-price')).css({
 			'backgroundColor':'#D6DCE4',
 			'filter':'progid:DXImageTransform.Microsoft.gradient(GradientType=1,startColorstr=#D6DCE4, endColorstr=#5891FF)',
 			'backgroundImage':'-moz-linear-gradient(left, #D6DCE4 ' + minPercent + '%, #5891FF ' + minPercent + '%,#5891FF ' + maxPercent +'%,#D6DCE4 ' + maxPercent +'%)',
			'backgroundImage':'linear-gradient(left, #D6DCE4 ' + minPercent + '%, #5891FF ' + minPercent + '%,#5891FF ' + maxPercent +'%,#D6DCE4 ' + maxPercent +'%)',
			'backgroundImage':'-webkit-linear-gradient(left, #D6DCE4 ' + minPercent + '%, #5891FF ' + minPercent + '%,#5891FF ' + maxPercent +'%,#D6DCE4 ' + maxPercent +'%)',
			'backgroundImage':'-o-linear-gradient(left, #D6DCE4 ' + minPercent + '%, #5891FF ' + minPercent + '%,#5891FF ' + maxPercent +'%,#D6DCE4 ' + maxPercent +'%)',
			'backgroundImage':'-ms-linear-gradient(left, #D6DCE4 ' + minPercent + '%, #5891FF ' + minPercent + '%,#5891FF ' + maxPercent +'%,#D6DCE4 ' + maxPercent +'%)',
 			'backgroundImage':'-webkit-gradient(linear, left bottom, right bottom, color-stop(' + minPercent + '%,#D6DCE4), color-stop(' + minPercent + '%,#5891FF),color-stop(' + maxPercent +'%,#5891FF),color-stop(' + maxPercent +'%,#D6DCE4))'
		})

		$('.min-price-printed').css({'left': minPercent + '%', 'transform': 'translateX(-' + minPercent + '%)' }).text(slide1 + '€');
		$('.max-price-printed').css({'left': maxPercent + '%', 'transform': 'translateX(-' + maxPercent + '%)' }).text(slide2 + '€');

		_api.setFilter('minPrice', slide1);
		_api.setFilter('maxPrice', slide2);
	}


	function setupFilterTabs() {
		$('.filters').on('click','.filters-option--header', function() {
			$(this).toggleClass('collapsed');
			$(this).next('.filters-option--container').slideToggle();
		});
	}


	if($('.filters').length) init();
	return _api;

})();