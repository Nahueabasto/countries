import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries, getActivities } from "../Redux/Actions";
import { useDispatch, useSelector } from 'react-redux';
import "./Form.css"


function validate(input) {
    let errors = {};
  
    // Validación del campo "name"
    if (!input.name) {
      errors.name = "Se requiere un name";
    }
  
    // Validación del campo "difficulty"
    if (!input.difficulty) {
      errors.difficulty = "Se requiere una dificultad";
    } else if (isNaN(input.difficulty) || input.difficulty < 1 || input.difficulty > 5) {
      errors.difficulty = "La dificultad debe ser un número entre 1 y 5";
    }
  
    // Validación del campo "duration"
    if (!input.duration) {
      errors.duration = "Se requiere una duración";
    }
  
    // Validación del campo "season"
    if (!input.season) {
      errors.season = "Se requiere una temporada";
    } else if (!["Summer", "Fall", "Winter", "Spring"].includes(input.season)) {
      errors.season = "La temporada debe ser 'Summer', 'Fall', 'Winter' o 'Spring'";
    }
  
    return errors;
  }

export default function Form(){

    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.countries);
    
    //const [selectedCountries, setSelectedCountries] = useState([]);

    const [errors, setErrors] = useState({ });


    const [input, setInput] = useState({
        name: '', 
        difficulty: '', 
        duration: '', 
        season: '', 
        countries: []
    });
    

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities())
      }, [dispatch]);

    function handleChange(e){
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors(
            validate({
            ...input,
            [e.target.name] : e.target.value
        })
        )
    }
 
    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postActivities(input));
        alert("Actividad creada!");
        setInput({ 
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
        })
        history.push('/home'); 
    
    }

    function handleSelect(e) {
      setInput({
          ...input,
          countries: [
              ...input.countries,
              e.target.value
          ]
      });
  };

  function handleDelete(e, el) {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter(item => item !== el)
    });
  };

  const orderedCountries = allCountries.sort(function(a, b){
    if(a.name > b.name){
      return 1;
    }
    if(b.name > a.name){
      return - 1
    }
    return 0;
  });
    
    return(
      
      <div className="backgroundForm">
        <div className="form-container">
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1 className="actividad">Crea Actividad Turistica</h1>
            <form onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label className="name">Name:</label>
                    <input type="text" value={input.name} name='name' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label className="difficulty">Difficulty:</label>
                    <input type="number" value={input.difficulty} name='difficulty' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.difficulty && <p>{errors.difficulty}</p>}
                </div>
                <div>
                    <label className="duration">Duration:</label>
                    <input type='number' value={input.duration} name='duration'
                     onChange={e => handleChange(e)}>  
                    </input>
                    {input.duration && <span> horas</span>}
                    {errors.duration && <p>{errors.duration}</p>}
                </div>
                <div>
            <label className="season">Season:</label>
               <select value={input.season} name='season' onChange={e => handleChange(e)}>
               <option value="" disabled defaultValue> </option>
                 <option value="Summer">Summer</option>
                   <option value="Fall">Fall</option>
                   <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
              {errors.season && <p>{errors.season}</p>}
                </div>

                <div>
                    <label className="countries">Countries:</label>
                    <select name='countries' onChange={e => handleSelect(e)}>
                    <option value="" disabled selected> Countries </option>
                        {allCountries.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                        }
                    </select>
                </div>
                <div> {input.countries?.map(el => (
                  <span key={el.id}>
                   <p> {el}</p>
                   <button onClick={(e) => handleDelete(e, el)}>x</button>
                  </span>
                ))}
                    </div>
                    <div>
                <button type='submit'>Crear Actvidad</button>
                </div>
                   
            </form>
        </div>
        </div>
    )
}


 