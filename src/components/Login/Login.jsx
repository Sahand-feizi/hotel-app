import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function Login() {

    const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <div className='loginContainer'>
            <form>
                <div className='loginItemContainer'>
                    <label className="loginLabale" htmlFor="userName">User Name</label>
                    <div className="inputContainer">
                        <input type="text" name="userName" />
                    </div>
                </div>
                <div className='loginItemContainer'>
                    <label className="loginLabale" htmlFor="Password">Password</label>
                    <div className="inputContainer">
                        <button>{isShowPassword ? <IoEyeOff /> : <IoEye />}</button>
                        <input type="text" name="Password" />
                    </div>
                </div>
                <button className="loginBtn">Login</button>
            </form>
        </div>
    )
}

export default Login
