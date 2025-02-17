import React, { useEffect, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Login as LoginAction } from '../../feature/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const state = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if(state.isAuthentication){
            navigate('/hotels')
        }
    },[state.isAuthentication])

    const handelShowPassword = (e) => {
        e.preventDefault()
        setIsShowPassword(prev => !prev)
    }

    const handelLogin = (e) => {
        e.preventDefault()
        dispatch(LoginAction({email: email, password: password}))
    }

    return (
        <div className='loginContainer'>
            <form onSubmit={handelLogin}>
                <div className='loginItemContainer'>
                    <label className="loginLabale" htmlFor="email">email</label>
                    <div className="inputContainer">
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='loginItemContainer'>
                    <label className="loginLabale" htmlFor="Password">Password</label>
                    <div className="inputContainer">
                        <button onClick={handelShowPassword}>{isShowPassword ? <IoEyeOff /> : <IoEye />}</button>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            name="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button className="loginBtn">Login</button>
            </form>
        </div>
    )
}

export default Login
