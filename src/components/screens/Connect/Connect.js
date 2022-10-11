import React from "react";
import "./Connect.css";

function Connect() {
  const onClickHandler = () => {
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    const clientId = "2de95e4c9933499499627e4dd3827fcb";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes
      .join(" ")}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="Connect__container">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" />
      <button onClick={onClickHandler}>CONNECT</button>
    </div>
  );
}

export default Connect;
