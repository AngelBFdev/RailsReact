import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '../components/shared/Header'
import Jumbotron from '../components/products/Jumbotron'
import ProductList from './ProductsContainer'
import Footer from '../components/shared/Footer'

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route exact path='/' element={<ProductList/>}/>
    </Routes>
    <Footer />
  </BrowserRouter>
)

export default App
