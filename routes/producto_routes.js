'use strict'

var express = require('express');
var productoController = require('../controllers/producto_controller');
var md_auth = require('../middlewares/authenticated');

var api= express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/producto'});



api.post('/producto',md_auth.ensureAuth,productoController.saveProducto);
api.get('/producto/:id?',productoController.getProducto);
api.get('/productos/:user?',productoController.getProductosxUsuario);
api.get('/getProductos',productoController.getProductos);
api.put('/producto/:id?',productoController.updateProducto);
api.delete('/producto/:id?',md_auth.ensureAuth,productoController.deleteProducto);

api.post('/upload-img-producto/:id', [md_auth.ensureAuth, md_upload],
 productoController.uploadImage);
api.get('/get-img-producto/:imageFile', productoController.getImageFile);
module.exports = api;