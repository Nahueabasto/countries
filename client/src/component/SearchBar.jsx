import React, { useState }from "react";
import { useDispatch } from "react-redux";
import { getNameCountry } from "../Redux/Actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault(e);
        dispatch(getNameCountry(name))
    }

    return(
        <div>
            <input type="text" placeholder="Buscar Country" 
            onChange={e => handleInputChange(e)} />
            <button type="submit" onClick={e => handleSubmit(e)}>Buscar</button>
           
        </div>
    )
}