var Tvm = Tvm || {};

Tvm.ScoreCircle = (function(){

    var _api = {};
    var RADIUS = 41;
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

	function init() {
        $('.score-circle').each(function() {
            $(this).find('.progress__value').css('strokeDasharray', CIRCUMFERENCE);
            _api.progress($(this));
        });
		
		
	}
	
    _api.progress = function(elem, value) {
        if(value == undefined) var value = elem.attr('data-score');
        
        var progress = value / 100;
        var dashoffset = CIRCUMFERENCE * (1 - progress);
        
        elem.find('.progress__value').css('strokeDashoffset', dashoffset);
    }

	if($('.score-circle').length) init();
	return _api;

})();

