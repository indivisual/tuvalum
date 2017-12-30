// ------------------------------------
//                    __
//        /   _ /.  ./_    _  /
//       //|//_//|//__//_//_|/_
//       *  www.indivisual.es  *  
//
// ------------------------------------
// Events page for Tuvalum Add Product
// Author: Carlos Prat (indivisual.es)
// Date: July 2017.

var Tvm = Tvm || {};

Tvm.Events = function(){

	var _api = {};

	function init() {
		setNavigationButtons();
		setChooseUniqueButtons();
		setChooseMultipleButtons();
		setFileImageButtons();
	}


	/* Adds events to data-goto buttons */
	function setNavigationButtons() {
		$( Tvm.vars.path ).on( 'click', '[data-goto]', function( event ) {
			event.preventDefault();
			if(typeof $(this).attr('data-goto') == 'number' ) {
				Tvm.Navigation.goto($(this).attr('data-goto'));
			} else {
				switch($(this).attr('data-goto')) {
					case 'next':
						Tvm.Navigation.next();
						break;

					case 'prev':
						Tvm.Navigation.prev();
						break;

					default:
						Tvm.Navigation.goToSection($(this).attr('data-goto') + '-section');
				}
			}
		});
	}


	/* Adds functionality to choose-unique buttons */
	function setChooseUniqueButtons() {
		$( Tvm.vars.path + ' .choose-unique' ).on( 'click', '.btn-multiple', function( event ) {
			event.preventDefault();
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
			$(this).parents('.choose-unique').attr('data-validate',true);
			if($(this).attr('value') == 'true') {
				$(this).parents('.input-group').next('.bisel').children('.input-group').removeClass('disabled');
			} else if($(this).attr('value') == 'false'){
				$(this).parents('.input-group').next('.bisel').children('.input-group').addClass('disabled');
				$(this).parents('.input-group').next('.bisel').children('.input-group').children('.choose-multiple').attr('data-validate',true);
			}
			
			$(this).parents('.input-group').next('.input-group').removeClass('disabled');

			/* Save form data into Bicicle class */
			var prop = $(this).parents('.choose-unique').attr('data-save');
			Tvm.Bicicle.setProp(prop, $(this).attr('value'));

			/* check to display continue button */
			checkPageValidation();
		});
	}



	/* Adds functionality to choose-multiple buttons. Allows multiple options */
	function setChooseMultipleButtons() {
		$( Tvm.vars.path + ' .choose-multiple' ).on( 'click', '.btn-multiple', function( event ) {
			event.preventDefault();
			if($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				if(!$(this).parents('.choose-multiple').children('.selected').length) {
					$(this).parents('.choose-multiple').attr('data-validate',false);
				}
			} else {
				$(this).addClass('selected');
				$(this).parents('.choose-multiple').attr('data-validate',true);
			}
			
			$(this).parents('.input-group').next('.bisel').children('.input-group').removeClass('disabled');
			$(this).parents('.input-group').next('.input-group').removeClass('disabled');
			checkPageValidation();
		});
	}


	/* Adds events to upload file inputs */
	function setFileImageButtons() {
		$( Tvm.vars.path ).on( 'change', '[data-image]', function( event) {
			var _this = $(this);
			event.preventDefault();
			var reader = new FileReader();
			reader.onload = function (e, elem) {
				_this.siblings('[data-show]')
					.css({
						'background':'url(' + e.target.result + ') no-repeat center center/cover',
						'opacity':1,
						'pointer-events':'all'
						});
				_this.parents('[data-validate]').attr('data-validate',true);
				checkPageValidation();	
			};
			reader.readAsDataURL(event.target.files[0]);
		});


		$( Tvm.vars.path ).on( 'click', '[data-delete]', function( event ) {
			/* Empty file input */
			elem = $(this).parents('.file-container').children('[data-image=show]');
			elem.wrap('<form>').closest('form').get(0).reset();
			elem.unwrap();

			/* reset styles */
			elem.siblings('[data-show]').css({
						'background':'none',
						'opacity':0,
						'pointer-events':'none'
						});

			$(this).parents('[data-validate]').attr('data-validate',false);
			checkPageValidation();
		});

	}
	



	/* 	Checks if every data-validate of the page is set to true
		if so, enables the continue button */ 
	function checkPageValidation() {
		var notValidated = true;
		$('[data-navigation=' + Tvm.vars.page + '] [data-validate]').each(function() {
			if($(this).attr('data-validate') == 'true') {
				notValidated = false;
			} else {
				notValidated = true;
				return false;
			}
		});
		if(!notValidated) {
			$('[data-navigation=' + Tvm.vars.page + '] [data-continue]').removeClass('btn-disabled');
		} else {
			$('[data-navigation=' + Tvm.vars.page + '] [data-continue]').addClass('btn-disabled');
		}
	}


	init();
	return _api;

};