'use strict'

var express = require('express');
var sugerenciaController = require('../controllers/sugerencias_controller');
 

var api= express.Router();

api.post('/sugerencias',sugerenciaController.saveSugerencia);
api.get('/sugerencias/:id?',sugerenciaController.getSugerenciaById);
api.get('/getsugerencias',sugerenciaController.getSugerencias);
module.exports = api;