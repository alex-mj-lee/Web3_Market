import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Mainpage from "./pages/Mainpage";
import NftMarket from "./pages/NftMarket";
import NftPage from "./pages/NftPage";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

import { NFTContextProvider } from "./context/NFTContext";
import { TransactionProvider } from "./context/TransactionContext";

const App = () => {
  return (
    <TransactionProvider>
      <NFTContextProvider>
        <div className="gradient-bg-welcome">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/NftMarket" element={<NftMarket />} />
              <Route path="/NftPage/:tokenId" element={<NftPage />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </NFTContextProvider>
    </TransactionProvider>
  );
};

export default App;
