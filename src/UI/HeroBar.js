import React from 'react'
import Styles from './HeroBar.module.css'

export default ()=>{
    const onFormSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        console.log('search requested');
      }
    return (
        <div className={Styles.HeroBar}>
            <form className={Styles.SearchForm} onSubmit={onFormSubmit}>
                <input type="text" />
                <button type="submit">Search!</button>
            </form>
        </div>
    );
}
