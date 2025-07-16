import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

const ApprovedSubmissions = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedSubmissions = async () => {
      try {
        const res = await axiosSecure.get(
          `/submissions/approved/${user.email}`
        );
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch approved submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchApprovedSubmissions();
    }
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <p className="text-center p-4 text-gray-500">
        No approved submissions yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th>Task Title</th>
            <th>Payable Amount</th>
            <th>Buyer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td>{submission.task_title}</td>
              <td>{submission.payable_amount} Coins</td>
              <td>{submission.buyer_name}</td>
              <td>
                <span className="badge badge-success">{submission.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedSubmissions;
