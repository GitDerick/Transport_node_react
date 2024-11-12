const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const chauffeurController = require('../Controllers/Chauffeurs');

router.post(
    '/',
    [
        body('user_id').notEmpty().withMessage('L\'ID utilisateur est requis').isInt().withMessage('L\'ID utilisateur doit être un nombre entier'),
        body('first_name').notEmpty().withMessage('Le prénom est requis'),
        body('last_name').notEmpty().withMessage('Le nom est requis'),
        body('date_of_birth').notEmpty().withMessage('La date de naissance est requise').isDate().withMessage('La date de naissance doit être valide'),
        body('license_number').notEmpty().withMessage('Le numéro de licence est requis'),
        body('vehicle_info').notEmpty().withMessage('Les informations du véhicule sont requises'),
        body('availability_status').isBoolean().withMessage('Le statut de disponibilité doit être un booléen'),
        body('admin_id').notEmpty().withMessage('L\'ID administrateur est requis').isInt().withMessage('L\'ID administrateur doit être un nombre entier')
    ],
    chauffeurController.createChauffeur
);

router.get('/', chauffeurController.getChauffeurs);

router.get('/:id', chauffeurController.getChauffeurById);

router.put(
    '/:id',
    [
        body('first_name').notEmpty().withMessage('Le prénom est requis'),
        body('last_name').notEmpty().withMessage('Le nom est requis'),
        body('date_of_birth').notEmpty().withMessage('La date de naissance est requise').isDate().withMessage('La date de naissance doit être valide'),
        body('license_number').notEmpty().withMessage('Le numéro de licence est requis'),
        body('vehicle_info').notEmpty().withMessage('Les informations du véhicule sont requises'),
        body('availability_status').isBoolean().withMessage('Le statut de disponibilité doit être un booléen'),
        body('admin_id').notEmpty().withMessage('L\'ID administrateur est requis').isInt().withMessage('L\'ID administrateur doit être un nombre entier')
    ],
    chauffeurController.updateChauffeur
);

router.delete('/:id', chauffeurController.deleteChauffeur);

module.exports = router;
