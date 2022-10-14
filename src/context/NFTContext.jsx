import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { nftMarketAddress, nftMarketABI } from "../utils/constants";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";

const sampleData = [
  // {
  //   name: "NFT#1",
  //   description: "Alchemy's First NFT",
  //   website: "http://axieinfinity.io",
  //   image:
  //     "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //   price: "0.03ETH",
  //   currentlySelling: "True",
  //   address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
  // },
  // {
  //   name: "NFT#2",
  //   description: "Alchemy's Second NFT",
  //   website: "http://axieinfinity.io",
  //   image:
  //     "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
  //   price: "0.03ETH",
  //   currentlySelling: "True",
  //   address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  // },
  // {
  //   name: "NFT#3",
  //   description: "Alchemy's Third NFT",
  //   website: "http://axieinfinity.io",
  //   image:
  //     "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //   price: "0.03ETH",
  //   currentlySelling: "True",
  //   address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  // },
];

export const NFTContext = createContext();

export const NFTContextProvider = ({ children }) => {
  const [allNftData, setAllNftData] = useState(sampleData);
  const [allNftDataFetched, setAllNftDataFetched] = useState(false);
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [nftIsLoading, setNftIsLoading] = useState(false);

  //MyNftData//

  const [myNftData, setMyNftData] = useState([]);
  const [totalPrice, updateTotalPrice] = useState("0");

  const onChangeFile = async (e) => {
    var file = e.target.files[0];
    console.log(file);

    try {
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const uploadMetadatToIPFS = async () => {
    const { name, description, price } = formParams;

    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const listNFT = async (e) => {
    e.preventDefault();
    const { name, description, price } = formParams;
    console.log(name, description, price, fileURL);
    if (!name || !description || !price || !fileURL) {
      return alert("Please Add Info");
    }
    try {
      const metadataURL = await uploadMetadatToIPFS();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setNftIsLoading(true);

      let contract = new ethers.Contract(
        nftMarketAddress,
        nftMarketABI,
        signer
      );

      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice.toString();

      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });

      await transaction.wait();
      setNftIsLoading(false);

      alert("successfully listed your NFT!");
      setMessage("");
      updateFormParams({
        name: "",
        description: "",
        price: "",
      });
      window.location.replace("/");
    } catch (err) {
      setNftIsLoading(false);
      return alert(err.message);
    }
  };

  ////////////  Getting wallets NFTs  //////
  const getMyNftData = async () => {
    let sumPrice = 0;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftMarketAddress, nftMarketABI, signer);
    let transaction = await contract.getMyNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };

        sumPrice += Number(price);
        return item;
      })
    );
    setMyNftData(items);
    updateTotalPrice(sumPrice);
  };

  ////////////  Getting All NFTs  //////
  const getAllNFTs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftMarketAddress, nftMarketABI, signer);
    let transaction = await contract.getAllNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");

        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };

        return item;
      })
    );
    setAllNftDataFetched(true);
    setAllNftData(items);
  };

  if (!allNftDataFetched) getAllNFTs();

  return (
    <NFTContext.Provider
      value={{
        allNftData,
        updateFormParams,
        formParams,
        listNFT,
        onChangeFile,
        nftIsLoading,
        myNftData,
        totalPrice,
        getMyNftData,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
