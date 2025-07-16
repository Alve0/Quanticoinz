import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

const ApprovedSubmissions = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Number of submissions per page

  useEffect(() => {
    const fetchApprovedSubmissions = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/submissions/approved/${user.email}?page=${currentPage}&limit=${limit}`
        );
        setSubmissions(res.data.submissions);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch approved submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchApprovedSubmissions();
    }
  }, [user, axiosSecure, currentPage, limit]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
    <div className="max-w-6xl mx-auto p-4">
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
                  <span className="badge badge-success">
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((_, index) => (
              <button
                key={index + 1}
                className={`join-item btn ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedSubmissions;
