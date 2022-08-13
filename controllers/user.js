const {response} = require('express');

const usersGet = (req, res = response) => {
	res.json({
		ok: true,
		msg: "get API - controller"
	});
}

const usersPost = (req, res = response) => {
	const {nombre, edad} = req.body;
	res.json({
		ok: true,
		msg: "post API - controller",
		nombre,
		edad
	});
}

const usersPut = (req, res = response) => {
	res.json({
		ok: true,
		msg: "put API - controller"
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