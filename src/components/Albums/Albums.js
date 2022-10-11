import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMyPlaylist,
  selectToken,
  setMyPlaylist,
  setPlaylistId,
} from "../../features/tokenSlice";

import "./Albums.css";

function Albums() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const myPlaylists = useSelector(selectMyPlaylist);

  const changeCurrentPlaylist = (id) => {
    dispatch(setPlaylistId(id));
  }

  useEffect(() => {
    const getPlayListData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ id, name }) => {
        return { name, id };
      });
      dispatch(setMyPlaylist(playlists));
    };
    getPlayListData();
  }, [token, dispatch]);

  return (
    <div className="Albums__container">
      {myPlaylists &&
        myPlaylists.map(({ name, id }) => {
          return (
            <div className="tile" key={id} onClick={()=>{changeCurrentPlaylist(id)}}>
              {name}
            </div>
          );
        })}
    </div>
  );
}

export default Albums;
