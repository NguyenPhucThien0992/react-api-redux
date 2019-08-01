import React from "react";
import callApi from "./../../utils/apiCaller";
import { Link } from "react-router-dom";
import {
  actAddProductRequest,
  actGetProductRequest,
  actUpdateProductRequest
} from "./../../actions/index";
import { connect } from "react-redux";
class ProductActionPage extends React.Component {
  // tao state luu tru gia tri form
  // name cho input
  // quan tam value
  // quan tam onchange
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      txtName: "",
      txtPrice: "",
      chkbStatus: ""
    };
  }
  componentDidMount() {
    var { match } = this.props;

    if (match) {
      var id = match.params.id;
      this.props.onEditProduct(id);
      // callApi(`products/${id}`, "GET", null).then(res => {
      //   var data = res.data;
      //   this.setState({
      //     id: data.id,
      //     txtName: data.name,
      //     txtPrice: data.price,
      //     chkbStatus: data.status
      //   });
      // });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditting) {
      var { itemEditting } = nextProps;
      this.setState({
        id: itemEditting.id,
        txtName: itemEditting.name,
        txtPrice: itemEditting.price,
        chkbStatus: itemEditting.status
      });
    }
  }
  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };
  onSave = e => {
    var { history } = this.props;
    e.preventDefault();
    var { id, txtName, txtPrice, chkbStatus } = this.state;
    var data = { id: id, name: txtName, price: txtPrice, status: chkbStatus };
    if (id) {
      this.props.onUpdateProduct(data);

      // callApi(`products/${id}`, "PUT", data).then(res => {
      //   history.goBack();
      // });
    } else {
      this.props.onAddProduct(data);

      // callApi("products", "POST", data).then(res => {
      //   history.goBack();
      //   // history.push("/");
      // });
    }
    history.goBack();
  };
  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Tên Sản Phẩm:</label>
            <input
              type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Giá: </label>
            <input
              type="number"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="defaultCheck1"
              name="chkbStatus"
              value={chkbStatus}
              onChange={this.onChange}
              checked={chkbStatus}
            />
            <label className="form-check-label" for="defaultCheck1">
              Còn Hàng
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Lưu Lại
          </button>
          <Link to="/product-list" className="btn btn-danger">
            Trở lại
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    itemEditting: state.itemEditting
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct: product => {
      dispatch(actAddProductRequest(product));
    },
    onEditProduct: id => {
      dispatch(actGetProductRequest(id));
    },
    onUpdateProduct: product => {
      dispatch(actUpdateProductRequest(product));
    }
  };
};
export default connect(
  mapStateToProp,
  mapDispatchToProps
)(ProductActionPage);
