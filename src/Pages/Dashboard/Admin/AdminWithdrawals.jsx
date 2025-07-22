import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const AdminWithdrawals = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch pending withdrawal requests
  useEffect(() => {
    const fetchWithdrawals = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get("/admin/withdrawals/pending");
        setWithdrawals(res.data);
      } catch (err) {
        console.error("Error fetching withdrawals:", err);
        setError("Failed to fetch withdrawal requests");
        toast.error("Failed to fetch withdrawal requests");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWithdrawals();
  }, [axiosSecure]);

  // Handle payment success
  const handlePaymentSuccess = async (withdrawalId) => {
    try {
      await axiosSecure.patch(`/admin/withdrawals/approve/${withdrawalId}`);
      toast.success("Withdrawal approved successfully");
      setWithdrawals((prev) =>
        prev.filter((withdrawal) => withdrawal._id !== withdrawalId)
      );
    } catch (err) {
      console.error("Error approving withdrawal:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to approve withdrawal";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 shadow rounded-lg bg-base-100">
      <h2 className="text-2xl font-bold mb-4">Pending Withdrawal Requests</h2>
      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : withdrawals.length === 0 ? (
        <p>No pending withdrawal requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Email</th>
                <th>Coins</th>
                <th>Amount ($)</th>
                <th>Payment System</th>
                <th>Account Number</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id}>
                  <td>{withdrawal.worker_name}</td>
                  <td>{withdrawal.worker_email}</td>
                  <td>{withdrawal.withdrawal_coin}</td>
                  <td>{withdrawal.withdrawal_amount.toFixed(2)}</td>
                  <td>{withdrawal.payment_system}</td>
                  <td>{withdrawal.account_number}</td>
                  <td>
                    {new Date(withdrawal.withdraw_date).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handlePaymentSuccess(withdrawal._id)}
                    >
                      Payment Success
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminWithdrawals;
