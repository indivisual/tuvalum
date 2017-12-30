var Tvm = Tvm || {};

/* Create variables */
Tvm.vars = {
	'path' : '.tvm-create-ad',
	'page' : 0,
	'previousPage' : 0,
	'sections': 'section'
}

Tvm.bike = {};

Tvm.Init = function(){

	var _api = {};



	function init() {
		console.log('Initializing Tvm API')
		prepareGrid();
		Tvm.Events();
		Tvm.Navigation.goto(0);
	}


	function prepareGrid() {
		$(Tvm.vars.path + ' ' + Tvm.vars.sections).each(function(i, elem) {
			$(this).hide();
			$(this).attr('data-navigation',i);
		});
	}



	init();
	return _api;

};