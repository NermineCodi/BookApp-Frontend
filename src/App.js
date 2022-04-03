import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Home from './pages/Home';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound'
import Layout from './components/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path={'categories'} element={<Categories />} />
            <Route path={'/*'} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}



