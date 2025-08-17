import React from "react";
import Banner from "../Banner";

import Spacillity from "../Spacillity";

import VibeCode from "../VibeCode";
import TestimonialSection from "../TestimonialSection";
import HowItWorks from "../HowItWorks";
import BestWorkers from "../BestWorkers";
import Loading from "../../Loading/Loading";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ToastContainer />
      <Banner />
      <Spacillity />
      <BestWorkers />
      <VibeCode />
      <TestimonialSection />
      <HowItWorks />
    </div>
  );
}

export default Home;
