var Tvm = Tvm || {};

Tvm.Bicicle = (function(){

	var _api = {};

	function init() {
		_api.bicicle = new CreateBike(Tvm.bike);
	}



	function CreateBike( characteristics /* Array */ ) {
		this.user_id = characteristics.user_id;
		this.tipo = characteristics.tipo;
		this.modelo = characteristics.modelo;
		this.marca = characteristics.marca;
		this.fecha = characteristics.fecha;
		this.talla = characteristics.talla;
		this.cuadro = characteristics.cuadro;
		this.suspension = characteristics.suspension;
		this.recorrido_susp_delantera = characteristics.recorrido_susp_delantera;
		this.recorrido_susp_trasera = characteristics.recorrido_susp_trasera;
		this.grupo_cambio = characteristics.grupo_cambio;
		this.pais = characteristics.pais;
		this.velocidades = characteristics.velocidades;
		this.platos = characteristics.platos;
		this.medida_ruedas = characteristics.medida_ruedas;
		this.extra = characteristics.extra;
		this.extras = characteristics.extras;
		this.fotos = characteristics.fotos;
		this.descripcion = characteristics.descripcion;
		this.estado = characteristics.estado;
		this.coste_inicial = characteristics.coste_inicial;
		this.precio_esperado = characteristics.precio_esperado;
	}




	function refresh( prop, value ) {
		$('[data-bicicle=' + prop + ']').text(value);
	}



	_api.setProp = function( prop, value ) {
		_api.bicicle[prop] = value;
		refresh(prop, value);
	}


	init();
	return _api;

})();