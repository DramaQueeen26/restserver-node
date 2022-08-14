const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersGet = (req, res = response) => {
	const {query = false, id} = req.query;
	res.json({
		ok: true,
		msg: "get API - controller",
		query,
		id
	});
}

const usersPost = async(req, res = response) => {
	
	const {name, email, password, role} = req.body;
	const user = new User({name, email, password, role});

	//Verificar si el correo existe

	//Encriptar la contraseña
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(password, salt);

	await user.save();

	res.json({
		msg: "post API - controller",
		user
	});

}

const usersPut = (req, res = response) => {
	const {id} = req.params;
	res.json({
		ok: true,
		msg: "put API - controller",
		id
	});
}

const usersPatch = (req, res = response) => {
	res.json({
		ok: true,
		msg: "patch API - controller"
	});
}

const usersDelete = (req, res = response) => {
	res.json({
		ok: true,
		msg: "delete API - controller"
	});
}

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete
}