import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PiCoinsFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

const coinOptions = [
  { coins: 10, price: 1, description: "Starter Pack" },
  { coins: 150, price: 10, description: "Value Pack" },
  { coins: 500, price: 20, description: "Pro Pack" },
  { coins: 1000, price: 35, description: "Premium Pack" },
];

function PurchaseCoin() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);

  // Fetch user data for coin display
  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`);
      return res.data;
    },
  });

  // Handle coin purchase
  const handlePurchase = async (option) => {
    if (!user) {
      toast.error("Please log in to purchase coins.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/log-reg/login");
      return;
    }

    setIsLoadingPurchase(true);
    try {
      await axiosSecure.post("/purchases", {
        coins: option.coins,
        price: option.price,
        user_email: user.email,
      });
      toast.success(`${option.coins} coins added successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
      await refetchUser();
      navigate("/Dashboard/mytask");
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to purchase coins. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsLoadingPurchase(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            Purchase Coins
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-700">
              Available Coins
            </h3>
            <div className="flex items-center">
              <PiCoinsFill size={20} className="text-indigo-600" />
              <h3 className="font-bold ml-1 text-indigo-600">
                {userLoading ? "Loading..." : userData?.coin || "0"}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coinOptions.map((option, index) => (
            <div
              key={index}
              className="bg-indigo-50 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePurchase(option)}
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                {option.coins} Coins
              </h3>
              <p className="text-2xl font-semibold text-gray-800 mb-2">
                ${option.price}
              </p>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <button
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isLoadingPurchase}
              >
                {isLoadingPurchase ? "Processing..." : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PurchaseCoin;
