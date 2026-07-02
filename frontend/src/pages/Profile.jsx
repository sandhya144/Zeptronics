
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import userImage from "../assets/user.jpg";

const Profile = () => {
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
                    src={userImage}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-600"
                  />

                  <Label className="mt-4 cursor-pointer rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700">
                    Change Picture
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </Label>
                </div>

                <form className="w-full bg-white rounded-lg shadow-lg p-5 space-y-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        name="firstName"
                        placeholder="Sienna"
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
                      value="sienna@gmail.com"
                      className="mt-1 bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      name="phone"
                      placeholder="Enter your contact number"
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
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      City
                    </Label>
                    <Input
                      name="city"
                      placeholder="Enter your city"
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
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
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