const Modal = ({ submission, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h3 className="text-lg font-bold mb-2">Submission Details</h3>
      <p>{submission.submission_details}</p>
      <button className="btn mt-4 btn-neutral" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);
export default Modal;
