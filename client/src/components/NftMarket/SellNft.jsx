import React, { useContext } from "react";
import Input from "../Input";
import Loader from "../Loader";

import { NFTContext } from "../../context/NFTContext";

const SellNft = () => {
  const { updateFormParams, formParams, listNFT, onChangeFile, nftIsLoading } =
    useContext(NFTContext);
  return (
    <>
      <form className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism sm:mx-auto lg:mx-0  mt-5">
        <Input
          placeholder="NFT Name"
          name="name"
          type="text"
          handleChange={(e) =>
            updateFormParams({ ...formParams, name: e.target.value })
          }
        />
        <Input
          placeholder="NFT Description"
          name="description"
          type="text"
          handleChange={(e) =>
            updateFormParams({ ...formParams, description: e.target.value })
          }
        />
        <Input
          placeholder="Min Price 0.01ETH"
          name="amount"
          type="number"
          handleChange={(e) =>
            updateFormParams({ ...formParams, price: e.target.value })
          }
        />
        <Input
          type="file"
          handleChange={(e) => {
            onChangeFile(e);
          }}
        />
        <div className="h-[1px] w-full bg-gray-400 my-2" />
        {nftIsLoading ? (
          <Loader />
        ) : (
          <button
            type="button"
            onClick={listNFT}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            List Now
          </button>
        )}
      </form>
    </>
  );
};

export default SellNft;
