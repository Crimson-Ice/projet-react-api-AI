import './../styles/components/_logTableau.scss'

const LogTableau = ({labelDonnee, valuesDonnee}) => {

   labelDonnee = labelDonnee.map((val) => val.toUpperCase())

   return (
      <div className="logTableau">
         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th className="titrePrincipale"><span>{labelDonnee[0]}</span></th>
                  <th className="titreSecondaire"><span>{labelDonnee[1]}</span></th>
               </tr>
               <tr>
                  <th className="texteDeCoter titrePrincipale"><span>{labelDonnee[0]}</span></th>
                  <td className="bigSquare">{valuesDonnee[0][0]}</td>
                  <td className="bigSquare">{valuesDonnee[0][1]}</td>
               </tr>
               <tr>
                  <th className="texteDeCoter titreSecondaire"><span>{labelDonnee[1]}</span></th>
                  <td className="bigSquare">{valuesDonnee[1][0]}</td>
                  <td className="bigSquare">{valuesDonnee[1][1]}</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default LogTableau;
