const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req, res = response) => {
	
	//Obtener parámetros de la URL
	// const {query = false, id} = req.query;

	const {limit = 5, from = 0} = req.query;

	const users = await User.find()
		.skip(Number(from))
		.limit(Number(limit));

	res.json({
		users
	});
}

const usersPost = async(req, res = response) => {
	
	const {name, email, password, role} = req.body;
	const user = new User({name, email, password, role});

	//Encriptar la contraseña
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(password, salt);

	await user.save();

	res.json({
		msg: "post API - controller",
		user
	});

}

const usersPut = async(req, res = response) => {
	
	const {id} = req.params;

	const {_id, password, google, email, ...rest} = req.body;

	if(password){
		//Encriptar la contraseña
		const salt = bcrypt.genSaltSync();
		rest.password = bcrypt.hashSync(password, salt);
	}
	
	const user = await User.findByIdAndUpdate(id, rest);
	res.json({
		msg: "put API - controller",
		user
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