import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SearchContext from '../Context/SearchContext';
import Styles from './HeroBar.module.css'

const HeroBar = ({history})=>{
    const SearchController = useContext(SearchContext);
    const [query, setQuery] = useState('');
    const onFormSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        SearchController.Search(query);
        history.push('/');
      }
    const onChange = e => {
        setQuery(e.target.value);
    }
    return (
        <div className={Styles.HeroBar}>
            <form className={Styles.SearchForm} onSubmit={onFormSubmit}>
                <input type="text" value={query} onChange={onChange}/>
                <button type="submit">Search!</button>
            </form>
        </div>
    );
}

export default withRouter(HeroBar);
