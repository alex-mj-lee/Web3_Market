import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServicesCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl lg:h-48 lg:w-[30%] lg:mx-auto lg:pl-10">
    <div
      className={`w-12 h-12 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-white text-xl">{title}</h1>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="w-full gradient-bg-services lg:h-screen lg:pt-40">
      <div className="w-full lg:max-w-7xl flex justify-center items-center flex-col mx-auto">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
              Services that we
              <br />
              continue to improve
            </h1>
          </div>
        </div>
        <div className="flex-1 flex-col lg:flex-row flex justify-start">
          <ServicesCard
            color="bg-[#2952E3]"
            title="Security Guaranteed"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guaranted. We always maintiain privacy and the quarlity of our products"
          />

          <ServicesCard
            color="bg-[#8945F8]"
            title="Best exchange rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Security is guaranted. We always maintiain privacy and the quarlity of our products"
          />

          <ServicesCard
            color="bg-[#f84550]"
            title="Fastest transactions"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Security is guaranted. We always maintiain privacy and the quarlity of our products"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
