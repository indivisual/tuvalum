var F6 = F6 || {};


F6.Cookies = (function(){

	var _api = {};

	function init() {
	}

	_api.getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name)===0) return c.substring(name.length,c.length);
		}
		return false;
	};

	_api.setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime()+(exdays*365*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	_api.deleteCookie = function(cname) {
		document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	};


	init();
	return _api;
})();

		

$('.close_cookies').on('click', function (e) {
	e.preventDefault();
	$('.layer-cookies').slideUp();
});



function fnCookies() {

	/*DESCOMENTAR PARA PROBAR SI SE ABREN LAS COOKIES NADA MÁS ENTRAR
	  F6.Cookies.deleteCookie("cookies");*/

	if( !F6.Cookies.getCookie("cookies") ) {
		$('.layer-cookies').show();
		F6.Cookies.setCookie("cookies", true, 365);
	}
	else {


	}
}


fnCookies();