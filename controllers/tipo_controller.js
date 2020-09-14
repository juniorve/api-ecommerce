'use strict'

var Tipo = require('../models/tipo');

var path = require('path');
var fs = require('fs');


function saveTipo(req, res) {
	var tipo = new Tipo();
	var params = req.body;

	//console.log(params);
	tipo.descripcion = params.descripcion;

	if (tipo.descripcion != null) {
		tipo.save((err, TipoStored) => {
			if (err) {
				res.status(500).send({ message: 'Error al guardar tipo de proveedor' });
			} else {
				if (!TipoStored) {
					res.status(404).send({ message: 'No se ha guardado tipo de proveedor' });
				} else {
					res.status(201).send({ proveedor: TipoStored });
				}
			}
		});
	} else {
		res.status(400).send({ message: 'Introduce todos los datos' });
	}
}


function getTipos(req,res){
	
	Tipo.find({}).sort('_id').exec((err, tipos) => {
	   if(err){
			   res.status(500).send({ message:'Error en la peticion'});	
		   }else{
			   if(!tipos){
					   res.status(404).send({ message:'No hay tipos en la base de datos'});	
			   }else{
				   res.status(200).send({tipos});	
			   }
		   }
	   });
}

module.exports = {
	saveTipo,
	getTipos
};