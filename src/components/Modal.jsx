import React from "react";

const Modal = () => {
  return (
    <div className=" w-[90%] sm:w[600px] h-[600px] bg-white absolute left-6 -top-20  rounded-3xl">
      <div>
        <p>Select a token</p>
        <button>x</button>
      </div>
      <input type="text" placeholder="Search name or past address" />
      <ul>
        <li>Eth</li>
        <li>DAI</li>
        <li>USDC</li>
        <li>Eth</li>
      </ul>
      <div className="w-full h-[0.25px] bg-gray-400 mt-5"></div>
    </div>
  );
};

export default Modal;
