// components/CommentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/commentaires/allComments');
                setComments(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires:', error);
            }
        };

        fetchComments();
    }, []);

    return (
        <div>
            <h2>Commentaires des utilisateurs</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {comments.map((comment) => (
                    <li key={comment.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                        <div>
                            <p style={{ margin: 0 }}><strong>{comment.nom} {comment.prenom}</strong></p>
                            <p style={{ margin: 0 }}>{comment.commentaire}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
