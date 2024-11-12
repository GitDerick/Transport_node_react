// components/Trajet.jsx
import React, { Component } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, StandaloneSearchBox } from '@react-google-maps/api';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import CarListOptions from './CarListOptions';
import CommentForm from './CommentForm'; // Importation du composant CommentForm
import CommentList from './CommentList';

const containerStyle = {
    width: '100%',
    height: '400px',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1'
};

const center = {
    lat: 45.501690,
    lng: -73.567253
};

// Prix par kilomètre et taux de taxes
const PRICE_PER_KM = 1.5; // Prix fictif en dollars par kilomètre
const TPS_RATE = 0.05; // Taux de la TPS (5%)
const TVQ_RATE = 0.09975; // Taux de la TVQ (9.975%)

class MapContainer extends Component {
    state = {
        directionsResponse: null,
        origin: '',
        destination: '',
        distance: '',
        duration: '',
        totalPrice: null,
        taxes: null,
        grandTotal: null,
        paymentCompleted: false,
        showCommentForm: false, // Variable d'état pour afficher le formulaire de commentaire
        showCommentList: false
    };

    originRef = React.createRef();
    destinationRef = React.createRef();

    handleCalculateRoute = () => {
        const origin = this.originRef.current.getPlaces()[0].formatted_address;
        const destination = this.destinationRef.current.getPlaces()[0].formatted_address;

        if (origin && destination) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin,
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        const distance = result.routes[0].legs[0].distance.value; // en mètres
                        const distanceText = result.routes[0].legs[0].distance.text;
                        const durationText = result.routes[0].legs[0].duration.text;

                        const distanceInKm = distance / 1000; // Conversion de mètres en kilomètres

                        //const basePrice = distanceInKm * PRICE_PER_KM;
                        const basePrice = 0.01
                        const taxes = basePrice * (TPS_RATE + TVQ_RATE);
                        const grandTotal = basePrice + taxes;
                        //const grandTotal = 0.01


                        this.setState({
                            directionsResponse: result,
                            distance: distanceText,
                            duration: durationText,
                            totalPrice: basePrice,
                            taxes: taxes,
                            grandTotal: grandTotal,
                            paymentCompleted: false, // Réinitialiser l'état du paiement
                            showCommentForm: true, // Afficher le formulaire de commentaire après le calcul de l'itinéraire
                            showCommentList: true
                        });
                    } else {
                        console.error(`Error fetching directions ${result}`);
                    }
                }
            );
        }
    };

    handlePaymentSuccess = (details, data) => {
        // Mettre à jour l'état pour indiquer que le paiement est effectué
        this.setState({ paymentCompleted: true });
        // Vous pouvez ajouter ici des actions supplémentaires après le paiement réussi
    };

    render() {
        const { directionsResponse, distance, duration, totalPrice, taxes, grandTotal, paymentCompleted, showCommentForm, showCommentList } = this.state;

        return (
            <PayPalScriptProvider options={{ "client-id": "AYzHvgweA9Wlv_D0GsOZJmHJ1hRSBx9Ls8qFBnO3LoQDrqyvhSR0H_b_N2iFL3d2cnCP-ErYWgizLewM" }}>
                <div className="container mt-4" style={{ marginTop: '420px' }}> {/* Espace pour éviter que le contenu ne soit caché sous la carte */}
                    <LoadScript googleMapsApiKey="AIzaSyDASepMSemVFTJCfMZzaewFVCSI1y4PVsY" libraries={['places']}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            {directionsResponse && (
                                <DirectionsRenderer
                                    directions={directionsResponse}
                                />
                            )}
                        </GoogleMap>

                        <div className="row mt-4" style={{ width: '2000px' }}>
                            <div className="col-md-6" style={{ width: '35%' }}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Enter Your Location</h5>
                                        <div className="form-group">
                                            <StandaloneSearchBox
                                                onLoad={ref => this.originRef.current = ref}
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Origin"
                                                />
                                            </StandaloneSearchBox>
                                        </div>
                                        <div className="form-group">
                                            <StandaloneSearchBox
                                                onLoad={ref => this.destinationRef.current = ref}
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Destination"
                                                />
                                            </StandaloneSearchBox>
                                        </div>
                                        {distance ? <CarListOptions distance={distance} /> : null}
                                        <button
                                            className="btn btn-primary btn-block"
                                            onClick={this.handleCalculateRoute}
                                        >
                                            Chercher Trajet
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {showCommentForm && ( // Afficher le formulaire de commentaire uniquement si showCommentForm est true
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Commentaire</h5>
                                            <CommentForm /> {/* Inclure le formulaire de commentaire */}
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Commentaire</h5>
                                            <CommentList />
                                        </div>
                                    </div>
                                </div>


                            )}


                        </div>
                    </LoadScript>
                </div>
            </PayPalScriptProvider>
        );
    }
}

export default MapContainer;
