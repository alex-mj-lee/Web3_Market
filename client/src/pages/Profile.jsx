import React, { useContext, useEffect } from "react";
import soondae from "./French.png";
import NftCard from "../components/NftMarket/NftCard";
import { NFTContext } from "../context/NFTContext";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const sampleData = [
  {
    name: "NFT#1",
    description: "Alchemy's First NFT",
    website: "http://axieinfinity.io",
    image:
      "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
    price: "0.03ETH",
    currentlySelling: "True",
    address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
  },
  {
    name: "NFT#2",
    description: "Alchemy's Second NFT",
    website: "http://axieinfinity.io",
    image:
      "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
    price: "0.03ETH",
    currentlySelling: "True",
    address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  },
  {
    name: "NFT#3",
    description: "Alchemy's Third NFT",
    website: "http://axieinfinity.io",
    image:
      "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
    price: "0.03ETH",
    currentlySelling: "True",
    address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  },
  {
    name: "NFT#1",
    description: "Alchemy's First NFT",
    website: "http://axieinfinity.io",
    image:
      "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
    price: "0.03ETH",
    currentlySelling: "True",
    address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
  },
  {
    name: "NFT#2",
    description: "Alchemy's Second NFT",
    website: "http://axieinfinity.io",
    image:
      "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
    price: "0.03ETH",
    currentlySelling: "True",
    address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  },
  {
    name: "NFT#3",
    description: "Alchemy's Third NFT",
    website: "http://axieinfinity.io",
    image:
      "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
    price: "0.03ETH",
    currentlySelling: "True",
    address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  },
];

const Profile = () => {
  const { myNftData, totalPrice, getMyNftData } = useContext(NFTContext);

  useEffect(() => {
    getMyNftData();
  }, []);

  return (
    <div className="w-full flex flex-col mx-auto my-8 sm:mt-16 lg:max-w-5xl h-full">
      <div className="my-5">
        <img
          src={soondae}
          className="rounded-[50%] h-1/5 w-1/5 border-2 border-white object-contain mx-auto"
        />
        <p className="text-white text-center mt-4">Alex's ETH Wallet</p>
      </div>
      <div>
        <p className="text-white text-3xl text-center">My NFT</p>
        <div className="mt-14">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                width: 640,
                slidesPerView: 2,
                spaceBetween: 0,
              },

              1024: {
                width: 1024,
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {myNftData.map((value, index) => {
              return (
                <SwiperSlide>
                  <NftCard data={value} key={index} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Profile;
