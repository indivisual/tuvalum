var Tvm = Tvm || {};
var isDesktop = $(window).width() > 767;

Tvm.Checkout = function(){

	var _api = {};
	var estado;

	function init() {
    /* Events */
    showDiscountCodeForm();
    openBoxes();
    setupArrowMenu();

    //Tvm.Overlay.setOverlay($('.tvm-checkout'), 'overlay-checkout', Tvm.Checkout.setupCheckoutTabs());
    
	}

	
  function showDiscountCodeForm() {
    $('.order-summary__discount-link').on('click', function(e) {
      if(e) {e.preventDefault();}
      
        $(this).slideUp(300, function() {
          $(this).parents('.order-summary__discount').find('form').slideDown(300);
        });
    });
  }

  function openBoxes() {
    $('.checkout-step').on('click','.payment-method--link',function(ev) {
      ev.preventDefault();
      if(!$(this).hasClass('open')) {
        $('.payment-method--link').removeClass('open');
        $('.payment-method--dropdown').slideUp();
        $(this).addClass('open').next('.payment-method--dropdown').slideDown();
      } else {
        $(this).removeClass('open').next('.payment-method--dropdown').slideUp();
      }
    })
  }

  function setupArrowMenu() {
    if($('.checkout-step-1').length) {
      $('.checkout-arrow-menu li:first').addClass('activated');
      if (!isDesktop) $('.order-summary').show();
    }

    if($('.checkout-step-2').length) {
      $('.checkout-arrow-menu li:first i').addClass('checked');
      $('.checkout-arrow-menu li:nth-child(2)').addClass('activated');
    }

    if($('.checkout-step-3').length) {
      $('.checkout-arrow-menu li:nth-child(1) i').addClass('checked');
      $('.checkout-arrow-menu li:nth-child(2) i').addClass('checked');
      $('.checkout-arrow-menu li:nth-child(3)').addClass('activated');
    }

  }

  _api.setupCheckoutTabs = function() {
    if (!isDesktop) {
      Tvm.Tabs.setupTabs($('.overlay .tabs.overlay-checkout'), 1, 'a', 'click', true); 
    }
  }

	init();
	return _api;

}();