const {response} = require('express');

const usersGet = (req, res = response) => {
	const {query = false, id} = req.query;
	res.json({
		ok: true,
		msg: "get API - controller",
		query,
		id
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