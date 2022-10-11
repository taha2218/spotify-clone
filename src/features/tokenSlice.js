import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  myPlaylist: [],
  user: null,
  selectedPlaylistId: "541eK4v5a2nXL5dpWoUMi9",
  selectedPlaylist: null, 
  currentlyPlaying: null,
  playerState: false
};


export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMyPlaylist: (state, action) => {
      state.myPlaylist = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setCurrentlyPlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
    },
    setPlayerState: (state, action) => {
      state.playerState = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
  },
});

export const { setToken, setMyPlaylist, setPlaylistId, setUser, setPlaylist, setCurrentlyPlaying, setPlayerState } = tokenSlice.actions;
export const selectToken = (state) => state.token.token;
export const selectMyPlaylist = (state) => state.token.myPlaylist;
export const selectUser = (state) => state.token.user;
export const selectPlaylistId = (state) => state.token.selectedPlaylistId;
export const selectPlaylist = (state) => state.token.selectedPlaylist;
export const selectCurrentlyPlaying = (state) => state.token.currentlyPlaying;
export const selectPlayingState = (state) => state.token.playerState;

export default tokenSlice.reducer;
