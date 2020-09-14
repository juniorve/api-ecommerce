'use strict'

var express = require('express');
var detalleComprobanteController = require('../controllers/detalleComprobante_controller');
 

var api= express.Router();

api.post('/detallecomprobante',detalleComprobanteController.saveDetalleComprobante);
api.get('/detallecomprobante/:idComprobante',detalleComprobanteController.getDetalleComprobante);
module.exports = api;