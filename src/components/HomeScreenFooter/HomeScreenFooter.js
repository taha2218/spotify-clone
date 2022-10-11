import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentlyPlaying, selectToken, setCurrentlyPlaying } from '../../features/tokenSlice';
import PlayerControl from '../PlayerControls/PlayerControl';
import Volume from '../Volume/Volume';
import './HomeScreenFooter.css';

function HomeScreenFooter() {

  const currentlyPlaying = useSelector(selectCurrentlyPlaying);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      if (response.data !== "") {
        const {item} = response.data;
        const currentPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch(setCurrentlyPlaying(currentPlaying))
      }
    }
    getCurrentTrack();
  }, [dispatch,token])

  return (
    <div className='homeScreenFooter__container'>
      {
        currentlyPlaying && (
          <div className='track__container'>
            <div className='song_details'>
              <img className='song__img'
              src={currentlyPlaying.image}
              alt='song__image'/>
              <span className='name_artist'>
                  {currentlyPlaying.name}
                  <div className='artists'>
                    {
                      currentlyPlaying.artists.map((artist) => {
                        return <span key={artist}>{artist}</span>;
                      })
                    }
                  </div>
              </span>
            </div>
            <PlayerControl />
            <Volume />
          </div>
        )
      }
    </div>
  )
}

export default HomeScreenFooter