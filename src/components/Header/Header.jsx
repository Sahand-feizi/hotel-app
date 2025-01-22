import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const headerData = [
    {
        id: 1,
        url: '/',
        name: 'Home'
    },
    {
        id: 2,
        url: '/',
        name: 'Hotels'
    },
    {
        id: 3,
        url: '/',
        name: 'Login'
    },
    {
        id: 4,
        url: '/',
        name: 'Sinup'
    },
]

function Header() {
    const [active, setActive] = useState()

    return (
        <div className='header'>
            {
                headerData.map(item => (
                    <Link
                        key={item.id}
                        to={item.url}
                        className='headerLinkItem'
                        onClick={(e) => {
                            e.preventDefault()
                            setActive(item.id)
                        }} 
                    >
                        <p className={item.id == active && 'active'}>{item.name}</p>
                        <span className={`indecator ${item.id == active && 'active'}`}></span>
                    </Link>
                ))
            }
        </div>
    )
}

export default Header
