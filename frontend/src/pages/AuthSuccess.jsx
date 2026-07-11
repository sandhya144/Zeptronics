// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'
// import { setUser } from '../redux/userslice'

// const AuthSuccess = () => {
//     // const {setUser} = getData()
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     useEffect (() =>{
//         const handleAuth = async()=> {
//             const params = new URLSearchParams(window.location.search)
//             console.log(params);

//             const accessToken = params.get("token")
//             console.log("Token",accessToken)

//             if(accessToken){
//                 localStorage.setItem("accessToken", accessToken)
//                 try{
//                     const res = await axios.get("http://localhost:8000/auth/me",{
//                     headers:{
//                         Authorization: `Bearer ${accessToken} `
//                       }
//                     })
//                   if (res.data.success) {
//                   dispatch(setUser({ user: res.data.user, accessToken }))
//                    navigate("/")
//                   } else {
//                     navigate("/login")
//                   }

//                     console.log(res.data);
//                     navigate("/")

//                 } catch(error){
//                     console.log("Error fetching user:", error)
//                 }
//             }
//         }
//         handleAuth()
//     },[navigate])
    
//   return (
//     <h2>
//       Logging in...
//     </h2>
//   )
// }

// export default AuthSuccess;


import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userslice'

const AuthSuccess = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            const accessToken = params.get("token")

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const res = await axios.get("http://localhost:8000/auth/me", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    if (res.data.success) {
                        dispatch(setUser({ user: res.data.user, accessToken }))
                        navigate("/")
                    } else {
                        navigate("/login")
                    }
                } catch (error) {
                    console.log("Error fetching user:", error)
                    navigate("/login")
                }
            } else {
                navigate("/login")
            }
        }
        handleAuth()
    }, [navigate, dispatch])

    return <h2>Logging in...</h2>
}

export default AuthSuccess
