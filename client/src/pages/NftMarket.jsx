import React, { useContext } from "react";
import { NFTContext } from "../context/NFTContext";

import NftCard from "../components/NftMarket/NftCard";
import SellNft from "../components/NftMarket/SellNft";

const NftMarket = () => {
  const { allNftData } = useContext(NFTContext);

  return (
    <div className="w-full flex-col sm:w-[95%] mx-auto my-8 sm:mt-16 lg:max-w-5xl">
      <div>
        <p className="text-white  text-3xl text-center">Listed NFT</p>
        <div className="flex flex-col gap-10 mt-14 sm:flex-row lg:justify-between">
          {allNftData.map((value, index) => {
            return <NftCard data={value} key={index} />;
          })}
        </div>
      </div>
      <div className="mt-14 mx-7 lg:flex sm:mt-20 lg:items-center lg:justify-center lg:gap-40 ">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient text-center">
          Safely list NFT
          <br />
          for sale
        </h1>
        <SellNft />
      </div>
    </div>
  );
};

export default NftMarket;
