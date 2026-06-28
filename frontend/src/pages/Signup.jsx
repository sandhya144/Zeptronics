import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import google from "../assets/google.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast  from "sonner";
import { toast } from "sonner";

const signup = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // to store data in database
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
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
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter given details below to create your account
          </CardDescription>

          {/* <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first name">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="first name">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="me@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  type={showpassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                {showpassword ? (
                  <EyeOff
                    onClick={() => setshowpassword(false)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 "
                  />
                ) : (
                  <Eye
                    onClick={() => setshowpassword(true)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 "
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={submitHandler}
            type="submit"
            className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please Wait{" "}
              </>
            ) : (
              "Signup"
            )}
          </Button>

          <Button
            onClick={() =>
              window.open("http://localhost:8000/auth/google", "_self")
            }
            variant="outline"
            className="w-full"
          >
            <img src={google} alt="" className="w-10" />
            Login with Google
          </Button>

          <Button
            variant="ghost"
            className="w-full border-none shadow-none bg-transparent hover:bg-transparent"
          >
            <p className="text-gray-700 text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="hover:underline cursor-pointer text-pink-400"
              >
                Login
              </Link>
            </p>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default signup;
