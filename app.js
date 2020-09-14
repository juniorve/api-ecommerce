'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes= require('./routes/user_routes');
var tipo_routes= require('./routes/tipo_routes');
var proveedor_routes= require('./routes/proveedor_routes');
var producto_routes= require('./routes/producto_routes');
var sugerencia_routes= require('./routes/sugerencia_routes');
var comprobante_routes= require('./routes/comprobante_routes');
var detalleComprobante_routes= require('./routes/detalleComprobante_routes');

//configuracion body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // convierte a objeto JSON los datos que nos llegan por las peticiones HTTP

// configurar cabeceras HTTP
app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin','*');     
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
	res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

	next();
});


// rutas bases;
app.use('/api',user_routes);
app.use('/api',proveedor_routes);
app.use('/api',producto_routes);
app.use('/api',sugerencia_routes);
app.use('/api',tipo_routes);
app.use('/api',comprobante_routes);
app.use('/api',detalleComprobante_routes);

module.exports = app; // para usar express en otros ficheros que incluyan app
