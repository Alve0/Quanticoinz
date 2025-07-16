import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

const WorkerStats = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    totalEarning: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get(`/worker-stats/${user.email}`);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching worker stats:", err);
      }
    };
    if (user?.email) fetchStats();
  }, [user, axiosSecure]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="bg-blue-100 p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-bold">Total Submissions</h2>
        <p className="text-3xl text-blue-600">{stats.totalSubmissions}</p>
      </div>
      <div className="bg-yellow-100 p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-bold">Pending Submissions</h2>
        <p className="text-3xl text-yellow-600">{stats.pendingSubmissions}</p>
      </div>
      <div className="bg-green-100 p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-bold">Total Earnings</h2>
        <p className="text-3xl text-green-600">{stats.totalEarning} Coins</p>
      </div>
    </div>
  );
};

export default WorkerStats;
