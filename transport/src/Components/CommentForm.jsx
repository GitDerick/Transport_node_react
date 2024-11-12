// components/CommentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [commentaire, setCommentaire] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/commentaires/commentForm', { nom, prenom, email, commentaire });
            if (response.status === 201) {
                alert('Commentaire soumis avec succès!');
                setNom('');
                setPrenom('');
                setEmail('');
                setCommentaire('');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du commentaire:', error);
            alert('Une erreur est survenue lors de la soumission du commentaire.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    className="form-control"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="prenom">Prénom:</label>
                <input
                    type="text"
                    className="form-control"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="commentaire">Commentaire:</label>
                <textarea
                    className="form-control"
                    id="commentaire"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Soumettre</button>
        </form>
    );
};

export default CommentForm;
