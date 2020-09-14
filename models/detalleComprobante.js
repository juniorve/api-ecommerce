'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var DetalleComprobanteSchema = Schema({
    cantidad:Number,
    precio:Number,
	idProducto:{type:Schema.ObjectId,ref:'Producto'},
	idComprobante: {type: Schema.ObjectId, ref:'Comprobante'}
});

module.exports = mongoose.model('DetalleComprobante',DetalleComprobanteSchema);