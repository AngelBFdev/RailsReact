import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from '../components/shared/Header'
import Jumbotron from '../components/products/Jumbotron'
import ProductList from './ProductsContainer'
import Footer from '../components/shared/Footer'

const App = () => (
  <BrowserRouter>
    <>
      <Header />
      <Jumbotron />
      <ProductList />
      <Footer />
    </>
  </BrowserRouter>
)

export default App
