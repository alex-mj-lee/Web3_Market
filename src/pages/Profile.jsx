import React, { useContext, useEffect } from "react";
import profile from "../assets/aleximage.jpg";
import NftCard from "../components/NftMarket/NftCard";
import { shortenAddress } from "../utils/shortenAddress";
import { NFTContext } from "../context/NFTContext";
import { TransactionContext } from "../context/TransactionContext";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Profile = () => {
  const { myNftData, totalPrice, getMyNftData } = useContext(NFTContext);
  const { currentAccount } = useContext(TransactionContext);

  useEffect(() => {
    getMyNftData();
  }, []);

  return (
    <div className="w-full flex flex-col mx-auto my-8 sm:mt-16 lg:max-w-5xl sm:h-[75vh]">
      <div className="my-5">
        <img
          src={profile}
          className="rounded-[50%] h-40 w-42 border-2 border-white object-contain mx-auto"
        />
        {currentAccount ? (
          <p className="text-white text-center mt-4">
            {shortenAddress(currentAccount)}
          </p>
        ) : (
          <p className="text-white text-center mt-4"></p>
        )}
      </div>
      <div>
        <p className="text-white text-3xl text-center">My NFT</p>
        <div className="mt-14">
          <Swiper
            className="pb-10"
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
            {myNftData ? (
              myNftData.map((value, index) => {
                return (
                  <SwiperSlide key={index}>
                    <NftCard data={value} key={index} />
                  </SwiperSlide>
                );
              })
            ) : (
              <p>You don't have any NFTs</p>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Profile;
