import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import { FaListUl, FaUsers, FaCoins } from "react-icons/fa";
import Loading from "../../Loading/Loading";

const BuyerStats = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["buyerStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyers/stats/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">Error loading buyer stats.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 my-6">
      <div className="card bg-base-100 shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaListUl className="text-4xl text-primary" />
          <div>
            <p className="text-xl font-bold">{data.totalTasks}</p>
            <p className="text-sm text-gray-500">Total Tasks Posted</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaUsers className="text-4xl text-warning" />
          <div>
            <p className="text-xl font-bold">{data.pendingWorkers}</p>
            <p className="text-sm text-gray-500">Pending Workers Needed</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaCoins className="text-4xl text-success" />
          <div>
            <p className="text-xl font-bold">{data.totalPaid} Coins</p>
            <p className="text-sm text-gray-500">Total Payment Spent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerStats;
