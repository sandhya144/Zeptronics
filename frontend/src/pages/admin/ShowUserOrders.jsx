import React, { useEffect, useState } from 'react'
import OrderCard from '../OrderCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ShowUserOrders = () => {
  const params = useParams()
  const [userOrder, setUserOrder] = useState(null)

  const getUserOrders = async()=>{
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/user-order/${params.userId}`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    if(res.data.success){
      setUserOrder(res.data.orders)
    }
  }

useEffect(()=>{
  getUserOrders()
},[])

  return (
    <>
      <div className='pl-87.5 py-20'>
          <OrderCard userOrder={userOrder} />
      </div>
      
    </>
  )
}

export default ShowUserOrders
