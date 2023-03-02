import "../styles/components/_logs.scss"
import { Chart, registerables } from 'chart.js';
import BarGraph from "./BarGraph";
import LogTableau from "./LogTableau";
import Recommandation from "./Recommandation";
import {useEffect, useState} from "react";
import axios from "axios";
Chart.register(...registerables);

const Logs = ({selectedApprentissage, apprentissageEnCours, progressActiveApprentissage}) => {

   const typeDonneBasique = "Train"
   const [logVisible, setLogVisible] = useState(false);
   const [typeDonne, setTypeDonne] = useState("Train");
   const [trainData, setTrainData] = useState([]);
   const [validationData, setValidationData] = useState([]);
   const [dataRecommandation, setDataRecommandation] = useState({})
   const [progressSelectedApprentissage, setProgressSelectedApprentissage] = useState(0)
   const [nombreApprentissage, setNombreApprentissage] = useState(0)

   useEffect(() => {
      axios.get(`http://localhost:5000/trainings`).then((res) => {
         setNombreApprentissage(res.data.length)
      })

      //Récuppère les données pour le graphique, le tableau et les recommandations
      axios.get("http://localhost:5000/trainings").then((res) => {
         setProgressSelectedApprentissage(res.data[selectedApprentissage - 1].progress)
         if (res.data[selectedApprentissage - 1].progress === 100) {
            axios.get(`http://localhost:5000/trainings/${selectedApprentissage}/result`).then((res) => {
               // Données pour le graphique en bar et le tableaux
               setTrainData(res.data["train_set"])
               setValidationData(res.data["validation_set"])

               // Stockage des donnée pour les recommandations
               let totalTrain = 0, totalValidation = 0
               res.data["train_set"]["confusion_matrix"].map((val) => val.map((val) => totalTrain += val))
               res.data["validation_set"]["confusion_matrix"].map((val) => val.map((val) => totalValidation += val))
               setDataRecommandation({
                  trainData: {
                     total: totalTrain,
                     marqueInvalid: res.data["train_set"]["confusion_matrix"][1][0]
                  },
                  validationData: {
                     total: totalValidation,
                     marqueInvalid: res.data["validation_set"]["confusion_matrix"][1][0]
                  }
               })
            });
         }
         return 0
      })
   }, [selectedApprentissage, apprentissageEnCours]);

   useEffect(() => {
      //Modifie la progress bar en fonction d'une variable stocker dans home si il y a un apprentissage
      if(apprentissageEnCours && selectedApprentissage === nombreApprentissage){
         setProgressSelectedApprentissage(progressActiveApprentissage)
      }
   }, [progressActiveApprentissage]);


   return (
      <div className="logContainer">
         {!logVisible &&
            <div>
               <div className="texteChargement">
                  <span>APPRENTISAGE EN COURS</span>
                  <span>{progressSelectedApprentissage}%</span>
               </div>
               <div className="barreChargement">
                  <progress id="file" max="100" value={progressSelectedApprentissage}></progress>
               </div>
               <div className="log">
                  {(progressSelectedApprentissage === 100) &&
                     <button onClick={() => setLogVisible(true)}>AFFICHER LES LOGS</button>
                  }
               </div>
            </div>
         }
         {(logVisible && progressSelectedApprentissage === 100) &&
            <div className="logGraph">
               <div className="statTitle">
                  <span>RÉSUMÉ DE L'APPRENTISSAGE</span>
                  <div className="bargraph">
                     {
                        typeDonne === typeDonneBasique ?
                        <BarGraph pourcentage={trainData["f1-score"]}/>
                        :
                        <BarGraph pourcentage={validationData["f1-score"]}/>
                     }
                  </div>
               </div>
               <div className="tableau">
                  {
                     typeDonne === typeDonneBasique ?
                     <LogTableau labelDonnee={trainData.classes} valuesDonnee={trainData["confusion_matrix"]}/>
                     :
                     <LogTableau labelDonnee={validationData.classes} valuesDonnee={validationData["confusion_matrix"]}/>
                  }
                  <div className="select">
                     <label htmlFor="cars">Données :</label>
                     <select name="typeDonnee" id="typeDonnee" onChange={(e) => setTypeDonne(e.target.value)}>
                        <option value="Train">Train</option>
                        <option value="Test">validation</option>
                     </select>
                  </div>
               </div>
               <Recommandation data={dataRecommandation}/>
            </div>
         }
      </div>
   );
};

export default Logs;