import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      {user ? (
        <div className="card">
          <div className="card-header">
            <h2>User Detail: {user.first_name} {user.last_name}</h2>
          </div>
          <div className="card-body">
            <p className="card-text"><strong>First Name:</strong> {user.first_name}</p>
            <p className="card-text"><strong>Last Name:</strong> {user.last_name}</p>
            <p className="card-text"><strong>Email:</strong> {user.email}</p>
            <p className="card-text"><strong>Phone Number:</strong> {user.phone_number}</p>
          </div>
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      )}
    </div>
  );
};

export default UserDetail;
