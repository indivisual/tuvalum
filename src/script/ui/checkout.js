var Tvm = Tvm || {};
var isDesktop = $(window).width() > 767;

Tvm.Checkout = function(){

	var _api = {};
	var estado;

	function init() {

    if (!$('.tvm-checkout').length) {
      return true;
    }
    if ($('.checkout-step-2').length || $('.checkout-step-3').length) {
      $('.order-summary__discount').hide();
      if (!isDesktop) {
        $('.order-summary__price').hide();
        $('.order-summary__breakdown').hide();
        $('.order-summary__secure-payment').hide();
      }
    }

    /* Events */
    showDiscountCodeForm();
    openBoxes();
    setupArrowMenu();

    if (isDesktop) {
      setupStickySidebar();
    }
    
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

function setupStickySidebar() {
  var headerHeight = $('.header-section').outerHeight() + $('.arrow-menu').outerHeight();
  var windowHeight = $(window).outerHeight();
 
  $(window).on('scroll', function() {
    var scroll =  $(this).scrollTop();

    if (scroll >= headerHeight) {
      //sidebar to fixed, set height and custom scrollbar
      $('.order-summary').addClass('order-summary--fixed').css({
        top: 0,
        maxHeight: windowHeight
      });
    } else {
      removeStickySidebar();
      lastScrollTop = 0;
    }

    //sticky sidebar stop at footer
    if (scroll + $('.order-summary').outerHeight() > $('.checkout-foot').offset().top) {
      $('.order-summary').removeClass('order-summary--fixed').css({
        top: 'auto',
        bottom: 0
      });

      //scroll up
      if (scroll <= lastScrollTop) {
        //sticky sidebar is always visible
					if (scroll + headerHeight < $('.order-summary').offset().top) {
						$('.order-summary').css({
							top: 0,
							bottom: 'auto'
						});
					}
					lastScrollTop = scroll + 1;
      //scroll down
      } else {
        lastScrollTop = scroll - 1;
      }
    }
  });
}
function removeStickySidebar() {
  //sidebar to absolute, set height to auto and remove custom scrollbar
  $('.order-summary').removeClass('order-summary--fixed').css({
    top: 'auto',
    bottom: 'auto',
    maxHeight: 'auto'
  });
}