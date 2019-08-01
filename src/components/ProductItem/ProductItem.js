import React from "react";
import { Link } from "react-router-dom";

class ProductItem extends React.Component {
  onDelete = id => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      this.props.onDelete(id);
    }
  };

  render() {
    var { product, index } = this.props;
    var statusName = product.status ? "Còn hàng" : "Hết hàng";
    var statusClass = product.status ? "warning" : "danger";
    return (
      <tr>
        <th>{index + 1}</th>
        <td>{product.in}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <span className={`badge badge-${statusClass}`}>{statusName}</span>
        </td>
        <td>
          <Link to={`/product/${product.id}/edit`} className="btn btn-success">
            Sửa
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.onDelete(product.id)}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default ProductItem;
