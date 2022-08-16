const {Router} = require('express');
const {check} = require('express-validator');

const {fieldValidations} = require('../middlewares/field-validations')

const {isRoleValid, 
	checkEmail,
	checkUserId
} = require('../helpers/db-validators');

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
	check('email', 'El correo no es válido').isEmail().custom(checkEmail),
	check('role').custom(isRoleValid),
	
	fieldValidations
], usersPost);

router.put('/:id', [

	check('id', 'No es un ID válido').isMongoId().custom(checkUserId),
	check('role').custom(isRoleValid),
	
	fieldValidations
], usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;