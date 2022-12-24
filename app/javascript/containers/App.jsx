import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../components/shared/Header";
import ProductList from "./ProductsContainer";
import Footer from "../components/shared/Footer";
import ProductDetail from "./ProductDetailContainer";
import Signup from "./SignupFormContainer";
import axios from "axios";

class App extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount = () => {
    this.fetchCurrentUser();
  };

  fetchCurrentUser = () => {
    axios
      .get("/api/v1/users/get_current_user.json")
      .then((response) => {
        let currentUser = response.data.currentUser || null;
        this.setCurrentUser(currentUser);
      })
      .catch((error) => console.log(error.response.data));
  };

  setCurrentUser = (currentUser) => {
    this.setState({ currentUser });
  };

  render() {
    return (
      <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/register"
            element={
              <Signup
                onFetchCurrentUser={this.fetchCurrentUser}
                currentUser={this.state.currentUser}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
