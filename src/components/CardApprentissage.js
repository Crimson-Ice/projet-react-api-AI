import React from 'react';
import '../styles/components/_cardApprentissage.scss'

const CardApprentissage = ({id, progress, selectedApprentissage, onSelectedApprentissageChange}) => {


   return (
      <li className="cardApprentisage">
         <button onClick={() => onSelectedApprentissageChange(id)} className={selectedApprentissage.toString() === id.toString() ? "selected" : ""}>
            <div className="wrapper">
               <span>#{id}</span>
               <span>{progress}%</span>
            </div>
            <span>2023</span>
         </button>
      </li>
   );
};

export default CardApprentissage;
