import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import userlogo from '../../assets/user.jpg'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { setUser } from '@/redux/userslice';



const UserInfo = () => {
  const navigate = useNavigate();

  const [updateUser, setUpdateUser] = useState(null);
  const [file, setfile] = useState(null);
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id // user ki id open hogi us id ke base pe hm user ka data nikal sakte hai 


  const handleChange = (e) =>{
    setUpdateUser({...updateUser,[e.target.name]:e.target.value})
  }

  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      setfile(selectedFile)
      setUpdateUser({...updateUser, profilePic:URL.createObjectURL(selectedFile)}) // preview only
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.put(
      `${import.meta.env.VITE_URL}/api/v1/user/update/${userId}`,
      updateUser,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("Profile updated successfully");
      dispatch(setUser(res.data.user)) // Updates THIS PAGE
      setUpdateUser(res.data.user);   //  Updates GLOBAL REDUX STATE
    }
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

  const getUserDetails = async ()=>{
     if (!userId) {
    console.log("User ID is missing");
    return;
  }

    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/get-user/${userId}`)
      if(res.data.success){
        setUpdateUser(res.data.user)
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile")
    }
  }

  useEffect(()=>{
    getUserDetails();
  },[])

  return (
    
     <div className='pt-5 min-h-screen bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
          <div className='flex justify-between gap-10'>
            <Button className='bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4]' onClick ={() => navigate(-1)}> <ArrowLeft /> </Button>
            <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>
          </div>
       
           {/* <div className="w-full max-w-2xl flex flex-col items-center gap-8"> */}
            <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser?.profilePic || userlogo}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#0EA5B4]"
                  />

                  <Label className=" mt-5 cursor-pointer w-fit whitespace-nowrap rounded-lg bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] px-4 py-2 text-white">
                    Change Picture
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>

                <form className="w-full bg-white rounded-lg shadow-lg p-5 space-y-4"
                onSubmit={handleSubmit}
                >

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        name="firstName"
                        placeholder="Sienna"
                         value={updateUser?.firstName || ""}
                         onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="block text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        name="lastName"
                        placeholder="Mae"
                         value={updateUser?.lastName || ""}
                         onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      type="email"
                      disabled
                      // value="sienna@gmail.com"
                       value={updateUser?.email || ""}
                      className="mt-1 bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      name="phoneNo"
                      placeholder="Enter your contact number"
                       value={updateUser?.phoneNo || ""}
                       onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Address
                    </Label>
                    <Input
                      name="address"
                      placeholder="Enter your address"
                       value={updateUser?.address|| ""}
                       onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                    <div>
                    <Label className="block text-sm font-medium">
                      City
                    </Label>
                    <Input
                      name="city"
                      placeholder="Enter your city"
                       value={updateUser?.city || ""}
                       onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Zip Code
                    </Label>
                    <Input
                      name="zipCode"
                      placeholder="Enter your zip code"
                       value={updateUser?.zipCode|| ""}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                 </div>

                 <div className='flex gap-3 items-center'>
                  <Label className='block text-sm font-medium'>Role:</Label>
                  <RadioGroup 
                   value={updateUser?.role || ""}
                   onValueChange={(value)=>setUpdateUser((prev) => ({
                                ...prev,
                                role: value,
                              }))
                            }
                   className='flex items-center'
                   >
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value="user" id="user"/>
                        <Label htmlFor="user">User</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value="admin" id="admin"/>
                        <Label htmlFor="admin">Admin</Label>
                    </div>
                  </RadioGroup>
                 </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] hover: bg-[#0EA5B4] cursor-pointer"
                  >
                    Update Profile
                  </Button>
                </form>
              </div>

        </div>
      </div>
    </div>

    
  )
}



export default UserInfo;