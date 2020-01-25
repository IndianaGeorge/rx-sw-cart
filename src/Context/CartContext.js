import { createContext } from 'react';
import CartController from '../Controller/CartController';

export default createContext(new CartController());
