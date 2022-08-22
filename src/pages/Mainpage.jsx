import React from "react";
import Welcome from "../components/MainPage/Welcome";
import Transactions from "../components/MainPage/Transactions";
import Services from "../components/MainPage/Services";

const Mainpage = () => {
  return (
    <div>
      <Welcome />
      <Services />
      <Transactions />
    </div>
  );
};

export default Mainpage;
