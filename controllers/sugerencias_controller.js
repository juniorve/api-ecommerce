'use strict'

var Sugerencia = require('../models/sugerencias');
var path = require('path');
var fs = require('fs');


function saveSugerencia(req, res) {
	var sugerencia = new Sugerencia();
	var params = req.body;
	console.log(params);

	sugerencia.nombre = params.nombre;
	sugerencia.celular = params.celular;
	sugerencia.dni = params.dni;
	sugerencia.email = params.email;
	sugerencia.descripcion = params.descripcion;

		sugerencia.save((err, sugerenciaStored) => {
			if (err) {
				res.status(500).send({ message: 'Error al guardar sugerencia' });
			} else {
				if (!sugerenciaStored) {
					res.status(404).send({ message: 'No se ha guardado sugerencia' });
				} else {
					res.status(201).send({ sugerencia: sugerenciaStored });
				}
			}
		});
}

function getSugerenciaById(req, res) {

	var sugerenciaId = req.params.id;

	Sugerencia.findById(sugerenciaId, (err, sugerencia) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		} else {
			if (!sugerencia) {
				res.status(404).send({ message: 'No existe sugerencia en la base de datos' });
			} else {
				res.status(200).send({ sugerencia });
			}
		}
	}
	);
} 
 

function getSugerencias(req,res){
	
	Sugerencia.find({}).sort('_id').exec((err, sugerencias) => {
	   if(err){
			   res.status(500).send({ message:'Error en la peticion'});	
		   }else{
			   if(!sugerencias){
					   res.status(404).send({ message:'No hay sugerencias en la base de datos'});	
			   }else{
				   res.status(200).send({sugerencias});	
			   }
		   }
	   });
}



module.exports = {
    saveSugerencia,
    getSugerenciaById,
    getSugerencias
};