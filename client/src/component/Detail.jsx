import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getActivities } from "../Redux/Actions";
import "./Detail.css";

export default function CountryDetails({id}) {
 // const { id } = props.match.params;

  const dispatch = useDispatch();
  const details = useSelector((state) => state.datails);
  const activities = useSelector((state) => state.activities);
  console.log(activities)

  const [selectedActivity, setSelectedActivity] = useState("");

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getActivities());
  }, [dispatch, id]);

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  return ( 
    <div class="contenedor-principal">
    <div className="card" style={{ display: "flex" }}>
      {details && (
        <div style={{ flex: 1 }}>
          <img className="card-img" src={details.image} alt="Not found" />
          <p>Name: {details.name}</p>
          <p>Código de país: {details.id}</p>
          <p>Continente: {details.continent}</p>
          <p>Capital: {details.capital}</p>
          <p>Subregión: {details.subregion}</p>
          <p>Área: {details.area} km²</p>
          <p>Población: {details.population}</p>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <h2>Actividades turísticas</h2>
        <select value={selectedActivity} onChange={handleActivityChange}>
          <option value="">Selecciona una actividad</option>
          {details.activities?.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        {selectedActivity && (
          <div>
            <h4>Datos de la actividad seleccionada:</h4>
            {details.activities
              .filter((el) => el.name === selectedActivity)
              .map((el) => (
                <div key={el.id}>
                  <p>Dificultad: {el.difficulty}</p>
                  <p>Duración (Horas): {el.duration}</p>
                  <p>Temporada: {el.season}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
   </div>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useState, useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDetail, getActivities } from "../Redux/Actions";


// export default function CountryDetails({id}){

//     const thisCountry = useSelector((state) => state.datails);

//     const dispatch = useDispatch();

//     useEffect( () => { //trae los countries de nuevo cada vez que renderiza o que hay un cambio.
//         dispatch(getDetail(id));
//     },[dispatch, id]);


//     return (
//     <div>
//         <h1>{thisCountry.name}</h1>
//         <h4>Capital:</h4>
//         <p> {thisCountry.capital}</p>
//         <h4>Flag:</h4>
//         <p> <img src={thisCountry.image} alt={thisCountry.name}/></p>
//         <h4>Continent:</h4>
//         <p>{thisCountry.continent}</p>
//         <h4>Subregion:</h4>
//         <p> {thisCountry.subregion}</p>
//         <h4>Total area:</h4>
//         <p> {thisCountry.area}</p>
//         <h4>Population:</h4>
//         <p> {thisCountry.population}</p>
//         <h4>Activities:</h4>
// {/*        <h5> {thisCountry.activities.name}</h5>
//         <h5> {thisCountry.activities.difficulty}</h5>
//         <h5> {thisCountry.activities.duration}</h5>
//     <h5> {thisCountry.activities.season}</h5>*/}
//     <div>{thisCountry.activities?.map(a => (
//                         <div>
//                            <h5>Activity:</h5> 
//                            <p>{a.name}</p>
//                            <h5>Difficulty: </h5>
//                            <p>{a.difficulty} </p>
//                            <p>(1 super easy - 2 easy - 3 medium - 4 hard - 5 extremely hard)</p>
//                             <h5>Duration:</h5> 
//                             <p>{a.duration} hours</p>
//                             <h5>Season</h5>
//                             <p>{a.season}</p>
//                         </div>
//                         ))}
//                         </div>
//     </div>
//     )
// }








