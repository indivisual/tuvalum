/*
Requires jQuery.
*/

var Tvm = Tvm || {};

var tabHeight;
var tabSelected;
var tabContentOpen;

Tvm.Tabs = (function(){

	var _api = {};

	function init() {

	}

	_api.setupTabs = function(tabsScope, tabActive, tabTrigger, tabEvent, equalHeight) {
		
		//setup initial tab
		//active current tab
		tabSelected = $('.tab', tabsScope).eq(tabActive);
		tabSelected.addClass('active');
		//show current tab content
		tabsScope.find('.tab-content').hide().removeClass('open');
		tabContentOpen = $('.tab-content', tabsScope).eq(tabActive);
		tabContentOpen.addClass('open');
		tabContentOpen.fadeIn(0, function () {
			setupTabHeight(tabsScope, tabContentOpen, equalHeight);
		});

		//trigger to change visible tab
		tabsScope.find('.tab ' + tabTrigger).off(tabEvent).on(tabEvent, function(e) {
			if(e) {e.preventDefault();}

			tabsScope.find('.tab').removeClass('active');
			tabSelected = $(this).parents('.tab').attr('data-js-target');
			//active new current tab
			$(this).parents('.tab').addClass('active');

			tabsScope.find('.tab-content').hide().removeClass('open');
			tabContentOpen = $('.tab-content', tabsScope).eq(tabSelected);
			//show new current tab content
			tabsScope.find(tabContentOpen).stop().fadeIn(300).addClass('open');
			
			//show new current tab content
			setupTabHeight(tabsScope, tabContentOpen, equalHeight);
		});
	};

	_api.removeTabs = function(tabsScope) {
		tabsScope.find('.tab-content').removeClass('open').hide();
		tabsScope.find('.tab').removeClass('active');
	}

	function setupTabHeight(tabsScope, tabContentOpen, equalHeight){

		if (equalHeight) {
			tabHeight = 0;
			tabsScope.find('.tab-content').each(function(i, el) {
				tabHeight = $(el).outerHeight() > tabHeight ? $(el).outerHeight() : tabHeight;
			});
		} else {
			tabHeight = tabContentOpen.outerHeight();
		}
		tabsScope.find('.tabs__container').animate({
			height: tabHeight
		},400);
	}

	

	return _api;

})();
