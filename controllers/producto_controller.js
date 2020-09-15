'use strict'

var Producto = require('../models/producto');
var path = require('path');
var fs = require('fs');


function saveProducto(req, res) {
	var producto = new Producto();
	var params = req.body;

	console.log(params);
	producto.nombre = params.nombre;
	producto.precioCompra = params.precioCompra;
	producto.precioVenta = params.precioVenta;
	producto.stock_minimo = params.stock_minimo;
	producto.stock_maximo = params.stock_maximo;
	producto.material = params.material;
	producto.envioInternacional = params.envioInternacional;
	producto.descripcion = params.descripcion;
	producto.imagen = params.imagen;
	producto.color = params.color;
	producto.tipo = params.tipo;
	producto.cantidad = params.cantidad;
	producto.user= params.user;
	producto.proveedor= params.proveedor;

		producto.save((err, productoStored) => {
			if (err) {
				res.status(500).send({ message: 'Error al guardar producto' });
			} else {
				if (!productoStored) {
					res.status(404).send({ message: 'No se ha guardado producto' });
				} else {
					res.status(201).send({ producto: productoStored });
				}
			}
		});
}

function getProducto(req, res) {

	var productoId = req.params.id;

	Producto.findById(productoId, (err, producto) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		} else {
			if (!producto) {
				res.status(404).send({ message: 'No existe producto en la base de datos' });
			} else {
				res.status(200).send({ producto });
			}
		}
	}
	);
}

function getProductosxUsuario(req, res) {
	var usuarioId = req.params.user;

	if (usuarioId) {
		var find = Producto.find({ user: usuarioId }).sort('_id');
	}

	find.populate({ path: 'proveedor' }).exec((err, productos) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		} else {
			if (!productos) {
				res.status(404).send({ message: 'No hay productos en la base de datos' });
			} else {
				res.status(200).send({ productos });
			}
		}
	}
	);
}


function updateProducto(req, res) {
	var productoId = req.params.id;
	var update = req.body;

	Producto.findByIdAndUpdate(productoId, update, (err, productoUpdated) => {
		if (err) {
			res.status(500).send({ message: 'Error en el servidor' });
		} else {
			if (!productoUpdated) {
				res.status(404).send({ message: 'No se ha actualizado el producto' });
			} else {
				res.status(200).send({ producto: productoUpdated });
			}
		}
	});
}

function deleteProducto(req, res) {
	var productoId = req.params.id;

	Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
		if (err) {
			res.status(500).send({ message: 'Error al eliminar producto' });
		} else {
			if (!productoRemoved) {
				res.status(404).send({ message: 'El producto no ha sido eliminado' });
			} else {
				res.status(200).send({ producto: productoRemoved });
			}
		}
	});
}

function uploadImage(req, res) {
	var productoId = req.params.id;
	var file_name = "Imagen no subida..";

	if (req.files) {

		console.log(req.files);
		var file_path = req.files.imagen.path;
		var file_split = file_path.split(path.sep);
		var file_name = file_split[2];
		console.log(file_name);
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];


		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

			Producto.findByIdAndUpdate(productoId, { imagen: file_name }, (err, productoUpdated) => {
				if (!productoUpdated) {
					res.status(404).send({ message: "No se pudo actualizar producto" });
				} else {
					res.status(200).send({ producto: productoUpdated });
				}
			});
		} else {
			res.status(200).send({ message: "Extensión del archivo no valido" });
		}
	} else {
		res.status(200).send({ message: "No has subido ninguna imagen" });
	}
}

function getImageFile(req, res) {
	var imageFile = req.params.imageFile;
	var path_file = './uploads/producto/' + imageFile;
	fs.exists(path_file, function (exists) {
		if (exists) {
			res.sendFile(path.resolve(path_file));
		} else {
			res.status(200).send({ message: "No existe la imagen..." });
		}
	});
}



function getProductos(req,res){
	
	Producto.find({}).sort('_id').populate({ path: 'proveedor' }).exec((err, productos) => {
	   if(err){
			   res.status(500).send({ message:'Error en la peticion'});	
		   }else{
			   if(!productos){
					   res.status(404).send({ message:'No hay productos en la base de datos'});	
			   }else{
				   res.status(200).send({productos});	
			   }
		   }
	   });
}



module.exports = {
	saveProducto,
	getProducto,
	updateProducto,
	deleteProducto,
	getProductosxUsuario,
	getProductos,
	//para imagenes
	uploadImage,
	getImageFile
};