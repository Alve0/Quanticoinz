import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Provider/useAxiosSecure";

const BestWorkers = () => {
  const axiosSecure = useAxiosSecure();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        const res = await axiosSecure.get("/users/top-workers");
        // Filter by role === "worker"
        const topWorkers = res.data
          .filter((user) => user.role === "worker")
          .sort((a, b) => b.coin - a.coin)
          .slice(0, 6);

        setWorkers(topWorkers);
      } catch (err) {
        console.error("Error fetching top workers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopWorkers();
  }, [axiosSecure]);

  if (loading) return <p className="text-center">Loading top workers...</p>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">🏆 Best Workers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workers.map((worker, index) => (
          <div
            key={index}
            className="card shadow-md p-4 bg-base-100 rounded-xl flex items-center gap-4"
          >
            <img
              src={worker.photoURL || "/default-avatar.png"}
              alt={worker.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{worker.name}</h3>
              <p className="text-sm text-gray-500">{worker.email}</p>
              <p className="text-primary font-bold mt-1">
                Coins: {worker.coin}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
