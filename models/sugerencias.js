'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var SugerenciasSchema = Schema({
	nombre:String,
	dni:String,
	celular:String,
	email:String,
	descripcion:String
});

module.exports = mongoose.model('Sugerencia',SugerenciasSchema);