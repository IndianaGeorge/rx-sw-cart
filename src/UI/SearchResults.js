import React from 'react';
import Styles from './SearchResults.module.css';
import { Link } from 'react-router-dom';
import Overlay from 'react-loading-retry-overlay';

export default ()=>{
    const inCart = true;
    const results = [
        {
            name: "Item Numero uno",
            id: 1,
        },
        {
            name: "Item Numero dos",
            id: 2,
        },
        {
            name: "Item Numero tres",
            id: 3,
        },
        {
            name: "Item Numero cuatro",
            id: 4,
        },
    ];
    return (
        <div className={Styles.SearchResults}>
            <Overlay>
                <ul className={Styles.ResultsList}>
                        {results.map((item)=>
                            <li key={item.id}>
                                <Link className={Styles.Item} to={`/detail/${item.id}`}>
                                    {item.name}
                                </Link>
                                {
                                    inCart?
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
