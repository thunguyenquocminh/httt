import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">Tổng quan</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>
              <IoPricetag /> Cửa hàng
            </NavLink>
          </li>
        </ul>
        {user && user.user.role === "admin" && (
          <div>
            <p className="menu-label">Cán bộ</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Người dùng
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Tùy chọn</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Đăng xuất
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
