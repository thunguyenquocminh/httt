import React, { useState } from "react";
import axios from "axios";
import {  NavLink } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const saveUser= async(e) =>
  {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users",{
        name: name,
        email:email,
        password:password,
        confPassword:confPassword,
        role:role
      });
      window.alert("Đăng ký thành công !");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
      
    }
  }
  return (
    <div>
         <section className="hero is-fullheight is-fullwidth" >
        <div className="hero-body has-background-light">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={saveUser} className="box">
                <h1 className="title is-3">Đăng Ký</h1>
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
                   <button  onClick={()=> setRole('user')} type="submit" className="button is-danger ">Đăng ký</button>
                  </div>
                  <NavLink to={"/"}>
               Đã có tài khoản? Đăng nhập.
            </NavLink>
                </form>
                </div>
            </div>
        </div>
        </div>
        </section>
    </div>
  )
}

export default SignUp;