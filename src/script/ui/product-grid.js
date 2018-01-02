//Requires masonry plugin

var Tvm = Tvm || {};

Tvm.ProductGrid = (function(){

    var _api = {};

	function init() {
        var options = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        }

        $('.grid-product').matchHeight(options);
	}

	if($('.grid-product').length) init();
	return _api;

})();

