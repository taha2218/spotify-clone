import SpotifyWebApi from 'spotify-web-api-node';

export const scopes = [
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "playlist-read-private",
    "streaming",
    "playlist-read-collaborative",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
];

const params = {
    scope: scopes,
}

const queryParamString = new URLSearchParams(params);
export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

export const spotifApi = new SpotifyWebApi({
    clientId: "2de95e4c9933499499627e4dd3827fcb",
    clientSecret: "a6ad47db6e764347962350471aeb7239"
})

