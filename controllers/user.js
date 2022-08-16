const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req, res = response) => {

	/*
		Promise.all es una colección de promesas, quiere decir que ejecuta todas las promesas a la vez, a diferencia del await, que primero ejecuta una y luego la otra.
	*/

	const {limit = 5, from = 0} = req.query;
	const query = {status: true};

	//DESESTRUCTURACIÓN DE ARREGLOS
	const [total, users] = await Promise.all([
			User.countDocuments(query),
			User.find(query)
			.skip(Number(from))
			.limit(Number(limit))
		]);

	res.json({
		total,
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
		user
	});
}

const usersPatch = (req, res = response) => {
	res.json({
		ok: true,
		msg: "patch API - controller"
	});
}

const usersDelete = async(req, res = response) => {
	
	const {id} = req.params;

	//BORRAR FISICAMENTE - NO RECOMENDADO
	// const user = await User.findByIdAndDelete(id);

	//Cambiar el estado - RECOMENDADO
	const user = await User.findByIdAndUpdate(id, {status: false});

	res.json(user);
}

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete
}