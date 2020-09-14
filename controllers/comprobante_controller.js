'use strict'

var Comprobante = require('../models/comprobante');
var path = require('path');
var fs = require('fs');


function saveComprobante(req, res) {
	var comprobante = new Comprobante();
	var params = req.body;

	console.log(params);
	comprobante.nombre = params.nombre;
	comprobante.email = params.email;
	comprobante.dni = params.dni;
	comprobante.numCuenta = params.numCuenta;
	comprobante.cvv = params.cvv;
	comprobante.fecha = params.fecha;
	comprobante.total = params.total;
	comprobante.vencimiento = params.vencimiento;
 
		comprobante.save((err, comprobanteStored) => {
			if (err) {
				res.status(500).send({ message: 'Error al guardar comprobante' });
			} else {
				if (!comprobanteStored) {
					res.status(404).send({ message: 'No se ha guardado comprobante' });
				} else {
					res.status(201).send({ comprobante: comprobanteStored });
				}
			}
		});
}
 

function getComprobantes(req,res){
	
	Comprobante.find({}).sort('_id').exec((err, comprobantes) => {
	   if(err){
			   res.status(500).send({ message:'Error en la peticion'});	
		   }else{
			   if(!comprobantes){
					   res.status(404).send({ message:'No hay comprobantes en la base de datos'});	
			   }else{
				   res.status(200).send({comprobantes});	
			   }
		   }
	   });
}

function getComprobantesxFecha(req, res) {
	var fechaInicio = req.params.fechaInicio;
	var fechaFin = req.params.fechaFin;
	
	var find = Comprobante.find({"fecha": {"$gte": new Date(fechaInicio), "$lt": new Date(fechaFin)}}).sort('_id');
	find.populate({ path: '_id' }).exec((err, comprobantes) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		} else {
			if (!comprobantes) {
				res.status(404).send({ message: 'No hay comprobantes en la base de datos' });
			} else {
				res.status(200).send({ comprobantes });
			}
		}
	}
	);
}

function getComprobantesxDni(req, res) {
	var dni = req.params.dni;
	
	var find = Comprobante.find({"dni": dni}).sort('_id');
	find.populate({ path: '_id' }).exec((err, comprobantes) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		} else {
			if (!comprobantes) {
				res.status(404).send({ message: 'No hay comprobantes en la base de datos' });
			} else {
				res.status(200).send({ comprobantes });
			}
		}
	}
	);
}


function getComprobanteById(req, res) {

	var comprobanteId = req.params.id;

	Comprobante.findById(comprobanteId, (err, comprobante) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		} else {
			if (!comprobante) {
				res.status(404).send({ message: 'No existe comprobante en la base de datos' });
			} else {
				res.status(200).send({ comprobante });
			}
		}
	}
	);
}

module.exports = {
	saveComprobante,
	getComprobanteById,
	getComprobantesxFecha,
	getComprobantes,
	getComprobantesxDni
};