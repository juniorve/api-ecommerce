'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var ProveedorSchema = Schema({
	nombre:String,
	telefono:String,
	direccion:String,
	email:String,
	descripcion:String,
	imagen:String,
	estado:{type:String,default:"Activo"},
	tipo:{type:Schema.ObjectId,ref:'Tipo'},
	user: {type: Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Proveedor',ProveedorSchema);