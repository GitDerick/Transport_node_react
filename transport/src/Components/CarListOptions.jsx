import React, { useState } from 'react';
import { CarListData } from '../utils/CarListData';
import CarListItem from './CarListItem';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import './CarListOptions.css';

// Configuration des options PayPal
const PAYPAL_CLIENT_ID = 'AYzHvgweA9Wlv_D0GsOZJmHJ1hRSBx9Ls8qFBnO3LoQDrqyvhSR0H_b_N2iFL3d2cnCP-ErYWgizLewM'; // Remplacez par votre ID client PayPal

function CarListOptions({ distance }) {
    const [activeIndex, setActiveIndex] = useState();
    const [selectedCar, setSelectedCar] = useState(null);
    const navigate = useNavigate();

    // Calculer le montant total pour le paiement
    const calculateTotal = (amount) => {
        const total = (amount * distance).toFixed(2);
        return parseFloat(total) > 0 ? total : '0.01'; // Assurez-vous que le total est toujours un montant valide
        //return amount = 0.1;
    };

    return (
        <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
            <div className='mt-5 p-5 overflow-auto h-[250px]'>
                <h2 className='text-[22px] font-bold'>
                    Recommended
                </h2>
                {CarListData.map((item, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer p-2 px-4 rounded-md border-black
                        ${activeIndex === index ? 'border-[3px]' : 'border-transparent'}`}
                        onClick={() => {
                            setActiveIndex(index);
                            setSelectedCar(item);
                        }}
                    >
                        <CarListItem car={item} distance={distance} />
                    </div>
                ))}

                {selectedCar ? (
                    <div className='payment-section'>
                        <h2>Make Payment For {selectedCar.name}</h2>
                        <div className='payment-button'>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    //const total = calculateTotal(selectedCar.amount);
                                    const total = 0.01;
                                    console.log('Total Amount:', total); // Débogage
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                currency_code: 'USD',
                                                value: total
                                            }
                                        }]
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        alert('Payment Successful!');
                                        console.log('Payment Details:', details);
                                        // Ajoutez ici toute action après paiement réussi
                                        navigate('/trajet-en-cour');
                                    });
                                }}
                                onError={(err) => {
                                    console.error('PayPal Error:', err);
                                    alert('Payment failed. Please try again.');
                                }}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </PayPalScriptProvider>
    );
}

export default CarListOptions;
