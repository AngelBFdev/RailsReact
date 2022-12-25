import axios from "axios";
import React from "react";
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.params;

    axios
      .get(`/api/v1/products/${id}.json`)
      .then((response) => {
        this.setState({ product: response.data.product });
      })
      .catch((error) => console.log(error));
  }

  isOwner = (user, product) => {
    if (Object.keys(product).length > 0) {
      return user && user.id === product.user_id;
    }
    return false;
  };

  render() {
    const {id} =this.props.params
    const { product } = this.state;
    const {currentUser} = this.props


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

            {this.isOwner(currentUser, product) ? (
              <>
                <div className="float-right btn-edit-del">
                  <a href="#" className="btn btn-outline-danger btn-lg">
                    Delete
                  </a>
                </div>
                <div className="btn-edit-del">
                  <Link
                    to={`/product/${id}/edit`}
                    className="btn btn-outline-purple btn-lg"
                  >
                    Edit
                  </Link>
                  <a href="#" className="btn btn-outline-purple btn-lg">
                    Edit
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  currentUser: PropTypes.object,
};
export default (props) => <ProductDetail {...props} params={useParams()} />;
