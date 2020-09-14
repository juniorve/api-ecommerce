'use strict'

var express = require('express');
var tipoController = require('../controllers/tipo_controller');
var api= express.Router();
var md_auth = require('../middlewares/authenticated');


api.post('/tipos',tipoController.saveTipo);
api.get('/tipos',md_auth.ensureAuth,tipoController.getTipos);

module.exports = api;