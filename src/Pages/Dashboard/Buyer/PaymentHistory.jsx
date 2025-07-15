import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { PiCoinsFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch user data for coin display
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`);
      return res.data;
    },
  });

  // Fetch payment history
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/purchases/user/${user.email}`);
      return res.data;
    },
  });

  // Redirect if not logged in
  if (!user) {
    toast.error("Please log in to view payment history.", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/log-reg/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            Payment History
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

        {paymentsLoading ? (
          <div className="text-center text-gray-600">
            Loading payment history...
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center text-gray-600">No purchases found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-4 py-2 text-left text-indigo-700 font-semibold">
                    Purchase ID
                  </th>
                  <th className="px-4 py-2 text-left text-indigo-700 font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-indigo-700 font-semibold">
                    Coins Purchased
                  </th>
                  <th className="px-4 py-2 text-left text-indigo-700 font-semibold">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b border-gray-200 hover:bg-indigo-50"
                  >
                    <td className="px-4 py-2 text-gray-800">{payment._id}</td>
                    <td className="px-4 py-2 text-gray-800">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-gray-800">{payment.coins}</td>
                    <td className="px-4 py-2 text-gray-800">
                      ${payment.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;
