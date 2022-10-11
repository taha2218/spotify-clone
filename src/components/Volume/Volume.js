import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/tokenSlice";
import {BsVolumeDownFill} from 'react-icons/bs';
import axios from "axios";

import "./Volume.css";

function Volume() {
  const token = useSelector(selectToken);
  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: {
            volume_percent: parseInt(e.target.value)
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="volume__container">
      < BsVolumeDownFill fontSize={22} color="#ababab" />  
      <input
        className="slider"
        type="range"
        min={0}
        max={100}
        onMouseUp={(e) => setVolume(e)}
      />
    </div>
  );
}

export default Volume;
