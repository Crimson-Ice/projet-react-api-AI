import '../styles/components/_cardDonnee.scss'

const CardDonnee = ({id, creationTime, type}) => {
   const pathImage = `http://localhost:5000/data/${id}/image`

   const dateFormater = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", {
         year: "numeric",
         month: "long",
         day: "numeric",
         hour: "numeric",
         minute: "numeric",
         second: "numeric",
      });
   }

   return (
      <div className="cardContainer">
         <img src={pathImage} alt={pathImage} loading="lazy"/>
         <div className="texte">
            <span>{type.toUpperCase()}</span>
            <span>{dateFormater(creationTime)}</span>
         </div>
      </div>
   );
};

export default CardDonnee;
