import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Home from './pages/Home';
import Categories from './pages/Categories';
import {BrowserRouter} from 'react-router-dom';

export default class App extends Component {  

  render() {
    
    return (
      <BrowserRouter>
      <div className="App">
         {/* <Home/> */}
         {/* <Categories/> */}
      </div>
      </BrowserRouter>
      
    )
  }
}



