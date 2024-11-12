import React from 'react';
import './CarListItem.css';
import { HiUser } from "react-icons/hi";

function CarListItem({ car, distance }) {
  // Convertir la distance en nombre, en enlevant tout caractère non numérique
  //const distanceInKm = parseFloat(distance.replace(/[^0-9.]/g, ''));
  const distanceInKm = 0.01

  return (
    <div>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-3'>
          <img src={car.image} alt={car.name} width={100} height={100} />
          <div>
            <h2 className='font-semibold text-18 flex items-center gap-2'>
              {car.name}
              <HiUser />
              <span className="custom-font">{car.seat}</span>
            </h2>
            <p>{car.desc}</p>
          </div>
        </div>
        <h2 className='text-18 font-semibold'>
          ${(car.amount * distanceInKm).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default CarListItem;
