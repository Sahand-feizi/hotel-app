import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const state = useSelector(state => state.auth)

    return (
        <div className="profile">
            <img src="images/profile.jpg" />
            <p className="profileName">{state.user.name}</p>
            <p className="profileWork">web desginer</p>
        </div>
    )
}

export default Profile
