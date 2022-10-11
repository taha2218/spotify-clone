import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser, setUser } from '../../features/tokenSlice';
import './TopNav.css'
  
function TopNav() {

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      const userInfo = {
        id: response.data.id,
        name: response.data.display_name,
      }
      dispatch(setUser(userInfo));
    }
    getUserInfo()
  }, [])

  return (
    <div className='TopNav__Container'>
      <div className='topNav__arrows'>
        <div className='arrow__icon'>
        <BsChevronLeft fontSize={22} color="white" />
        </div>
        <div className='arrow__icon'>
        <BsChevronRight fontSize={22} color="white" />
        </div>
      </div>
      <div className='topNav__details'>
        <CgProfile color='white' fontSize={22} />
        <span>
          {user?.name}
        </span>
      </div>
    </div>
  )
}

export default TopNav