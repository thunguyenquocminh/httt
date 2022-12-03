import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Userlist = () => {
  const [users, setUsers]= useState([]);

  useEffect(()=>{
    getUsers();
  },[])
  const getUsers= async () =>{
    const response= await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  }
  const deleteUsers = async (usersId) => {
    await axios.delete(`http://localhost:5000/users/${usersId}`);
    getUsers();
  };

  return (
    <div>
      {" "}
      <h1 className='title'> Quản lý người dùng </h1>
      <h2 className="subtitle"> Danh sách người dùng</h2>
      <Link to="/users/add" className="button is-primary mb-2">Thêm người dùng</Link>
    <table className="table is-striped is-fullwidth">
        <thead>
            <tr>
                <th>No</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Tùy chỉnh</th>
            </tr>
        </thead>
        <tbody>
          {users.map((user, index)=>(
            <tr key={user.uuid}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUsers(user.uuid)}
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
  );
};

export default Userlist;
