'use strict'

var express = require('express');
var comprobanteController = require('../controllers/comprobante_controller');
 

var api= express.Router();

api.post('/comprobantes',comprobanteController.saveComprobante);
api.get('/comprobantes/:id?',comprobanteController.getComprobanteById);
api.get('/getcomprobantesDni/:dni',comprobanteController.getComprobantesxDni);
api.get('/comprobantes',comprobanteController.getComprobantes);
api.get('/getcomprobantes/:fechaInicio/:fechaFin',comprobanteController.getComprobantesxFecha);
module.exports = api;