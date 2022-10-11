import React from "react";
import {
  BsPlayCircleFill,
  BsSkipStartFill,
  BsSkipEndFill,
  BsPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { ImLoop } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayingState,
  setCurrentlyPlaying,
  selectToken,
  setPlayerState,
} from "../../features/tokenSlice";
import axios from "axios";

import "./PlayerControl.css";

function PlayerControl() {
  const token = useSelector(selectToken);
  const playerState = useSelector(selectPlayingState);
  const dispatch = useDispatch();

  const changeTrack = async (type) => {
    await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {}, {
      headers: {
        Authorization: "Bearer " + token, 
        "Content-Type": "application/json",
      },
    }).then(
        async (_) => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (response.data !== "") {
                const { item } = response.data;
                const currentPlaying = {
                  id: item.id,
                  name: item.name,
                  artists: item.artists.map((artist) => artist.name),
                  image: item.album.images[2].url,
                };
                dispatch(setCurrentlyPlaying(currentPlaying));
                if(!playerState)
                    dispatch(setPlayerState(!playerState))
              } else {
                dispatch(setCurrentlyPlaying(null));
              }
        }
    );
    
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,{},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
    dispatch(setPlayerState(!playerState));
  }

  return (
    <div className="control__body">
      <div className="player__controls">
        <BsShuffle fontSize={16} color="#5e5e5e" />
        <BsSkipStartFill
          fontSize={26}
          color="white"
          onClick={() => {
            changeTrack("previous");
          }}
        />
        {playerState ? (
          <BsPauseCircleFill fontSize={32} color="#bababa" onClick={() => {changeState()}} />
        ) : (
          <BsPlayCircleFill fontSize={32} color="white" onClick={() => {changeState()}} />
        )}
        <BsSkipEndFill
          fontSize={26}
          color="#bababa"
          onClick={() => {
            changeTrack("next");
          }}
        />
        <ImLoop fontSize={16} color="#5e5e5e" />
      </div>
    </div>
  );
}

export default PlayerControl;
