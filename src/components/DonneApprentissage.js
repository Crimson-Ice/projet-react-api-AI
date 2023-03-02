import React, {useEffect, useState} from 'react';
import CardDonnee from "./CardDonnee";
import './../styles/components/_donneApprentissage.scss'
import axios from "axios";

const DonneApprentissage = () => {
   const [selectdPage, setSelectedPage] = useState(0)
   const [data, setData] = useState([])
   const [selectedFilter, setSelectedFilter] = useState(0);
   const [dataLabels, setDataLabels] = useState(["", "", ""])

   useEffect(() => {
      //Récuppère les catégorie de données (2)
      axios.get("http://localhost:5000/analysis/1").then((res) =>
         setDataLabels(["AUCUN", res.data.labels[0].name.toString(), res.data.labels[1].name.toString()])
      );
   }, []);

   useEffect(() => {
      //Filtres les données et les ranges par page dans un objet latéral
      let dataCount = 0
      setSelectedPage(0)
      if(dataLabels[selectedFilter] === "AUCUN")
      {
         axios.get('http://localhost:5000/data/count').then((res) =>
            dataCount = res.data.count
         ).then(() => {
            for(let i = 1; i <= Math.ceil(dataCount/20); i++){
               const currentPage = i;
               axios.get(`http://localhost:5000/data?page=${currentPage}`).then((res) => {
                  return setData((prevData) => {
                     return {
                        ...prevData,
                        ["page" + currentPage]: res.data,
                     };
                  });
               })
            }
         });
      }
      else{
         axios.get(`http://localhost:5000/data/count?label=${dataLabels[selectedFilter]}`).then((res) =>
            dataCount = res.data.count
         ).then(() => {
            setData([])
            for(let i = 1; i <= Math.ceil(dataCount/20); i++){
               const currentPage = i;
               axios.get(`http://localhost:5000/data?label=${dataLabels[selectedFilter]}&&page=${currentPage}`).then((res) => {
                  return setData((prevData) => {
                     return {
                        ...prevData,
                        ["page" + currentPage]: res.data,
                     };
                  });
               })
            }
         });
      }
   }, [dataLabels, selectedFilter]);

   return (
      <div>
         <div className="filterContainer">
            <ul>
               {
                  dataLabels.map((value, index, array) =>
                     <li key={index} className={selectedFilter === index ? "activeFilter" : "desactiveFilter"}>
                        <button onClick={(e) => setSelectedFilter(index)}>{value.toUpperCase()}</button>
                     </li>
                  )
               }
            </ul>
         </div>
         <div className="donneContainer">
            {
               Object.values(data)
                  .filter((value, index) => index === selectdPage)
                  .map((page) =>
                  page.map((item) =>
                     <CardDonnee key={item.id} id={item.id} creationTime={item["created_at"]} type={item.annotations[0].annotation.name}/>
                  ))
            }
         </div>
         <div className="pageFilter">
            <ul>
               {
                  Object.values(data)
                     .map((value, index) =>
                        <li key={index} className={selectdPage === index ? "activeFilter" : "desactiveFilter"}>
                           <button onClick={() => setSelectedPage(index)}>{index+1}</button>
                        </li>
                     )
               }
            </ul>
         </div>
      </div>
   );
};

export default DonneApprentissage;
