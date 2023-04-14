import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"

export default function Card({id, image, name, continent}) {
    return(
        <div >
            <Link to={`/countries/${id}`} className="card-link">
            <div>
            <img src={image} alt="boy hay" />
            </div>
            <h2 className="cardName">{name}</h2>
            <h5 className="card-continent" >Continent: {continent}</h5>
            </Link>
        </div>
    )
}
