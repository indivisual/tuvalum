var Tvm = Tvm || {};

Tvm.Catalog = (function () {

    var _api = {};

    function init() {
        if($('.product-card').length) setupAddToFavourites();
    }


    function setupAddToFavourites() {
        $('.add-to-favourites').on('click', function() {
            $(this).toggleClass('active');
            // Do something to back
        });
    }

    init();
    return _api;

})();