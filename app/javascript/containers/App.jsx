import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '../components/shared/Header'
import ProductList from './ProductsContainer'
import Footer from '../components/shared/Footer'
import ProductDetail from './ProductDetailContainer'
import NewProductForm from '../components/products/NewProductForm'

class App extends Component {
  render(){
    return(
       <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<ProductList/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    )
  }

}

export default App
