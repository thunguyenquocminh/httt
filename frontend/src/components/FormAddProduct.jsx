import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const saveProduct= async(e) =>
  {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/product",{
        name: name,
        price:price,
        stock:stock
      });
      navigate("/product");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
      
    }
  }
  return (
    <div>
      <h1 className="title"> Quản lý sản phẩm </h1>
      <h2 className="subtitle"> Thêm sản phẩm</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content"></div>
          <form onSubmit={saveProduct}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <lable className="label">Tên sản phẩm </lable>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Tên sản phẩm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <lable className="label">Giá</lable>
              <div className="control">
                <input type="text" value={price}
                  onChange={(e)=>setPrice(e.target.value)}className="input" placeholder="Giá" />
              </div>
            </div>
            <div className="field">
              <lable className="label">Số lượng</lable>
              <div className="control">
                <input type="text"  value={stock}
                  onChange={(e)=>setStock(e.target.value)} className="input" placeholder="Số lượng" />
              </div>
            </div>

            <div className="field ">
              <button type="submit" className="button is-succcess ">Lưu thông tin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
