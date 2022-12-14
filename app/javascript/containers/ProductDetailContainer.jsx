import axios from 'axios'
import React from 'react'

class ProductDetail extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      product: {}
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id

    axios
      .get(`/api/v1/products/${id}.json`)
      .then(response => {
        console.log(response.date.product)
      })
      .catch(error => console.log(error))
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <img className="img-fluid" src="https://via.placeholder.com/350x150" width="100%"/>
          </div>

          <div className="col-md-10 offset-md-1">
            <div className="float-end">
              <h3><span className="badge badge-pill badge-purple">$99.99</span></h3>
            </div>
            <div>
              <h3>Name 1</h3>
            </div>

            <div className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>

            <div className="float-end btn-edit-del">
              <a href="#" className="btn btn-outline-danger btn-lg">Delete</a>
            </div>

            <div className="btn-edit-del">
              <a href="#" className="btn btn-outline-purple btn-lg">Edit</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail
