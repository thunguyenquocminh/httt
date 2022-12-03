import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts]= useState([]);

  useEffect(()=>{
    getProducts();
  },[])
  const getProducts= async () =>{
    const response= await axios.get('http://localhost:5000/product');
    setProducts(response.data);
  }
  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/product/${productId}`);
    getProducts();
  };

  return (
    <div><h1 className='="title'> Quản lý sản phẩm </h1>
    <h2 className="subtitle"> Danh sách sản phẩm</h2>
    <Link to="/product/add" className="button is-primary mb-2">Thêm sản phẩm</Link>
  <table className="table is-striped is-fullwidth">
      <thead>
          <tr>
              <th>No</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th> Tạo bởi</th>
              <th>Hoạt động</th>
          </tr>
      </thead>
      <tbody>
      {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.user.name}</td>
              <td>
                <Link
                  to={`/product/edit/${product.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
  </table>
</div>
  )
}

export default ProductList