
import React, { useDeferredValue, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import userlogo from "../assets/user1.jpg"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userslice";





const Profile = () => {
  
  const {user} = useSelector(store=>store.user)
  const params = useParams();
  const userId = params.userId

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName, // optional chaining so that code won't break here
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role
  })

  const [file, setfile] = useState(null)

  const dispatch = useDispatch()

  const handleChange = (e) =>{
    setUpdateUser({...updateUser,[e.target.name]:e.target.value})
  }

  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      setfile(selectedFile)
      setUpdateUser({...updateUser, profilePic:URL.createObjectURL(selectedFile)}) // preview only
  }
 
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const accessToken = localStorage.getItem("accessToken")

    try{
      // use form data for text + files
      const formData = new FormData()
      formData.append("firstName",updateUser.firstName)
      formData.append("lastName", updateUser.lastName)
      formData.append("email",updateUser.email)
      formData.append("phoneNo",updateUser.phoneNo)
      formData.append("address",updateUser.address)
      formData.append("city",updateUser.city)
      formData.append("zipCode",updateUser.zipCode)
      formData.append("role",updateUser.role)

      if(file){
        formData.append("file",file)  // image file for backend multer
      }
      
      const res = await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`,formData,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type":"multipart/form-data"
        }
      })

      if(res.data.success){
          toast.success(res.data.message)
          dispatch(setUser({      // setuser--> updateduser store me jake set ho jayega 
            user: res.data.user,
            accessToken: localStorage.getItem("accessToken"), 
          })
         ) 
        }

    } catch(error){
      console.log(error);
      toast.error("Failed to update profile")
    }

  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-7 text-gray-800">
                Update Profile
              </h1>

              <div className="w-full max-w-2xl flex flex-col items-center gap-6">
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser?.profilePic || userlogo}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#0EA5B4]"
                  />

                  <Label className="mt-4 cursor-pointer rounded-lg bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] px-4 py-2 text-white hover:bg-pink-700">
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
                         value={updateUser.firstName || ""}
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
                         value={updateUser.lastName || ""}
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
                       value={updateUser.email || ""}
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
                       value={updateUser.phoneNo || ""}
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
                       value={updateUser.address|| ""}
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
                       value={updateUser.city || ""}
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
                       value={updateUser.zipCode|| ""}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                 </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] hover:grayscale-50"
                  >
                    Update Profile
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold">My Orders</h2>
              <p className="text-gray-500 mt-2">
                No orders found.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;