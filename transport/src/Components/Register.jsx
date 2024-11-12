import { useState } from 'react';
import React from 'react'
import axios, { formToJSON } from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        password: '',
        phone_number: '',
    });

    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/users/register', formData)
            .then(res => {
                if (res && res.data) {
                    setResponse(res.data);
                    console.log(res.data);
                    navigate('/login');
                } else {
                    console.error('Réponse invalide de l\'API');
                }
            })
            .catch(error => {
                setResponse(error.response.data);
                console.error(error.response.data);
            });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
                <h2>Register</h2>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Prénom:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Prénom"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Nom:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Nom"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date_of_birth" className="form-label">Date de naissance:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
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
                    <label htmlFor="phone_number" className="form-label">Numéro de téléphone:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Numéro de téléphone"
                    />
                </div>
                <button type="submit" className="btn btn-primary">S'inscrire</button>
            </form>
            {response && <p>{JSON.stringify(response)}</p>}
        </div>
    );
}
export default Register