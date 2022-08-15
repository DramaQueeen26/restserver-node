const {Router} = require('express');
const {check} = require('express-validator');
const Role = require('../models/role');

const {fieldValidations} = require('../middlewares/field-validations')

const {usersGet, 
	usersPost,
	usersPut,
	usersPatch,
	usersDelete
	} = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.post('/', [
	
	check('name', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'La contraseña debe contener más de 6 carácteres').isLength({min: 6}),
	check('email', 'El correo no es válido').isEmail(),
	// check('role', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	
	check('role').custom(async(role = '') => {
		const rolExists = await Role.findOne({role});
		if(!rolExists){
			throw new Error(`El rol ${role} no está registrado en la base de datos`);
		}
	}),
	
	fieldValidations
], usersPost);

router.put('/:id', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;