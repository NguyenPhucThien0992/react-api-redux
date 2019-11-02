import React from "react";
import ProductList from "../../components/ProductList/ProductList";
import ProductItem from "../../components/ProductItem/ProductItem";
import { connect } from "react-redux";
// import callApi from "./../../utils/apiCaller";
import { Link } from "react-router-dom";
import {
  actFetchProductRequest,
  actDeleteProductRequest
} from "./../../actions/index";

class ProductListPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: []
  //   };
  // }

  findIndex = (products, id) => {
    var result = 1;
    products.forEach((product, index) => {
      if (product.id === id) {
        result = index;
      }
    });
    return result;
  };
  onDelete = id => {
    // var { products } = this.state;
    // callApi(`products/${id}`, "DELETE", null).then(res => {
    //   if (res.status === 200) {
    //     var index = this.findIndex(products, id);
    //     if (index !== -1) {
    //       products.splice(index, 1);
    //       this.setState({
    //         products: products
    //       });
    //     }
    //   }
    // });
    this.props.onDeleteProduct(id);
  };
  componentDidMount() {
    // sau khi render roi
    // callApi("products", "GET", null).then(res => {
    // this.setState({
    //   products: res.data
    // });
    // }
    this.props.fetchAllProducts();
  }

  showProducts = products => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
            index={index}
            onDelete={this.onDelete}
          />
        );
      });
    }
    return result;
  };
  render() {
    var { products } = this.props;
    //sau khi setState
    // var { products } = this.state;

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info">
          Thêm Sản Phẩm
        </Link>
        <ProductList>{this.showProducts(products)}</ProductList>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // lay tat ca product tu store
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductRequest()); // luu len store
    },
    onDeleteProduct: id => {
      dispatch(actDeleteProductRequest(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListPage);