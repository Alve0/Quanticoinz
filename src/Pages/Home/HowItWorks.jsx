import { FaUserPlus, FaTasks, FaWallet, FaRocket } from "react-icons/fa";
import TiltedCard from "../../Share/TiltedCard";

const steps = [
  {
    icon: <FaUserPlus className="text-[#727D73] text-4xl mb-3" />,
    title: "Sign Up",
    desc: "Create a free account in seconds using your email or social login.",
  },
  {
    icon: <FaTasks className="text-[#727D73] text-4xl mb-3" />,
    title: "Complete Tasks",
    desc: "Choose from a variety of simple tasks posted daily by clients.",
  },
  {
    icon: <FaWallet className="text-[#727D73] text-4xl mb-3" />,
    title: "Get Paid",
    desc: "Earn money instantly after task verification — no waiting!",
  },
  {
    icon: <FaRocket className="text-[#727D73] text-4xl mb-3" />,
    title: "Level Up",
    desc: "Complete more tasks to earn badges and unlock premium tasks.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <TiltedCard
              key={index}
              overlayContent={
                <div className="text-[#3e443f] space-y-2 px-2">
                  {step.icon}
                  <h4 className="text-xl font-semibold">{step.title}</h4>
                  <p className="text-sm">{step.desc}</p>
                </div>
              }
              imageSrc={""}
              fallbackBgColor="#D0DDD0"
              imageHeight="260px"
              imageWidth="100%"
              containerHeight="280px"
              rotateAmplitude={10}
              scaleOnHover={1.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
