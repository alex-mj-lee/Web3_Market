import React, { useEffect, useState, useContext } from "react";
import { CgArrowDown } from "react-icons/cg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { ethers, FixedNumber } from "ethers";
import qs from "qs";
import { erc20abi } from "../utils/constants";
import { TransactionContext } from "../context/TransactionContext";
// import BigNumber from "big-number";
import { BigNumber } from "ethers";

const Dex = () => {
  const [coinList, setCoinList] = useState([]);
  const [modalVisible, setMocalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState();
  const [pickedFromCoin, setPickedFromCoin] = useState();
  const [pickedToCoin, setPickedToCoin] = useState();

  const [estimatedGas, setEstimadeGas] = useState();
  const [swapSource, setSwapSource] = useState();
  const [currentSide, setCurrentSide] = useState("");

  const [searchCoinList, setSearchCoinList] = useState([]);

  const [fromChange, setFromChange] = useState();
  const [toChange, setToChange] = useState();

  const { currentAccount } = useContext(TransactionContext);

  const openModal = (side) => {
    setCurrentSide(side);
    setMocalVisible(true);
  };
  const closeModal = () => {
    setMocalVisible(false);
  };

  const fromAmountChange = (e) => {
    setFromAmount(e);
    setFromChange(e);
  };

  const toAmountChange = (e) => {
    setToAmount(e);
    setToChange(e);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  useEffect(() => {
    getFromPrice();
  }, [fromChange]);

  useEffect(() => {
    getToPrice();
  }, [toChange]);

  const coinSelected = (coin) => {
    if (currentSide === "from") {
      setPickedFromCoin(coin);
    }
    if (currentSide === "to") {
      setPickedToCoin(coin);
    }
    closeModal();
  };

  const fetchCoin = async () => {
    const response = await fetch(
      "https://tokens.coingecko.com/uniswap/all.json"
    );
    const data = await response.json();
    const coinData = data.tokens;
    setCoinList(coinData);
    setSearchCoinList(coinData);
    return coinData;
  };

  const findCoin = (name) => {
    let filterCoin = [];
    searchCoinList.forEach((ele) => {
      if (ele.name === name) filterCoin.push(ele);
    });
    return filterCoin[0];
  };

  const searchCoin = (e) => {
    let keyword = e.target.value;

    if (keyword !== "") {
      const result = searchCoinList.filter((ele) => {
        return ele.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setCoinList(result);
    } else {
      setCoinList(searchCoinList);
    }
    setSearch(keyword);
  };

  // console.log("fromAmount: ", fromAmount);
  // console.log("fromChange: ", fromChange);

  // console.log("toAmount: ", toAmount);
  // console.log("toChange: ", toChange);

  // console.log("pickedFromCoin: ", pickedFromCoin);
  // console.log("pickedToCoin: ", pickedToCoin);

  const getFromPrice = async () => {
    if (!pickedFromCoin || !pickedToCoin || !fromAmount) return;

    let amount = Number(fromAmount * 10 ** pickedFromCoin.decimals);

    const params = {
      sellToken: pickedFromCoin.address,
      buyToken: pickedToCoin.address,
      sellAmount: amount,
    };

    const response = await fetch(
      `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`
    );

    const priceJSON = await response.json();
    console.log("price: ", priceJSON);
    const source = priceJSON.sources;

    for (const i in source) {
      if (source[i].proportion !== "0") {
        const sourceName = source[i].name;
        setSwapSource(sourceName);
      }
    }

    setEstimadeGas(priceJSON.estimatedGas);
    setToAmount(+(Number(priceJSON.price) * fromAmount).toFixed(2));
  };

  const getToPrice = async () => {
    if (!pickedFromCoin || !pickedToCoin || !toAmount) return;
    let amount = Number(toAmount * 10 ** pickedToCoin.decimals);

    const params = {
      sellToken: pickedToCoin.address,
      buyToken: pickedFromCoin.address,
      sellAmount: amount,
    };
    const response = await fetch(
      `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`
    );

    const priceJSON = await response.json();
    console.log("price: ", priceJSON);
    const source = priceJSON.sources;

    for (const i in source) {
      if (source[i].proportion !== "0") {
        const sourceName = source[i].name;
        setSwapSource(sourceName);
      }
    }
    setEstimadeGas(priceJSON.estimatedGas);
    setFromAmount(+(Number(priceJSON.price) * toAmount).toFixed(2));
  };

  const getQuote = async (account) => {
    if (!pickedFromCoin || !pickedToCoin || !fromAmount) return;

    let amount = Number(fromAmount * 10 ** pickedFromCoin.decimals);

    const params = {
      sellToken: pickedFromCoin.address,
      buyToken: pickedToCoin.address,
      sellAmount: amount,
      takeAddress: account,
    };
    const response = await fetch(
      `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
    );
    const quoteJSON = await response.json();
    console.log("Quote: ", quoteJSON);

    return quoteJSON;
  };

  const swapAction = async () => {
    // let takerAddress = currentAccount;
    try {
      let fromTokenAddress = pickedFromCoin.address;
      const quoteJSON = await getQuote(currentAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const ERC20TokenContract = new ethers.Contract(
        fromTokenAddress,
        erc20abi,
        signer
      );
      console.log("setup ERC20TokenContract: ", ERC20TokenContract);
      // const fromAmount = quoteJSON.buyAmount / 10 ** pickedToCoin.decimals;
      // const maxApproval = new BigNumber(2).pow(256).minus(1);
      const maxApproval = ethers.utils.parseUnits(
        quoteJSON.buyAmount,
        pickedToCoin.decimals
      );
      console.log("approval amount: ", maxApproval);

      const transaction = await ERC20TokenContract.approve(
        quoteJSON.allowanceTarget,
        maxApproval
      );

      await transaction.wait();
      console.log(transaction);
      const receipt = await ethers.sendTransaction(quoteJSON);
      console.log("receipt: ", receipt);
    } catch (error) {
      alert(error.message);
    }
  };

  const dai = findCoin("Dai");
  const usdc = findCoin("USD Coin");
  const usdt = findCoin("Tether");
  const wbtc = findCoin("Wrapped Bitcoin");
  const weth = findCoin("WETH");
  const sol = findCoin("SOL  Wormhole ");

  const sixCoinList = [dai, usdc, usdt, wbtc, weth, sol];

  return (
    <div className="w-full h-[55vh] sm:h-[63vh]">
      <div className="text-gray-400 mt-20 w-[90%] border border-transparent h-[350px] sm:w-[640px] mx-auto rounded-2xl bg-[#0e1323] relative">
        <div className="relative">
          {/* Input 1 */}
          <div className=" pl-5 w-[95%] h-16 bg-[#1b2035] flex rounded-xl items-center mx-auto mt-7 hover:border hover:border-gray-400 appearance-none">
            <input
              type="number"
              placeholder="0.0"
              className="bg-transparent border-none text-3xl focus:ring-0 w-[80%]"
              onChange={(e) => fromAmountChange(e.target.value)}
              value={fromAmount}
            />
            {pickedFromCoin ? (
              <button
                className="w-32 mr-2 sm:w-1/5 h-2/3 sm:mr-7  bg-[#0e1323] rounded-2xl flex justify-center items-center gap-3 hover:bg-[#1d378a] hover:text-gray-100"
                onClick={() => openModal("from")}
              >
                <img
                  className="rounded-full border-none "
                  src={pickedFromCoin.logoURI}
                  alt="logo"
                />
                {pickedFromCoin.symbol}
              </button>
            ) : (
              <button
                className="w-48 mr-2 h-2/3 sm:mr-7  bg-[#0e1323] rounded-2xl flex justify-center items-center gap-2 pl-1 hover:bg-[#1d378a] hover:text-gray-100"
                onClick={() => openModal("from")}
              >
                Select a coin <MdOutlineKeyboardArrowDown />
              </button>
            )}
          </div>
          {/* Input 2 */}
          <div className=" pl-5 w-[95%] h-16 bg-[#1b2035] flex rounded-xl items-center mx-auto mt-2 hover:border hover:border-gray-400 ">
            <input
              type="number"
              placeholder="0.0"
              className="bg-transparent  border-none text-3xl focus:ring-0 w-[80%]"
              onChange={(e) => toAmountChange(e.target.value)}
              value={toAmount}
            />
            {pickedToCoin ? (
              <button
                className="w-32 mr-2 sm:w-1/5 h-2/3 sm:mr-7  bg-[#0e1323] rounded-2xl flex justify-center items-center gap-3 hover:bg-[#1d378a] hover:text-gray-100"
                onClick={() => openModal("to")}
              >
                <img
                  className="rounded-full border-none "
                  src={pickedToCoin.logoURI}
                  alt="logo"
                />
                {pickedToCoin.symbol}
              </button>
            ) : (
              <button
                className="w-48 mr-2 h-2/3 sm:mr-7  bg-[#0e1323] rounded-2xl flex justify-center items-center gap-2 pl-1 hover:bg-[#1d378a] hover:text-gray-100"
                onClick={() => openModal("to")}
              >
                Select a coin
                <MdOutlineKeyboardArrowDown />
              </button>
            )}
          </div>
          <div>
            <CgArrowDown className="w-10 h-10 absolute bottom-[50%] left-[50%] -translate-x-1/2 translate-y-1/2 rounded-full border bg-[#0e1323] hover:bg-[#1b2035]" />
          </div>
        </div>
        <div className="mt-7 w-[95%] mx-auto text-white">
          <p className="text-white">Estimated Gas: {estimatedGas}</p>
          <p>Swap Source: {swapSource}</p>
        </div>
        <button
          className="flex text-white mt-7 items-center justify-center w-[95%] h-12 border-transparent bg-[#2546bd] rounded-xl mx-auto hover:bg-[#163294] hover:border hover:border-blue-600"
          onClick={swapAction}
        >
          Swap
        </button>
        {modalVisible ? (
          <div className="w-[350px] sm:w-[400px] sm:h-[700px] h-[600px] bg-white absolute left-1/2 -translate-x-1/2 -top-16 rounded-3xl text-black">
            <div className="w-[95%] mx-auto mt-3 flex flex-col gap-3 px-2">
              <div className="flex justify-between my-2  font-semibold">
                <p>Select a token</p>
                <button className="text-2xl h-7 pb-5 w-6" onClick={closeModal}>
                  <IoCloseSharp />
                </button>
              </div>
              <input
                type="search"
                value={search}
                onChange={searchCoin}
                placeholder="Search name or past address"
                className="ring-0 border rounded-lg placeholder-gray-800 border-gray-300 text-lg"
              />
              <ul className="grid grid-cols-4 gap-2.5 mt-3">
                {sixCoinList.map((key, index) => {
                  return key ? (
                    <li
                      className="border h-9 flex rounded-lg justify-center items-center px-1.5 gap-1 sm:gap-1.5 hover:bg-gray-200 cursor-pointer"
                      key={index}
                      onClick={() => coinSelected(key)}
                    >
                      <img
                        className="h-5 w-5"
                        src={key.logoURI}
                        alt={key.name}
                      />
                      <p>{key.symbol}</p>
                    </li>
                  ) : (
                    <></>
                  );
                })}
              </ul>
              <div className="w-full h-[0.25px] bg-gray-400 mt-3"></div>
              <ul className="overflow-scroll h-[370px] sm:h-[450px] ">
                {coinList && coinList.length > 0 ? (
                  coinList.map((key, index) => {
                    return (
                      <li
                        key={index}
                        className="flex py-2 pl-1 items-center gap-4 hover:bg-slate-200 cursor-pointer"
                        onClick={() => coinSelected(key)}
                      >
                        <img
                          className="w-6 h-6 rounded-full object-cover"
                          src={key.logoURI}
                          alt={`${key.name}logo`}
                        />
                        <div className="flex flex-col">
                          <p className="text-md font-semibold">{key.symbol}</p>
                          <p className="text-xs text-gray-700">{key.name}</p>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p>No Results</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dex;
