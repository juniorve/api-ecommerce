'use strict'

var DetalleComprobante = require('../models/detalleComprobante');
var path = require('path');
var fs = require('fs');


function saveDetalleComprobante(req, res) {
	var detalleComprobante = new DetalleComprobante();
	var params = req.body;

	console.log(params);
	detalleComprobante.cantidad = params.cantidad;
	detalleComprobante.precio = params.precio;
	detalleComprobante.idProducto = params.idProducto;
    detalleComprobante.idComprobante = params.idComprobante;
    
    detalleComprobante.save((err, detalleComprobanteStored) => {
			if (err) {
				res.status(500).send({ message: 'Error al guardar detalle del comprobante' });
			} else {
				if (!detalleComprobanteStored) {
					res.status(404).send({ message: 'No se ha guardado detalle del comprobante' });
				} else {
					res.status(201).send({ detalleComprobante: detalleComprobanteStored });
				}
			}
		});
}
 
 
function getDetalleComprobante(req, res) {
	// var idProducto = req.params.idProducto;
	var idComprobante = req.params.idComprobante;
	
	var find = DetalleComprobante.find({"idComprobante": idComprobante}).sort('_id');
	find.populate({ path: '_id' }).exec((err, detalleComprobante) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		} else {
			if (!detalleComprobante) {
				res.status(404).send({ message: 'No hay detalle del Comprobante en la base de datos' });
			} else {
				res.status(200).send({ detalleComprobante });
			}
		}
	}
	);
}
/* 
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
 */
module.exports = {
	saveDetalleComprobante,
	getDetalleComprobante
};