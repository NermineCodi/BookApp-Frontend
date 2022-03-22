import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Home from './pages/Home';


export default class App extends Component {  

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
         <Home/>
        </header>
      </div>
    )
  }
}



