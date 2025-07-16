import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import { toast } from "react-toastify";
import Modal from "./ReviewModal";

const TaskReview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch pending submissions by buyer
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["reviewTasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/review/${user?.email}`);
      return res.data;
    },
    enabled: !!user,
  });

  // Approve Mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/submissions/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Task approved");
      queryClient.invalidateQueries(["reviewTasks"]);
    },
  });

  // Reject Mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/submissions/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.warning("Task rejected");
      queryClient.invalidateQueries(["reviewTasks"]);
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Submissions to Review</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : submissions.length === 0 ? (
        <p>No pending submissions.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Task Title</th>
                <th>Amount</th>
                <th>Submission</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.worker_name}</td>
                  <td>{sub.task_title}</td>
                  <td>{sub.payable_amount} 🪙</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => setSelectedSubmission(sub)}
                    >
                      View Submission
                    </button>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => approveMutation.mutate(sub._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => rejectMutation.mutate(sub._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedSubmission && (
        <Modal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default TaskReview;
