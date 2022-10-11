import React from "react";
import { RiHome5Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { BsPlusSquareFill } from "react-icons/bs";
import Albums from "../Albums/Albums";

import "./LeftNav.css";

function LeftNav() {
  return (
    <div className="LeftNav__container">
      <img
        className="LeftNav__logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="Spotify Logo"
      />
      <div className="nav__tile">
        <RiHome5Fill fontSize={26} /> <span> Home </span>
      </div>
      <div className="nav__tile">
        <FiSearch fontSize={26} /> <span> Search </span>
      </div>
      <div className="nav__tile">
        <BiLibrary fontSize={26} /> <span> Your Library </span>
      </div>
      <div className="addMargin"></div>
      <div className="nav__tile">
        <BsPlusSquareFill fontSize={26} /> <span> Create Playlist </span>
      </div>
      <div className="nav__tile">
        <img
          className="Liked Icon"
          src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
          alt="Liked Icon"
          height={26}
        />{" "}
        <span> Your Library </span>
      </div>
      <Albums />
    </div>
  );
}

export default LeftNav;
