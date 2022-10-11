import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlaylist,
  selectPlaylistId,
  selectToken,
  setPlaylist,
  selectUser,
  setCurrentlyPlaying,
  setPlayerState,
} from "../../features/tokenSlice";
import "./SongPreview.css";

function SongPreview() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const playlistId = useSelector(selectPlaylistId);
  const playlist = useSelector(selectPlaylist);
  const user = useSelector(selectUser);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  const changeTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch(setCurrentlyPlaying(currentlyPlaying));
      dispatch(setPlayerState(true));
    } else {
      dispatch(setPlayerState(true));
    }
  };

  const converMsToMin = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.round((ms % 60000) / 1000);
    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${padTo2Digits(seconds)}`;
  };

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }, index) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artists) => artists.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch(setPlaylist(selectedPlaylist));
    };
    getInitialPlaylist();
  }, [playlistId, dispatch]);

  return (
    <div className="SongPreview__container">
      {playlist && (
        <>
          <div className="song__details">
            <img src={playlist.image} alt="Album Image" />
            <div className="info">
              <h6>PLAYLIST</h6>
              <h1>{playlist.name}</h1>
              <span className="space"></span>
              <h6 className="desc">{playlist.description}</h6>
              <h6>
                {user?.name} • <span> {playlist.tracks.length} Songs </span>{" "}
              </h6>
            </div>
          </div>
          <div className="tracks">
            {playlist.tracks.map(
              ({
                id,
                name,
                artists,
                image,
                duration,
                album,
                context_uri,
                track_number,
              }, index) => {
                return (
                  <div
                    className="song__tile"
                    onClick={() => {
                      changeTrack(
                        id,
                        name,
                        artists,
                        image,
                        context_uri,
                        track_number
                      );
                    }}
                    key={id}
                  >
                    <div className="avatar__tile">
                      <h5>{index+1}</h5>
                      <img src={image} alt="Track Image" />
                      <h5 className="song__artist">
                        <span>{name}</span>
                        <span className="line__artists">
                          {artists.map((name) => (
                            <h5 key={name}>{name}</h5>
                          ))}
                        </span>
                      </h5>
                    </div>
                    <div className="album__name">{<h5>{album}</h5>}</div>
                    <div className="song__duration">
                      {<h5>{converMsToMin(duration)}</h5>}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SongPreview;
