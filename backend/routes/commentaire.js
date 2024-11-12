// routes/commentaires.js
const express = require('express');
const router = express.Router();
const commentairesController = require('../controllers/Commentaires');

// Route pour ajouter un commentaire
router.post('/commentForm', commentairesController.createCommentaire);

// Route pour récupérer tous les commentaires
router.get('/allComments', commentairesController.getCommentaires);

// Route pour récupérer un commentaire par ID
router.get('/:id', commentairesController.getCommentaireById);

// Route pour mettre à jour un commentaire
router.put('/:id', commentairesController.updateCommentaire);

// Route pour supprimer un commentaire
router.delete('/:id', commentairesController.deleteCommentaire);

module.exports = router;
