
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import google from "../assets/google.png";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";


// const Login = () => {

//    const [showpassword, setshowpassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // to store data in database
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       setLoading(true);

//       console.log(formData);
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/user/login`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );
//       if (res.data.success) {
//         navigate('/');
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//    <div className="flex justify-center items-center min-h-screen bg-pink-100">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>Login your account</CardTitle>
//           <CardDescription>
//             Enter given details below to login your account
//           </CardDescription>

//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-4">

//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="me@example.com"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   type={showpassword ? "text" : "password"}
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 {showpassword ? (
//                   <EyeOff
//                     onClick={() => setshowpassword(false)}
//                     className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 "
//                   />
//                 ) : (
//                   <Eye
//                     onClick={() => setshowpassword(true)}
//                     className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 "
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           <Button
//             onClick={submitHandler}
//             type="submit"
//             className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please Wait{" "}
//               </>
//             ) : (
//               "Login"
//             )}
//           </Button>

//           <Button
//             onClick={() =>
//               window.open("http://localhost:8000/auth/google", "_self")
//             }
//             variant="outline"
//             className="w-full"
//           >
//             <img src={google} alt="" className="w-10" />
//             Login with Google
//           </Button>

//           <Button
//             variant="ghost"
//             className="w-full border-none shadow-none bg-transparent hover:bg-transparent"
//           >
//             <p className="text-gray-700 text-sm">
//               Don't have an account?{" "}
//               <Link
//                 to={"/signup"}
//                 className="hover:underline cursor-pointer text-pink-400"
//               >
//                 Signup
//               </Link>
//             </p>
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default Login


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userslice";

const Login = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check what the backend returns
      console.log(res.data);


      if (res.data.success) {
        // Store logged-in user in Redux

        dispatch(setUser({
    user: res.data.user,
    accessToken: res.data.accessToken,
  })
);
        // console.log("Redux User:", res.data.user);
      
      localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);

        navigate("/");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login your account</CardTitle>
          <CardDescription>
            Enter your details below to login to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="me@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {showpassword ? (
                  <EyeOff
                    onClick={() => setshowpassword(false)}
                    className="absolute right-5 bottom-2 w-5 h-5 cursor-pointer text-gray-700"
                  />
                ) : (
                  <Eye
                    onClick={() => setshowpassword(true)}
                    className="absolute right-5 bottom-2 w-5 h-5 cursor-pointer text-gray-700"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={submitHandler}
            className="w-full bg-pink-600 hover:bg-pink-500 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please Wait
              </>
            ) : (
              "Login"
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              window.open("http://localhost:8000/auth/google", "_self")
            }
          >
            <img src={google} alt="Google" className="w-10" />
            Login with Google
          </Button>

          <Button
            variant="ghost"
            className="w-full border-none shadow-none bg-transparent hover:bg-transparent"
          >
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-pink-500 hover:underline"
              >
                Signup
              </Link>
            </p>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;