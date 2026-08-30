
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'

const MyOrders = () => {
    
    const [userOrder, setUserOrder] = useState(null)
    const getUserOrders = async () =>{
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/myorder`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    if(res.data.success){
        setUserOrder(res.data.orders)
    }
}

useEffect(() => {
    getUserOrders()
}, [])


  return (
    <>
    <OrderCard userOrder={userOrder}/>
    </>
  )
}

export default MyOrders
