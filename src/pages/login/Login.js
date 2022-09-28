import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import "./login.css"
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import {API} from "../../App";
const UserLogin = () => {

    const [singleUser,setSingleUser] = useState({email:'',password:''})

    const {user, isUserAuthenticated, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleUser({...singleUser, [name]:value})
    }

    const [show, setShow] = useState(false)

    const demoShow = {
        display: show ? 'block' : 'none'
    }

    const expandMoreStyle = {
        transform: !show ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: 'all 0.5s ease'
    }

    const demoUserLogin = (e) => {
        e.preventDefault()
        setSingleUser({email:"tester@gmail.com", password:"welcome@12345"})
    }

    const demoAdminLogin = (e) => {
        e.preventDefault()
        setSingleUser({email:"admin@gmail.com", password:"admin@123"})
    }

    const setUser = (userFromDB) => {
    userDispatch({type:"SET_USER", payload:{userFromDB}})
    }

    const handleLogin = async() => {
        try{
           const res = await axios.post(`${API}/user/login`,singleUser)

        const data = res.data;
        
        setSingleUser(data.userFromDB.username)
        console.log(singleUser)
        console.log(data)

        if(data){
            const {userFromDB} = data
            console.log(userFromDB)
            localStorage.setItem("usertoken", JSON.stringify(data.userFromDB.token))
            localStorage.setItem("user", JSON.stringify(data.userFromDB))
            setUser(userFromDB)
           navigate("/");
            setSingleUser({email:'',password:''})
            console.log("login success")
        }else{
            throw new Error(data.msg)
        }

        }

        catch(error){
            console.warn(error.toString())
        }
    }

    console.log(user)

  return (
    <section className='userLogin-section'>
        <div className='container userLogin-wrapper'>
            <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>User Login</h3>
                    <form className="form-wrapper">
                        <div className='form-control'>
                            <TextField className="userInput" type="email" placeholder="enter your email address" value={singleUser.email} onChange={handleChange} id="email" name="email" multiline variant="standard" />
                        </div>
                        <div className='form-control'>
                            {/* <TextField className="userInput" type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password" multiline variant="standard" /> */}
                            <input className="userInput passwordLogin" type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password"></input>
                        </div>
                        <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>login</Button>
                    </form>
                    <div className='demo-credentials'>
                        <div className='demo-credentials-header'>
                            <h4>Demo Credentials</h4>
                            <IconButton onClick={()=>{setShow(!show)}}>
                                <ExpandMoreIcon style={expandMoreStyle} />
                            </IconButton>
                        </div>
                        <div style={demoShow}>
                            <Button onClick={(e)=>demoUserLogin(e)}>User Login</Button>
                            <Button onClick={(e)=>demoAdminLogin(e)}>Admin Login</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
  )
}

export default UserLogin