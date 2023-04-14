import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterContinent, filterActividades, getActivities, filterByOrder, filterBySort } from '../Redux/Actions';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Card from './Card';
import Paginado from './Pagination';
import "./Home.css"

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  
  useEffect(() => {
    //aca uso el useEffect para que cuando se renderice la pagina se ejecute la accion
    setCurrentPage(1); //esto es para que cuando cambie de pagina se actualice
  }, [allCountries]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities())
  }, [dispatch]);

  //En la funcion agrego los estados locales de los select para que cuando uno pongo "volver a cargar todos los cuntries" no quede el nombre previamente seleccionado
  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
    setSelectedContinent("");
    setSelectedActivity("");
    setSelectedOrder("");
    setSelectedSort("");
  }

  function handleFilterContinent(e) {
    e.preventDefault();
    setSelectedContinent(e.target.value);
    dispatch(filterContinent(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterActivities(e){
    e.preventDefault();
    setSelectedActivity(e.target.value);
    dispatch(filterActividades(e.target.value))
    setCurrentPage(1);
  }


  function handleFilterByOrder(e) {
    e.preventDefault();
    setSelectedOrder(e.target.value);
    dispatch(filterByOrder(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterSort(e) {
    e.preventDefault();
    setSelectedSort(e.target.value);
    dispatch(filterBySort(e.target.value));
    setCurrentPage(1);
  }

  const indexOfLastCountry = currentPage * (currentPage === 1 ? 9 : 10);
  const indexOfFirstCountry = indexOfLastCountry - (currentPage === 1 ? 9 : 10);
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );



  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className='home'>
    
     <div class="container">
  <div class="content-container">
    <div class="first-row">
      <button className="button" onClick={(e) => handleClick(e)}>
        Volver a cargar Countries
      </button>
      <div className="link">
        <Link to="/home/form">Crear Actividades Para lo Pises</Link>
      </div>
      <div className="searchbar">
        <SearchBar />
      </div>
    </div>
    <div className="bottom-section">
      <div className="selects">
        <select value={selectedContinent} onChange={(e) => handleFilterContinent(e)}>
          <option value="" disabled defaultValue>Filtrado por continente</option>
          <option value="All"> All </option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select value={selectedOrder} onChange={(e) => handleFilterByOrder(e)}>
          <option value="" disabled defaultValue>Country por orden alfabetico</option>
          <option value="az">Country por ordern alfabetico (a-z) </option>
          <option value="za">Country por ordern alfabetico (z-a)</option>
        </select>

        <select value={selectedSort} onChange={(e) => handleFilterSort(e)}>
          <option value="" disabled defaultValue>Por poblacion</option>
          <option value="asc">País por población (Asc)</option>
          <option value="des">País por población (Desc)</option>
        </select>

        <select value={selectedActivity} onChange={(e) => handleFilterActivities(e)}>
          <option value="" disabled defaultValue> Activities por country </option>
          {allActivities.map(activity => (
            <option key={activity.id} value={activity.name}>{activity.name}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
</div>

      <div>
      <Paginado
        countriesPerPage={currentPage === 1 ? 9 : 10}
         allCountries={allCountries}
        paginate={paginate}
        />
      </div>

  <div className="cards-wrapper">
  <div className="cards-container">
    {currentCountries?.map((el) => {
      return (
        <div className="card-container" key={el.id}>
          <Card
        image={el.image}
        name={el.name}
        continent={el.continent}
        id={el.id}
      />
        </div>
      );
    })}
  </div>
</div>

    </div>
  );
}


