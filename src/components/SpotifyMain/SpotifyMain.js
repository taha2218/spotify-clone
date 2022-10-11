import React from 'react'
import SongPreview from '../SongPreview/SongPreview';
import TopNav from '../TopNav/TopNav';
import './SpotifyMain.css';

function SpotifyMain() {
  return (
    <div className='SpotifyMain__container'>
      <TopNav />
      <SongPreview />
    </div>
  )
}

export default SpotifyMain