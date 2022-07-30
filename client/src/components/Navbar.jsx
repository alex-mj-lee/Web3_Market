import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { shortenAddress } from "../utils/shortenAddress";

import { TransactionContext } from "../context/TransactionContext";

import logo from "../images/logo.png";

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex justify-between items-center p-4 lg:py-4 lg:mx-auto lg:max-w-7xl">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial ">
        <Link to={"/"}>
          <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
            Home
          </li>
        </Link>
        <Link to={"/NftMarket"}>
          <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
            NftMarket
          </li>
        </Link>
        <Link to={"/DeX"}>
          <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
            DeX
          </li>
        </Link>
        <Link to={"/Profile"}>
          <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
            Profile
          </li>
        </Link>

        {!currentAccount ? (
          <li
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={connectWallet}
          >
            Connect Wallet
          </li>
        ) : (
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            {shortenAddress(currentAccount)}
          </li>
        )}
      </ul>

      <div className="flex relative md:hidden">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        )}
        {toggleMenu && (
          <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col items-end rounded-md blue-glassmorphism text-white animate-slide-in">
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            <Link to={"/"}>
              <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
                Home
              </li>
            </Link>
            <Link to={"/NftMarket"}>
              <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
                NftMarket
              </li>
            </Link>
            <Link to={"/DeX"}>
              <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
                DeX
              </li>
            </Link>
            <Link to={"/Profile"}>
              <li className="mx-4 cursor-pointer ${classProps hover:border-b hover:border-white">
                Profile
              </li>
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
