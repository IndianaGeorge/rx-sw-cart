import React, { useContext } from 'react';
import { useBehaviorSubject } from 'react-rxjs-tools';
import CartContext from '../Context/CartContext';
import Styles from './Cart.module.css';

export default ()=>{
    const CartController = useContext(CartContext);
    const [items] = useBehaviorSubject(CartController.getItemsSubject());
    const [total] = useBehaviorSubject(CartController.getTotalSubject());
    const removeItem = (id)=>{
        CartController.remove(id);
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
                        <button onClick={removeItem.bind(null,item.id)}>X</button>
                        <span>{item.name} (x{item.qty})</span>
                    </li>
                )}
            </ul>
            <span className={Styles.Total}>Total: {total?total:0} credits</span>
            <button onClick={checkout}>Checkout</button>
        </div>
    );
};
