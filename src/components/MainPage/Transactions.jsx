import React, { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import useFetch from "../../hooks/useFetch";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
  url,
  keyword,
}) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] w-full flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64  rounded-md shadow-lg oject-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  return (
    <div className="w-full gradient-bg-transactions lg:h-[70vh]">
      <div className="flex flex-col py-12 w-full justify-center items-center lg:max-w-7xl md:max-w-2xl mx-auto px-4 ">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transaction
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the Lates transaction
          </h3>
        )}

        <div className="mt-10 w-full">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                // width: 640,
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                // width: 1024,
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
          >
            {transactions.reverse().map((transaction, i) => {
              return (
                <SwiperSlide>
                  <TransactionCard key={i} {...transaction} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
