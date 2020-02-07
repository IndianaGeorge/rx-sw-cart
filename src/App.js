import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Styles from './App.module.css';

import HeroBar from './UI/HeroBar';
import SearchResults from './UI/SearchResults';
import ItemDetail from './UI/ItemDetail';
import Cart from './UI/Cart';

export default ()=>{
  return (
    <BrowserRouter>
      <div className={Styles.App}>
        <HeroBar />
        <div className={Styles.Main}>
          <div className={Styles.Grow}>
            <Switch>
              <Route exact path="/" component={SearchResults} />
              <Route exact path="/detail/:id" component={ItemDetail} />
            </Switch>
          </div>
          <div className={Styles.Fixed}>
            <Cart />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
