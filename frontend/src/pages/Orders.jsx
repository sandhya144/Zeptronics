
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

const Orders = () => {
  const [userOrder, setUserOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const userState = useSelector((store) => store?.user) || {};
  const user = userState.user;
  const accessToken = userState.accessToken;

  useEffect(() => {
    const getUserOrders = async () => {
      if (!user?._id || !accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/orders/user-order/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.data.success) {
          setUserOrder(res.data.orders);
        }
      } catch (error) {
        console.error("❌ Failed to fetch user orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserOrders();
  }, [user, accessToken]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="py-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Orders
      </h1>

      {!userOrder || userOrder.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven't placed any orders yet.
        </p>
      ) : (
        <OrderCard userOrder={userOrder} />
      )}
    </div>
  );
};

export default Orders;
