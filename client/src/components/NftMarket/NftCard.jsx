import React from "react";
import { Link } from "react-router-dom";

const NftCard = ({ data }) => {
  const newTo = {
    pathname: "/NftMarket/" + data.tokenId,
  };
  return (
    <Link to={newTo}>
      <div className="w-[90%] mx-auto flex flex-col rounded-lg border-2 lg:w-72 lg:h-80">
        <img
          className="w-full h-[350px] rounded-lg object-cover"
          src={data.image}
        />
        <div className="text-white w-full p-2 bg-gradient-to-t from-[#fdfdfd] to-transparent rounded-lg pt-5 -mt-20 text-center">
          <strong className="text-xl">{data.name}</strong>
          <p className="display-inline">{data.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
