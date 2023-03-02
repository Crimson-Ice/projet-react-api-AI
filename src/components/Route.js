import React, {useEffect, useState} from 'react';
import "./../styles/components/_route.scss"

const Route = ({selectedApprentissage}) => {
   const [time, setTime] = useState(new Date().toLocaleTimeString());

   //Interval pour l'heure
   useEffect(() => {
      const timeInterval = setInterval(() => {
         setTime(new Date().toLocaleTimeString());
      }, 1000);

      return () => {
         clearInterval(timeInterval);
      };
   }, []);

   return (
      <div className="routeContainer">
         <span>Donnée > Apprentisage #{selectedApprentissage}</span>
         <span>{time}</span>
      </div>
   );
};

export default Route;