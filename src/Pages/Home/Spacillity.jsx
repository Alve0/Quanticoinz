import React from "react";
import { Link } from "react-router";
import {
  HiOutlineRocketLaunch,
  HiOutlineComputerDesktop,
} from "react-icons/hi2";
import {
  HiOutlineCode,
  HiOutlineDatabase,
  HiOutlineServer,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import ListCards from "../../Share/ListCards";

const specialties = [
  {
    name: "Programming & Tech",
    icon: <HiOutlineComputerDesktop />,
    path: "/programming",
  },
  {
    name: "Web Development",
    icon: <HiOutlineCode />,
    path: "/web-development",
  },
  { name: "Data Science", icon: <HiOutlineDatabase />, path: "/data-science" },
  {
    name: "Cloud Computing",
    icon: <HiOutlineServer />,
    path: "/cloud-computing",
  },
  { name: "DevOps", icon: <HiOutlineCog />, path: "/devops" },
  {
    name: "Data Analytics",
    icon: <HiOutlineChartBar />,
    path: "/data-analytics",
  },
  { name: "Web Design", icon: <HiOutlineGlobeAlt />, path: "/web-design" },
  {
    name: "Cybersecurity",
    icon: <HiOutlineShieldCheck />,
    path: "/cybersecurity",
  },
  {
    name: "AI Development",
    icon: <HiOutlineRocketLaunch />,
    path: "/ai-development",
  },
];

function Specialty() {
  return (
    <div className=" p-4">
      <div className="flex flex-row flex-wrap gap-5 w-full max-w-8xl mx-auto justify-center">
        {specialties.map((specialty, index) => (
          <ListCards key={index} icons={specialty.icon} name={specialty.name} />
        ))}
      </div>
    </div>
  );
}

export default Specialty;
