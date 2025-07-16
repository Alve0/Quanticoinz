import React, { useContext, useEffect, useState, useRef } from "react";
import useAxiosSecure from "../../Provider/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Notifications = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !user?.email) return;

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/notifications/${user.email}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        toast.error("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [isOpen, user, axiosSecure]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-16 right-4 z-50 notification-popup"
      ref={popupRef}
    >
      <div className="bg-base-100 shadow-lg rounded-lg p-4 w-80 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-bold mb-2">Notifications</h3>
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification, idx) => (
              <li
                key={idx}
                className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
              >
                <a href={notification.actionRoute}>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.time).toLocaleString()}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
