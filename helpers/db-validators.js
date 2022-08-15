const User = require('../models/user');
const Role = require('../models/role');

const isRoleValid = async(role = '') => {
	
	const rolExists = await Role.findOne({role});
	
	if(!rolExists){
		throw new Error(`El rol ${role} no está registrado en la base de datos`);
	}
}

const checkEmail = async(email = '') => {
	
	const emailExists = await User.findOne({email});
	
	if(emailExists){
		throw new Error(`El correo ${email} ya existe en la base de datos`);
	}
}

module.exports = {
	isRoleValid,
	checkEmail
}