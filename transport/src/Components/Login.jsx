import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import onLogin from "../App.jsx"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' 
  });

  const [response, setResponse] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/users/login', formData)
      .then(res => {
        if (res && res.data) {
          setResponse(res.data);
          console.log(res.data);

          // Afficher le token de connexion
          // alert(`Token de connexion: ${res.data.token}`);

          // Stocker le token dans le localStorage
          localStorage.setItem('authToken', res.data.token);

          
          // Redirection en fonction du rôle de l'utilisateur
          if (formData.role === 'user') {
            navigate('/users'); // Redirection vers la page Users
          } else {
            navigate('/getAllUsers'); // Redirection par défaut
          }
        } else {
          console.error('Réponse invalide de l\'API');
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setResponse(error.response.data);
          console.error(error.response.data);
        } else {
          console.error('Erreur inattendue lors de la connexion :', error);
        }
      });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
        <h2>Connexion</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rôle:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="user">Utilisateur</option>
            <option value="driver">Chauffeur</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Se connecter</button>
      </form>
      {response && <p>{JSON.stringify(response)}</p>}
    </div>
  );
}

export default Login;
