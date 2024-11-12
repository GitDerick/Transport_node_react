import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './GetAllUsers.css'; // Importer le fichier CSS personnalisé si nécessaire

function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/allUsers')
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        const errorMessage = error.response ? error.response.data : 'Erreur de connexion';
        setError(errorMessage);
        console.error(errorMessage);
      });
  }, []);

  const handleDelete = (id) => {
    console.log('Deleting user with ID:', id);
    axios.delete(`http://localhost:3000/api/users/${id}`)
      .then(() => {
        console.log('User deleted successfully:', id);
        setUsers(users.filter(user => user.user_id !== id));
      })
      .catch(error => {
        setError(error.response.data);
        console.error(error.response.data);
      });
  };

  return (
    <div className="container">
      <h1>Liste des utilisateurs</h1>
      {error && <div className="alert alert-danger">Erreur : {error}</div>}
      <table className="table table-striped table-bordered table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id} className="table-row">
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <Link to={`/users/${user.user_id}`} className="btn btn-info btn-sm mr-2">
                  <FontAwesomeIcon icon={faEye} /> Voir Info
                </Link>
                <Link to={`/users/${user.user_id}/edit`} className="btn btn-warning btn-sm mr-2">
                  <FontAwesomeIcon icon={faEdit} /> Modifier
                </Link>
                <button onClick={() => handleDelete(user.user_id)} className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faTrash} /> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllUsers;
