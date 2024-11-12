import React from "react";
import { NavLink } from "react-router-dom";

const Logo = () => {
  const imgStyle = {
    marginLeft: "-1080px",
    height: "146px",
    width: "160px",
    borderRadius: "30px"
  };
  return (
    <div className="flex-fill">
      <NavLink to="/users">
      <img src="https://e7.pngegg.com/pngimages/216/24/png-clipart-taxi-logos-taxi-logos-thumbnail.png" style={imgStyle}/>
      </NavLink>
    </div>
  );
};

export default Logo;
