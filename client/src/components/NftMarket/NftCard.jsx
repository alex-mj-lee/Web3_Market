import React from "react";
import { Link } from "react-router-dom";

const NftCard = ({ data }) => {
  const newTo = {
    pathname: "/nftPage/" + data.tokenId,
  };
  return (
    <Link to={newTo}>
      <div className="w-[95%] lg:mx-auto flex flex-col rounded-lg border-2 lg:w-72 lg:h-80 mx-auto">
        <img
          className="w-full h-60 rounded-t-lg object-cover"
          src={data.image}
        />
        <div className="text-white w-full p-2 to-transparent rounded-lg  mt-5 text-center">
          <strong className="text-xl">{data.name}</strong>
          <p className="display-inline">{data.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
