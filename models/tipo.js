'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var TipoSchema = Schema({
	descripcion:String,
	estado:{type:String,default:'Activo'}
});

module.exports = mongoose.model('Tipo',TipoSchema);