import React from 'react';
import './../styles/components/_recommandation.scss'

const Recommandation = ({data}) => {
   return (
      <div className="recommandation">
         <span>RECOMMENDATIONS</span>
         <ul>
            <li><span>Les données d'entrainement sont à revoir :</span> sur {data.trainData.total} données d'entrainement, {data.trainData.marqueInvalid} données bonnes ont été identifiée mauvaises par l’algorithme.</li>
            <li><span>Les données de validation sont à revoir :</span> sur {data.validationData.total} données de validation, {data.validationData.marqueInvalid} données bonnes ont été identifiée mauvaises par l’algorithme.</li>
         </ul>
      </div>
   );
};

export default Recommandation;
