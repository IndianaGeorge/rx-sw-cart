import React, { useState, useContext, useEffect } from 'react';
import { useBehaviorSubject } from 'react-rxjs-tools';
import CartContext from '../Context/CartContext';
import DetailController from '../Controller/DetailController';
import Styles from './ItemDetail.module.css';
import { useParams } from 'react-router-dom';
import Overlay from 'react-loading-retry-overlay';

export default ()=>{
    const [detailController] = useState(new DetailController());
    const CartController = useContext(CartContext);
    const [items] = useBehaviorSubject(CartController.getItemsSubject());
    const [vehicle] = useBehaviorSubject(detailController.getDetailSubject());
    const [status] = useBehaviorSubject(detailController.getStatusSubject());
    let { id } = useParams();
    const alreadyInCart = items.reduce((acc,item)=>(acc||item.id===id)?true:false,false);
    const canPurchase = status===detailController.states.ok?!isNaN(vehicle.cost_in_credits):false;
    const addToCart = ()=>{
        const found = vehicle.url.match(/\/(\d+)\/?$/);
        CartController.add({
            name: vehicle.name,
            id: found[1],
            unitCost: Number(vehicle.cost_in_credits),
        });
    };
    useEffect(()=>{
        detailController.getDetail(id);
    },[]);
    return (
        <div className={Styles.ItemDetail}>
            <Overlay
                error={status===detailController.states.error}
                loading={status===detailController.states.loading}
            >
                {
                    status === detailController.states.ok?
                        <div>
                            <div className={Styles.HeaderWrap}>
                                <div className={Styles.Header}>
                                    <div>
                                        <h1>{vehicle.name}</h1>
                                        <h3>{vehicle.model}</h3>
                                    </div>
                                    <div>
                                        <h3>{vehicle.cost_in_credits} credits</h3>
                                        {
                                            canPurchase?
                                                <button onClick={addToCart}>Add to cart</button>
                                            :
                                                null
                                        }
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
                    :
                        null
                }
            </Overlay>
        </div>
    );
}