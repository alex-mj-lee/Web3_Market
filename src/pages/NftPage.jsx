import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { nftMarketAddress, nftMarketABI } from "../utils/constants";
import axios from "axios";
import { IoMdWallet } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import { TbAddressBook } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
const NftPage = () => {
  const [pickedNFT, setPickedNFT] = useState({});
  const [selectedTokenId, setSelectedTokenId] = useState();
  const params = useParams();

  const { currentAccount } = useContext(TransactionContext);
  useEffect(() => {
    getURLData();
  }, []);

  useEffect(() => {
    getNFTdata(selectedTokenId);
  }, [selectedTokenId]);

  const getURLData = async () => {
    const tokenId = params.tokenId;
    setSelectedTokenId(tokenId);
  };

  const getNFTdata = async (tokenId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftMarketAddress, nftMarketABI, signer);
    const listedToken = await contract.getListedTokenForId(tokenId);

    const tokenURI = await contract.tokenURI(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;

    let price = ethers.utils.formatUnits(listedToken.price.toString(), "ether");

    let item = {
      price,
      tokenId: listedToken.tokenId.toNumber(),
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };

    setPickedNFT(item);
  };

  const buyNFT = async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        nftMarketAddress,
        nftMarketABI,
        signer
      );

      const salePrice = ethers.utils.parseUnits(pickedNFT.price, "ether");

      const transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("Successfully purchase the NFT");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className=" w-full ">
      <div className="max-w-xl my-14 mx-auto px-4 lg:hidden">
        <div>
          <p className="text-white font-semibold text-3xl ml-3 mb-3">
            {pickedNFT.name}
          </p>
        </div>
        <div className="border rounded-xl">
          <div>
            <img
              className="w-full mx-auto object-cover rounded-t-xl"
              src={pickedNFT.image}
            />
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <p className="text-white ml-2 flex gap-1">
              Owned by
              <a
                className="text-gray-200 flex gap-0.5 items-center "
                href={`https://goerli.etherscan.io/address/${pickedNFT.seller}`}
              >
                {pickedNFT.seller ? pickedNFT.seller.slice(0, 5) : " "}
                <TbAddressBook />
              </a>
            </p>
            <p className="text-white ml-2 flex gap-1">
              Created by
              <a
                className="text-gray-200 flex gap-0.5 items-center "
                href={`https://goerli.etherscan.io/address/${pickedNFT.owner}`}
              >
                {pickedNFT.owner ? pickedNFT.owner.slice(0, 5) : " "}
                <TbAddressBook />
              </a>
            </p>
          </div>

          <div className="w-[95%] mx-auto mt-10 mb-3 flex flex-col gap-5">
            <p className="text-white border-b border-gray-400 py-2 border`">
              {pickedNFT.description}
            </p>
            <p className="text-white text-2xl flex items-center gap-3">
              <FaEthereum /> {pickedNFT.price}
            </p>
            <button
              className="border h-10 w-full text-white rounded-2xl flex justify-center items-center gap-3 active:bg-white active:text-black"
              onClick={() => buyNFT(selectedTokenId)}
            >
              <IoMdWallet /> Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="w-full gap-10 mt-40 my-14 mx-auto px-4 hidden lg:flex h-[50vh] justify-center max-w-7xl">
        <div className="w-1/4">
          <img
            className="w-full mx-auto object-cover rounded-t-xl"
            src={pickedNFT.image}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <p className="text-white font-semibold text-5xl ml-3 mb-3">
            {pickedNFT.name}
          </p>
          <div className="mt-3 flex gap-7">
            <p className="text-white ml-2 flex gap-1">
              Owned by
              <a
                className="text-gray-200 flex gap-0.5 items-center "
                href={`https://goerli.etherscan.io/address/${pickedNFT.seller}`}
              >
                {pickedNFT.seller ? pickedNFT.seller.slice(0, 5) : " "}
                <TbAddressBook />
              </a>
            </p>
            <p className="text-white ml-2 flex gap-1">
              Created by
              <a
                className="text-gray-200 flex gap-0.5 items-center "
                href={`https://goerli.etherscan.io/address/${pickedNFT.owner}`}
              >
                {pickedNFT.owner ? pickedNFT.owner.slice(0, 5) : " "}
                <TbAddressBook />
              </a>
            </p>
          </div>
          <div className="w-[95%] mx-auto mt-10 mb-3 flex flex-col gap-5">
            <p className="text-white border-b border-gray-400 py-2 border`">
              {pickedNFT.description}
            </p>
            <p className="text-white text-2xl flex items-center gap-3">
              <FaEthereum /> {pickedNFT.price}
            </p>
            <button
              className="border h-10 w-full text-white rounded-2xl flex justify-center items-center gap-3 active:bg-white active:text-black"
              onClick={() => buyNFT(selectedTokenId)}
            >
              <IoMdWallet /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftPage;
