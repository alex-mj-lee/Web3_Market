import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

export const DexContext = createContext();

const DexContextProvider = () => {
  return <div>DexContext</div>;
};

export default DexContext;
