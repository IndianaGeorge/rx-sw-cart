import React, { useContext, useEffect } from 'react';
import CartContext from '../Context/CartContext';
import { useBehaviorSubject } from 'react-rxjs-tools';
import SearchContext from '../Context/SearchContext';
import Styles from './SearchResults.module.css';
import { Link } from 'react-router-dom';
import Overlay from 'react-loading-retry-overlay';

export default ()=>{
    const CartController = useContext(CartContext);
    const [items] = useBehaviorSubject(CartController.getItemsSubject());
    const inCart = {};
    items.reduce((acc,item)=>{
        inCart[item.id] = true;
        return 0;
    },0);
    const SearchController = useContext(SearchContext);
    const [results] = useBehaviorSubject(SearchController.GetResultsSubject());
    const [status] = useBehaviorSubject(SearchController.GetStatusSubject());
    useEffect(()=>{
        SearchController.Clear();
    },[SearchController]);
    return (
        <div className={Styles.SearchResults}>
            <Overlay
                error={status===SearchController.states.error}
                loading={status===SearchController.states.loading}
            >
                <ul className={Styles.ResultsList} role="grid">
                        {results.map((item)=>
                            <li key={item.id} role="row">
                                <Link className={Styles.Item} to={`/detail/${item.id}`} role="gridcell">
                                    <span>{item.name}</span><span>{item.cost_in_credits} credits</span>
                                </Link>
                                {
                                    inCart[item.id]?
                                    <div className={Styles.Label}>in cart</div>
                                    :
                                    null
                                }                        
                            </li>
                            
                        )}
                </ul>
            </Overlay>
        </div>
    );
}
