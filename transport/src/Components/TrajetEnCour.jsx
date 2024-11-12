import React from 'react';

import './TrajetEnCour.css'; // Assurez-vous de créer ce fichier CSS
import driverImage from '../assets/Images/driver.jpg';
import carImage from '../assets/Images/car.jpg';
import mapImage from '../assets/Images/map.png';


const TrajetEnCour = () => {
    return (
        <div className="container">
            <header>
                <h1>Commande Uber</h1>
            </header>

            <main>
                <div className="order-status">
                    <div className="driver-info">
                        <img src={driverImage} alt="Driver" className="driver-photo" />
                        <div className="driver-details">
                            <h2>Jean Dupont</h2>
                            <p>Chauffeur</p>
                            <p>Voiture : BMW M3 </p>
                        </div>
                    </div>

                    <div className="ride-info">
                        <h3>En route</h3>
                        <p>Votre chauffeur est en route et devrait arriver dans 5 minutes.</p>
                    </div>

                    <div className="map">
                        {/* Ajouter ici une carte intégrée ou une image de la carte */}
                        <img src={mapImage} alt="Map" className="map-image" />
                    </div>

                    <div className="car-image">
                        <h3>Votre voiture</h3>
                        <img src={carImage} alt="Car" className="car-image" />
                    </div>

                    <div className="estimated-time">
                        <h3>Temps estimé d'arrivée</h3>
                        <p>5 minutes</p>
                    </div>
                </div>
            </main>

            <footer>
                <button className="contact-driver">Contacter le chauffeur</button>
            </footer>
        </div>
    );
};

export default TrajetEnCour;
