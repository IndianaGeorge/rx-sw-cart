import React from 'react';
import Styles from './ItemDetail.module.css';
import { useParams } from 'react-router-dom';

export default ()=>{
    const vehicle = {
        "name": "Sand Crawler", 
        "model": "Digger Crawler", 
        "manufacturer": "Corellia Mining Corporation", 
        "cost_in_credits": "150000", 
        "length": "36.8", 
        "max_atmosphering_speed": "30", 
        "crew": "46", 
        "passengers": "30", 
        "cargo_capacity": "50000", 
        "consumables": "2 months", 
        "vehicle_class": "wheeled", 
        "pilots": [], 
        "films": [
            "https://swapi.co/api/films/5/", 
            "https://swapi.co/api/films/1/"
        ], 
        "created": "2014-12-10T15:36:25.724000Z", 
        "edited": "2014-12-22T18:21:15.523587Z", 
        "url": "https://swapi.co/api/vehicles/4/"
    };
    const alreadyInCart = true;
    let { id } = useParams();
    const addToCart = ()=>{
        console.log(`Requested adding item ${id} to cart for ${vehicle.cost_in_credits}`);
    };
    return (
        <div className={Styles.ItemDetail}>
            <div className={Styles.HeaderWrap}>
                <div className={Styles.Header}>
                    <div>
                        <h1>{vehicle.name}</h1>
                        <h3>{vehicle.model}</h3>
                    </div>
                    <div>
                        <h3>{vehicle.cost_in_credits} credits</h3>
                        <button onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
                {
                    alreadyInCart?
                        <div className={Styles.Label}>In cart</div>
                    :
                        null
                }
            </div>
            <div className={Styles.Body}>
                <ul>
                    <li>Manufacturer : {vehicle.manufacturer}</li>
                    <li>Length : {vehicle.length}</li>
                    <li>Max speed : {vehicle.max_atmospheric_speed}</li>
                    <li>Crew : {vehicle.crew}</li>
                    <li>Passengers : {vehicle.passengers}</li>
                    <li>Cargo Capacity : {vehicle.cargo_capacity}</li>
                    <li>Consumables : {vehicle.consumables}</li>
                    <li>Class : {vehicle.vehicle_class}</li>
                </ul>
            </div>
        </div>
    );
}