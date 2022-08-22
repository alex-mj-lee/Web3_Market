import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Input from "../Input";

import { shortenAddress } from "../../utils/shortenAddress";

import { TransactionContext } from "../../context/TransactionContext";
import Loader from "../Loader";

const styles = {
  featureList:
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white",
};

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center radient-bg-welcome lg:h-screen pb-32">
      <div className="flex sm:w-[75%] w-[90%] lg:flex-row flex-col justify-between  lg:w-[1200px] lg:mx-14  ">
        <div className="flex flex-1 justify-start flex-col  lg:mt-[15%]">
          <h1 className="lg:w-[600px] text-3xl sm:text-7xl text-white  sm:font-semibold py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-xl text-opacity-80">
            Explore the crypto world.
            <br /> Buy and sell cryptocurrencies easily on Krypto.
          </p>
          {!currentAccount ? (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] w-1/2 md:hidden"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col flex-1 items-center  w-full mf:mt-5 mt-10 lg:items-end lg:pr-20 ">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-48 sm:h-52 sm:w-96 w-[90%] my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className=" flex w-10 h-10 rounded-full border-2 border-white justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-[90%] flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (EHT)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
