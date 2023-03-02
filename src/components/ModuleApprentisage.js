import React, {useEffect, useState} from 'react';
import "./../styles/components/_moduleApprentisage.scss"
import axios from "axios";
import CardApprentissage from "./CardApprentissage";

const ModuleApprentisage = (
   {
      selectedApprentissage,onSelectedApprentissageChange,
      progressActiveApprentissage, onProgressApprentissageChange,
      apprentissageEnCours, onApprentissageEnCoursChange,
   }
) => {
   const [dataLabels, setDataLabels] = useState([])
   const [dataApprentissage, setDataApprentissage] = useState([])
   const [countData, setCountData] = useState([])
   const [nomApprentissage, setNomApprentissage] = useState("")

   const handleSelectedApprentissageChange = (id) => onSelectedApprentissageChange(id);

   const StartApprentissage = () => {
      if(!apprentissageEnCours){
         axios.post("http://localhost:5000/trainings").then(() => onApprentissageEnCoursChange(true))
         onSelectedApprentissageChange(dataApprentissage.length + 1)
      }
   }

   useEffect(() => {
      //si un apprentissage est en cours met à jours toutes les secondes les données d'apprentissages
      if(apprentissageEnCours === true){
         const timeInterval = setInterval(() => {
            axios.get("http://localhost:5000/trainings")
               .then((res) => {
                  setDataApprentissage(res.data)
                  onProgressApprentissageChange(res.data[res.data.length - 1].progress)

                  if(progressActiveApprentissage === 100){
                     onApprentissageEnCoursChange(false)
                     onProgressApprentissageChange(0)
                  }
               })
         }, 1000);

         return () => {
            clearInterval(timeInterval);
         };
      }
   }, [apprentissageEnCours, progressActiveApprentissage]);

   useEffect(() => {
      //Récuppères des données qui seront afficher dans ce component
      axios.get("http://localhost:5000/analysis/1").then((res) =>
         setDataLabels([res.data.labels[0].name.toUpperCase() ,res.data.labels[1].name.toUpperCase()])
      );

      axios.get("http://localhost:5000/trainings").then((res) => setDataApprentissage(res.data));

      axios.get("http://localhost:5000/analysis/1").then((res) => setNomApprentissage(res.data.name));

      axios.get("http://localhost:5000/data/count?label=bonne")
         .then((res) => setCountData([res.data.count])).then(() => {
         axios.get("http://localhost:5000/data/count?label=cassée")
            .then((res) => setCountData(countData => [...countData, res.data.count]))
      })
   }, [progressActiveApprentissage])

   return (
      <div className="moduleApprentisage">
         <span>STATISTICS</span>
         <h2>{nomApprentissage}</h2>
         <div className="quantite">
            <div className="typeQuantite">
               <span>{dataLabels[0]} (TOTAL)</span>
               <span>{countData[0]}</span>
            </div>
            <div className="typeQuantite">
               <span>{dataLabels[1]} (TOTAL)</span>
               <span>{countData[1]}</span>
            </div>
         </div>
         <div className="apprentisage">
            <span>APPRENTISSAGES</span>
            <ul>
               {
                  dataApprentissage.map((value, index) =>
                     <CardApprentissage key={index} id={value.id} progress={value.progress} selectedApprentissage={selectedApprentissage} onSelectedApprentissageChange={handleSelectedApprentissageChange}/>
                  )
               }
            </ul>
         </div>
         <button onClick={() => StartApprentissage()}>LANCER UN APPRENTISSAGE</button>
      </div>
   );
};

export default ModuleApprentisage;