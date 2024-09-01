import React from "react";
import { Link } from "expo-router";

const NormalBtn = ({ dest = "/", content }) => {
  return (
    <Link
      href={dest}
      className="w-1/2 text-center py-5 bg-secondary rounded-full text-white font-robotob text-base"
    >
      {content}
    </Link>
  );
};

export default NormalBtn;
