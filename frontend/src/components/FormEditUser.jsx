import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect } from "react";
const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const {id} =useParams();
  useEffect(()=>{
  const getUserById= async()=>{
    try {
      const response= await axios.get(`http://localhost:5000/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setConfPassword(response.data.confPassword);
      setRole(response.date.role);
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
      
    }
  }
  getUserById();
  },[id]);
  
  const updateUser= async(e) =>
  {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`,{
        name: name,
        email:email,
        password:password,
        confPassword:confPassword,
        role:role
      });
      navigate("/users");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
      
    }
  }
  return (
    <div>
         <h1 className='title'>  Quản lý người dùng </h1>
        <h2 className='subtitle'> Chỉnh sửa người dùng</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateUser}>
                  <p className="has-text-centered">{msg}</p>
                <div className="field">
                    <lable className="label">Họ và tên </lable>
                    <div className="control">
                      <input
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className="input"
                        placeholder="Họ và tên"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <lable className="label">Email/ Tên đăng nhập</lable>
                    <div className="control">
                      <input
                        type="text"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className="input"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <lable className="label">Mật khẩu</lable>
                    <div className="control">
                      <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="input"
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <lable className="label">Nhập lại mật khẩu</lable>
                    <div className="control">
                      <input
                        type="password"
                        value={confPassword}
                        onChange={(e)=> setConfPassword(e.target.value)}
                        className="input"
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <lable className="label">Vai trò</lable>
                    <div className="control">
                     <div className="select is-fullwidth">
                        <select value={role}
                        onChange={(e)=> setRole(e.target.value)}>
                            <option >Chọn một vai trò</option>
                            <option value="admin">Cán bộ</option>
                            <option value="user">Người dùng</option>
                        </select>
                     </div>
                    </div>
                  </div>
                  <div className="field">
                   <button type="submit" className="button is-succcess ">Lưu thông tin</button>
                  </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditUser