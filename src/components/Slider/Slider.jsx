import React, { useState } from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Profile from '../Profile/Profile';

const dashboardData = [
  {
    id: 1,
    title: 'Hotels',
    iconChangeTo: <MdSpaceDashboard className='icon' />,
    icon: <MdOutlineSpaceDashboard className='icon' />
  },
  {
    id: 2,
    title: 'My Wallet',
    iconChangeTo: <IoWallet className='icon' />,
    icon: <IoWalletOutline className='icon' />,
  },
  {
    id: 3,
    title: 'Settings',
    iconChangeTo: <IoSettingsSharp className='icon' />,
    icon: <IoSettingsOutline className='icon' />
  },
]

function Slider() {
  const [active, setActive] = useState(1)

  return (
    <div className='slider'>
      <Profile />
      <ul className='navbarList'>
        {
          dashboardData.map(item => (
            <li
              key={item.id}
              className={item.id == active && 'active'}
              onClick={() => setActive(item.id)}
            >
              <div className='iconAndNameContainer'>
                <div className="iconContainer">{item.id == active ? item.iconChangeTo : item.icon}</div>
                <p>{item.title}</p>
              </div>
              <span></span>
            </li>
          ))
        }
      </ul>
      <button className='singOut'>
        <div className="iconContainerSingOut"><CiLogout className='icon'/></div>
        <p>Log Out</p>
      </button>
    </div>
  )
}

export default Slider
