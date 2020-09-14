'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var ComprobanteSchema = Schema({
	nombre:String,
	email:String,
	dni:String,
	numCuenta:String,
	cvv:String,
	total:Number,
	vencimiento: {type:Date},
	fecha: {type:Date}
});

 

module.exports = mongoose.model('Comprobante',ComprobanteSchema);