const { validationResult } = require('express-validator');
const Chauffeur = require('../models/Chauffeurs');

// Créer un chauffeur
exports.createChauffeur = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, first_name, last_name, date_of_birth, license_number, vehicle_info, availability_status, admin_id } = req.body;

    try {
        const chauffeur = await Chauffeur.create({
            user_id,
            first_name,
            last_name,
            date_of_birth,
            license_number,
            vehicle_info,
            availability_status,
            admin_id
        });
        res.status(201).json(chauffeur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir tous les chauffeurs
exports.getChauffeurs = async (req, res) => {
    try {
        const chauffeurs = await Chauffeur.findAll();
        res.status(200).json(chauffeurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir un chauffeur par ID
exports.getChauffeurById = async (req, res) => {
    try {
        const chauffeur = await Chauffeur.findByPk(req.params.id);
        if (!chauffeur) {
            return res.status(404).json({ error: 'Chauffeur non trouvé' });
        }
        res.status(200).json(chauffeur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un chauffeur
exports.updateChauffeur = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, date_of_birth, license_number, vehicle_info, availability_status, admin_id } = req.body;

    try {
        const chauffeur = await Chauffeur.findByPk(req.params.id);
        if (!chauffeur) {
            return res.status(404).json({ error: 'Chauffeur non trouvé' });
        }

        chauffeur.first_name = first_name;
        chauffeur.last_name = last_name;
        chauffeur.date_of_birth = date_of_birth;
        chauffeur.license_number = license_number;
        chauffeur.vehicle_info = vehicle_info;
        chauffeur.availability_status = availability_status;
        chauffeur.admin_id = admin_id;

        await chauffeur.save();
        res.status(200).json(chauffeur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un chauffeur
exports.deleteChauffeur = async (req, res) => {
    try {
        const chauffeur = await Chauffeur.findByPk(req.params.id);
        if (!chauffeur) {
            return res.status(404).json({ error: 'Chauffeur non trouvé' });
        }

        await chauffeur.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
