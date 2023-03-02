import React from 'react';
import "./../styles/components/_navbar.scss"

const NavBar = () => {
   return (
      <div className="navbar">
         <div className="top-items">
            <img className="items" src="http://localhost:3000/IconePsycle.svg" alt="Icône Psycle"/>
            <div className="items donneIcon">
               <i className="fa-solid fa-database "></i>
               <span>DONNÉES</span>
            </div>
         </div>
         <i className="fa-solid fa-power-off fa-xl"></i>
      </div>
   );
};

export default NavBar;