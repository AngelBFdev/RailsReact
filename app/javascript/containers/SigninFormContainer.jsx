import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import SigninForm from "../components/shared/Form";
import { EMAIL_REGEX, verifyAndSetFieldErrors } from "../shared/helpers";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    toHomePage: false,
    serverErrors: [],
    saved: false,
  };
  componentDidUpdate = () => {
    if (this.state.saved) {
      this.setState({
        email: "",
        passord: "",
        toHomePage: true,
      });
      this.resetSaved();
    }
  };

  componentWillUnmount = () => {
    if (this.state.serverErrors.length > 0) {
      this.resetSaved();
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.clearErrors(name, value);
  };

  checkErrors = (state, fieldName) => {
    const error = {};

    switch (fieldName) {
      case "email":
        if (!state.email || !EMAIL_REGEX.test(state.email)) {
          error.email = "Please provide a vali email address";
        }
        break;
      case "password":
        if (!state.password) {
          error.password = "Please provide a passord";
        }
        break;
      default:
    }
    return error;
  };

  clearErrors = (name, value) => {
    let errors = { ...this.state.errors };

    switch (name) {
      case "email":
        if (value.length > 0 && EMAIL_REGEX.test(value)) {
          delete errors["email"];
        }
        break;
      case "password":
        if (value.length > 0) {
          delete errors["password"];
        }
        break;
      default:
    }
    this.setState({ errors });
  };

  handleBlur = (event) => {
    const { name } = event.target;
    const fieldError = this.checkErrors(this.state, name);
    const errors = Object.assign({}, this.state.errors, fieldError);
    this.setState({ errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fieldNames = ["email", "password"];
    verifyAndSetFieldErrors(this, fieldNames);

    if (Object.keys(this.state.errors).length === 0) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.handleSignin(user);
    }
  };

  handleSignin = (user) => {
    axios
      .post("/api/v1/signin.json", user)
      .then((response) => {
        this.setState({ toHomePage: true });
      })
      .catch((error) => {
        const msg = error.response.data.error;
        const idx = this.state.serverErrors.indexOf(msg);

        if (idx == -1) {
          this.setState({
            serverErrors: [...this.state.serverErrors, msg],
          });
        }
      });
  };

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  render() {
    if (this.state.toHomePage || this.props.currentUser) {
      return <Navigate to="/" />;
    }
    return (
      <div className="container mt-4">
        <div className="row">
          {this.state.serverErrors.length > 0 && (
            <ErrorMessages errors={this.state.serverErrors} />
          )}
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center form-header-style mt-5 pt-2 pb-3">
              Sign In
            </h1>
            <SigninForm onSubmit={this.handleSubmit}>
              <Input
                title="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your email address"
                autoFocus={true}
                state={this.state}
              />
              <Input
                title="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your password here"
                autoFocus={false}
                state={this.state}
              />
              <Button>Sign in</Button>
            </SigninForm>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
