import axios from "axios";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import EditProductForm from "./EditProductFormContainer";
import CommentList from "../components/comments/CommentList";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      editing: false,
      updated: false,
      comments: [],
      saved: false,
      serverErrors: [],
    };
  }

  componentDidMount() {
    this.getProductAndComments();
  }

  componentDidUpdate = () => {
    if (this.state.editing && this.state.updated) {
      this.getProductAndComments();
    }
  };

  getProductAndComments = () => {
    const { id } = this.props.params;

    if (id) {
      axios
        .all([
          axios.get(`/api/v1/products/${id}.json`),
          axios.get(`/api/v1/products/${id}/comments.json`),
        ])
        .then(
          axios.spread((productResponse, commentsResponse) => {
            this.setState({
              product: productResponse.data.product,
              comments: commentsResponse.data.comments,
            });
          })
        )
        .catch((error) => this.props.history("/"));
    }
  };

  setUpdated = (value) => {
    this.setState({ updated: value });
  };

  editingProduct = (value) => {
    if (value === undefined) {
      this.setState({ editing: true });
    } else if (value === "edited") {
      this.setState({ editing: false });
    }
  };

  isOwner = (user, product) => {
    if (Object.keys(product).length > 0) {
      return user && user.id === product.user_id;
    }
    return false;
  };

  handleDelete = (event) => {
    event.preventDefault();
    this.handleProductDelete(this.props.params.id);
  };

  handleCommentSubmit = (data) => {
    const {id} = this.props.params;
    axios
      .post(`/api/v1/products/${id}/comments.json`, data)
      .then((response) => {
        const comments = [response.data.comment, ...this.state.comments];
        this.setState({ comments });
      })
      .catch((error) => this.setState({ serverErrors: error.response.data }));
  };

  handleProductDelete = (id) => {
    axios
      .delete(`/api/v1/products/${id}.json`)
      .then((response) => {
        this.props.history("/");
      })
      .catch((error) => console.log(error));
  };

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  render() {
    const { id } = this.props.params;
    const { product } = this.state;
    const { currentUser } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <img
              className="img-fluid"
              src="https://via.placeholder.com/350x150"
              width="100%"
            />
          </div>
          <div className="col-md-10 offset-md-1">
            <div className="float-end">
              <h3>
                <span className="badge badge-pill badge-purple">
                  {product.price}
                </span>
              </h3>
            </div>
            <div>
              <h3>{product.name}</h3>
            </div>
            <div className="mb-4">{product.description}</div>

            {this.isOwner(currentUser, product) && !this.state.editing ? (
              <Fragment>
                <div className="float-end btn-edit-del">
                  <a
                    href="#"
                    onClick={this.handleDelete}
                    className="btn btn-outline-danger btn-lg"
                  >
                    Delete
                  </a>
                </div>
                <div className="btn-edit-del">
                  <Link
                    to={`/products/${id}/edit`}
                    className="btn btn-outline-purple btn-lg"
                  >
                    Edit
                  </Link>
                </div>
              </Fragment>
            ) : null}
          </div>
          <Routes>
            {this.isOwner(currentUser, product) ? (
              <Route
                path="/edit"
                element={
                  <EditProductForm
                    onEdit={this.editingProduct}
                    onUpdate={this.setUpdated}
                  />
                }
              />
            ) : null}
          </Routes>
        </div>
        <hr />
        {!this.state.editing ? (
          <CommentList
            comments={this.state.comments}
            onCommentSubmit={this.handleCommentSubmit}
            serverErrors={this.state.serverErrors}
            saved={this.state.saved}
            onResetSaved={this.resetSaved}
          />
        ) : null}
      </div>
    );
  }
}

ProductDetail.propTypes = {
  currentUser: PropTypes.object,
};

export default (props) => (
  <ProductDetail {...props} params={useParams()} history={useNavigate()} />
);
