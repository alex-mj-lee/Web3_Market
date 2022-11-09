import React from "react";
import logo from "../assets/aleximage.jpg";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full lg:max-w-7xl lg:px-3">
        <div className="w-full md:flex md:justify-between items-center my-4">
          <Link to={"/"}>
            <div className="flex flex-[0.5] justify-center items-center">
              <img src={logo} alt="logo" className="w-24 h-24 rounded-full" />
            </div>
          </Link>
          <div className="flex flex-1 md:justify-end justify-center md:items-center md:flex-wrap md:mt-0 mt-5 gap-7 w-full lg:gap-14">
            <Link to={"/"}>
              <p className="text-white text-base text-center mx-2 cursor-pointer">
                Home
              </p>
            </Link>
            <Link to={"/NftMarket"}>
              <p className="text-white text-base text-center mx-2 cursor-pointer">
                NftMarket
              </p>
            </Link>
            <Link to={"/DeX"}>
              <p className="text-white text-base text-center mx-2 cursor-pointer">
                DeX
              </p>
            </Link>
            <Link to={"/Profile"}>
              <p className="text-white text-base text-center mx-2 cursor-pointer">
                Profile
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-5">
          <p className="text-white text text-center">Come Join us</p>
          <p className="text-white text-sm text-center">
            alex.lee6200@gmail.com
          </p>
        </div>
        <div className="w-full h-[0.25px] bg-gray-400 mt-5"></div>
        <div className=" w-full flex justify-between items-center mt-3">
          {" "}
          <p className="text-white text-sm text-center">@alex2022</p>
          <p className="text-white text-sm text-center">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
