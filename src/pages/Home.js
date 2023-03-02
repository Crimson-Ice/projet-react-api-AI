import NavBar from "../components/NavBar";
import ModuleApprentisage from "../components/ModuleApprentisage";
import Route from "../components/Route";
import "./../styles/pages/_home.scss"
import Logs from "../components/Logs";
import DonneApprentissage from "../components/DonneApprentissage";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Error404 from "./Error404";


const Home = () => {
   // Sert pour le routing
   const { id } = useParams();
   const [nombreApprentissage, setNombreApprentissage] = useState();

   const [selectedApprentissage, setSelectedApprentissage] = useState(id ?? 1);
   const [progressActiveApprentissage, setProgressActiveApprentissage] = useState(0);
   const [apprentissageEnCours, setApprentissageEnCours] = useState(false)

   useEffect(() => {
      axios
         .get("http://localhost:5000/trainings")
         .then((res) => setNombreApprentissage(res.data.length));
   }, []);

   // Vérifier si id est valide
   if (id && Number(id) > nombreApprentissage) {
      return <Error404/>;
   }

   //Fonctionne qui vient passe dans d'autres widget (sert a faire remonté des variables)
   const handleSelectedApprentissageChange = (id) => setSelectedApprentissage(id)
   const handleProgressApprentissageChange = (val) => setProgressActiveApprentissage(val)
   const handleApprentissageEnCours = (state) => setApprentissageEnCours(state)

   return (
      <div className="grid">
         <NavBar/>
         <div className="wrapper">
            <Route selectedApprentissage={selectedApprentissage}/>
            <Logs
               selectedApprentissage={selectedApprentissage}
               apprentissageEnCours={apprentissageEnCours}
               progressActiveApprentissage={progressActiveApprentissage}
            />
            <DonneApprentissage/>
         </div>
         <ModuleApprentisage
            selectedApprentissage={selectedApprentissage}
            onSelectedApprentissageChange={handleSelectedApprentissageChange}
            progressActiveApprentissage={progressActiveApprentissage}
            onProgressApprentissageChange={handleProgressApprentissageChange}
            apprentissageEnCours={apprentissageEnCours}
            onApprentissageEnCoursChange={handleApprentissageEnCours}
         />
      </div>
   );
};

export default Home;