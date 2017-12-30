var Tvm = Tvm || {};
// These are the constraints used to validate the form
var constraints = {
	"user-email": {
		// Email is required
		presence: {
			message: "Este campo es obligatorio"
		},
		// and must be an email (duh)
		email: {
			message: "El formato no es correcto"
		}
	},
	nombre: {
		// You need to pick a username too
		presence: {
			message: "Este campo es obligatorio"
		},
		format: {
			// We don't allow anything that a-z
			pattern: "[a-z]+",
			// but we don't care if the username is uppercase or lowercase
			flags: "i",
			message: "El nombre solo puede llevar caracteres alfabéticos"
		}
	},
	apellidos: {
		presence: {
			message: "Este campo es obligatorio"
		},
		format: {
			// We don't allow anything that a-z
			pattern: "[a-z]+",
			// but we don't care if the username is uppercase or lowercase
			flags: "i",
			message: "El apellido solo puede llevar caracteres alfabéticos"
		}	
	},
	telefono: {
		presence: {
			message: "Este campo es obligatorio"
		},
		format: {
			pattern: "^[0-9\-\+]{9,15}$",
			message: "El formato no es correcto"
		}
	},
	dni: {
		presence: {
			message: "Este campo es obligatorio"
		},
		format: {
			pattern: "^[0-9]{8,8}[A-Za-z]$",
			message: "El formato no es correcto"
		}
	},
	"user-address": {
		presence: {
			message: "Este campo es obligatorio"
		}
	},
	"user-city": {
		presence: {
			message: "Este campo es obligatorio"
		}
	},
	"user-province": {
		presence: {
			message: "Este campo es obligatorio"
		}
	},
	"user-cp": {
		presence: {
			message: "Este campo es obligatorio"
		},
		format: {
			pattern: "\\d{5}",
			message: "El formato del código postal no es correcto"
		}
	}
};

Tvm.Form = (function(){

	var _api = {};

	function init() {

		if ($('.form-wrapper').length) {
			// Hook up the form so we can prevent it from being posted
			var formSubmit = document.querySelector('.form-wrapper button[type=submit]');
			formSubmit.addEventListener('click', function(ev) {
				ev.preventDefault();
				$(this).parent('.form-wrapper').each(function(index, form) {
					handleFormSubmit(form);
				});
			});
			
			// Hook up the inputs to validate on the fly
			var inputs = document.querySelectorAll("input, textarea, select");
			for (var i = 0; i < inputs.length; ++i) {
				inputs.item(i).addEventListener("blur", function(ev) {
					var form = $(this).parents('form');
					var errors = validate(form, constraints, {fullMessages: false}) || {};	
					showErrorsForInput(this, errors[this.name]);
				});
			}
		}
	}

	init();
	return _api;

})();

	function handleFormSubmit(form, input) {
		// validate the form aainst the constraints
		var errors = validate(form, constraints, {fullMessages: false});
		// then we update the form to reflect the results
		showErrors(form, errors || {});
		if (!errors) {
			showSuccess(form);
		}
	}

	// Updates the inputs with the validation errors
	function showErrors(form, errors) {
		// We loop through all the inputs and show the errors for that input
		$(form).each(function (index, el) {
			$(el).find("input[name], select[name]").each(function(index, input) {
				var formGroup = closestParent(input.parentNode, "input-group");
				resetFormGroup(formGroup);
				// Since the errors can be null if no errors were found we need to handle
				// that
				showErrorsForInput(input, errors && errors[input.name]);
			});	
		});
	}

	// Shows the errors for a specific input
	function showErrorsForInput(input, errors) {
		// This is the root of the input
		var formGroup = closestParent(input.parentNode, "input-group");
	
		// First we remove any old messages and resets the classes
		resetFormGroup(formGroup);

		$(formGroup).append('<div class="messages"></div>');
		// Find where the error messages will be insert into
		var messages = formGroup.querySelector(".messages");
		
		// If we have errors
		if (errors) {
			// we first mark the group has having errors
			formGroup.classList.add("has-error");
			// then we append all the errors
			$(errors).each(function(index, error) {
				addError(messages, error);
			});
		} else {
			// otherwise we simply mark it as success
			formGroup.classList.add("has-success");
			// then we append all the errors
			$(formGroup).each(function(index, input) {
				$(input).find('.messages').append('<p>Este campo es correcto :)</p>');
			});
		}
	}

	// Recusively finds the closest parent that has the specified class
	function closestParent(child, className) {
		if (!child || child == document) {
			return null;
		}
		if (child.classList.contains(className)) {
			return child;
		} else {
			return closestParent(child.parentNode, className);
		}
	}

	function resetFormGroup(formGroup) {
		// Remove the success and error classes
		formGroup.classList.remove("has-error");
		formGroup.classList.remove("has-success");
		// and remove any old messages
		$(formGroup).find('.messages').remove();
	}

	// Adds the specified error with the following markup
	// <p class="help-block error">[message]</p>
	function addError(messages, error) {
		var block = document.createElement("p");
		block.classList.add("help-block");
		block.classList.add("error");
		block.innerText = error;
		messages.appendChild(block);
	}

	function showSuccess(form) {
		
	}
