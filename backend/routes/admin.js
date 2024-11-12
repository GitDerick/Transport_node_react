const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../Controllers/Users')


router.post(
    '/register',
    [
        body('first_name').notEmpty().withMessage('Le prénom est requis'),
        body('last_name').notEmpty().withMessage('Le nom est requis'),
        body('email').isEmail().withMessage('L\'email doit être valide'),
        body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('phone_number').optional().isMobilePhone().withMessage('Le numéro de téléphone doit être valide'),
        body('date_of_birth').notEmpty().withMessage('La date de naissance est requise')


    ],
    userController.register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('L\'email doit être valide'),
        body('password').notEmpty().withMessage('Le mot de passe est requis')        
    ],
    userController.login
);
router.get('/allUsers', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
