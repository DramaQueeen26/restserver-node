const Role = require('../models/role');

const isRoleValid = async(role = '') => {
	
	const rolExists = await Role.findOne({role});
	
	if(!rolExists){
		throw new Error(`El rol ${role} no está registrado en la base de datos`);
	}
}

module.exports = {
	isRoleValid
}