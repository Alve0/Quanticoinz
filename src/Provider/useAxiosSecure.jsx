import axios from "axios";
import React, { use } from "react";

import {
  UNSAFE_createClientRoutesWithHMRRevalidationOptOut,
  useNavigate,
} from "react-router";
import { AuthContext } from "./AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_uri,
});

const useAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOut()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
