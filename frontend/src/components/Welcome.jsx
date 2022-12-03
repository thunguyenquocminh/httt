import React from 'react'
import { useSelector } from 'react-redux'
const Welcome = () => {
  const {user}= useSelector((state)=> state.auth);

  return (
    <div>
        <h1 className='title'>  Cửa hàng của tôi </h1>
        <h2 className='subtitle'> Chào mừng  <strong>{user && user.user.name}</strong> đã trở lại</h2>
    </div>
  )
}

export default Welcome