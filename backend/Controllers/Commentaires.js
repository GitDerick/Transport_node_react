// controllers/commentaires.js
const Commentaire = require('../models/Commentaires');

// Créer un nouveau commentaire
exports.createCommentaire = async (req, res) => {
    const { nom, prenom, email, commentaire } = req.body;
    try {
        const newCommentaire = await Commentaire.create({ nom, prenom, email, commentaire });
        res.status(201).json(newCommentaire);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les commentaires
exports.getCommentaires = async (req, res) => {
    try {
        const commentaires = await Commentaire.findAll();
        res.status(200).json(commentaires);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un commentaire par ID
exports.getCommentaireById = async (req, res) => {
    const { id } = req.params;
    try {
        const commentaire = await Commentaire.findByPk(id);
        if (commentaire) {
            res.status(200).json(commentaire);
        } else {
            res.status(404).json({ error: 'Commentaire not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un commentaire
exports.updateCommentaire = async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, commentaire } = req.body;
    try {
        const [updated] = await Commentaire.update({ nom, prenom, email, commentaire }, {
            where: { id: id }
        });
        if (updated) {
            const updatedCommentaire = await Commentaire.findByPk(id);
            res.status(200).json(updatedCommentaire);
        } else {
            res.status(404).json({ error: 'Commentaire not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Commentaire.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Commentaire deleted' });
        } else {
            res.status(404).json({ error: 'Commentaire not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
