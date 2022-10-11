import React from 'react'
import HomeScreenFooter from '../../HomeScreenFooter/HomeScreenFooter';
import LeftNav from '../../LeftNav/LeftNav';
import SpotifyMain from '../../SpotifyMain/SpotifyMain';

import './HomeScreen.css';

function HomeScreen() {
  return (
    <div className='HomeScreenContainer'>
        <div className='HomeScreenContainer__header'>
          <LeftNav />
          <SpotifyMain />
        </div>
        <HomeScreenFooter />
    </div>
  )
}

export default HomeScreen