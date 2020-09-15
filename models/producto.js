'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var ProductoSchema = Schema({
	nombre:String,
	precioCompra:Number,
	precioVenta:Number,
	stock_minimo:Number,
	stock_maximo:Number,
	cantidad:Number,
    material:String,
	envioInternacional:String,
	descripcion:String,
	tipo:String,
	imagen:String,
	color:String,
	estado:{type:String,default:"Activo"},
	user: {type: Schema.ObjectId, ref:'User'},
	proveedor: {type: Schema.ObjectId, ref:'Proveedor'}
});

module.exports = mongoose.model('Producto',ProductoSchema);