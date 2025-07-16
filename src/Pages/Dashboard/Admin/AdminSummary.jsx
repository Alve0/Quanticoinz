import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

const AdminSummary = () => {
  const axiosSecure = useAxiosSecure();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosSecure.get("/admin/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Error loading summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [axiosSecure]);

  if (loading) return <p className="text-center">Loading summary...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
      {/* Workers */}
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h3 className="text-xl font-bold">👷 Workers</h3>
        <p className="text-3xl text-blue-600">{summary.totalWorkers}</p>
      </div>

      {/* Buyers */}
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h3 className="text-xl font-bold">🛒 Buyers</h3>
        <p className="text-3xl text-green-600">{summary.totalBuyers}</p>
      </div>

      {/* Total Coins */}
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h3 className="text-xl font-bold">🪙 Total Coins</h3>
        <p className="text-3xl text-yellow-500">{summary.totalCoins}</p>
      </div>

      {/* Total Payments */}
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h3 className="text-xl font-bold">💵 Payments (Purchases)</h3>
        <p className="text-3xl text-purple-600">
          ${summary.totalPurchaseAmount.toFixed(2)}
        </p>
      </div>

      {/* Total Withdrawn */}
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h3 className="text-xl font-bold">💸 Withdrawn</h3>
        <p className="text-3xl text-red-600">
          ${summary.totalWithdrawnAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default AdminSummary;
