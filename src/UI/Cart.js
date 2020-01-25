import React from 'react';
import Styles from './Cart.module.css';
import Overlay from 'react-loading-retry-overlay';

export default ()=>{
    const items = [
        {
            name: "Item Numero dos",
            qty: 1,
            id: 2,
            unitCost: 100,
        },
        {
            name: "Item Numero tres",
            qty: 4,
            id: 3,
            unitCost: 250,
        },
    ];
    const removeItem = (id)=>{
        console.log('requested removal from cart of:',id);
    }
    const checkout = ()=>{
        console.log('checkout requested');
    }
    return (
        <div className={Styles.Cart}>
            <span className={Styles.Title}>Your items:</span>
            <ul className={Styles.ItemList}>
                {items.map((item)=>
                    <li key={item.id}>
                        <span>{item.name} (x{item.qty})</span>
                        <button onClick={removeItem.bind(null,item.id)}>X</button>
                    </li>
                )}
            </ul>
            <span className={Styles.Total}>Total: {items.reduce((acc,item)=>acc+item.unitCost,0)} credits</span>
            <button onClick={checkout}>Checkout</button>
        </div>
    );
};
