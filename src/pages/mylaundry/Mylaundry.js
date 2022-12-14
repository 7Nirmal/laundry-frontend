import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import "./mylaundry.css"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import OrdersList from '../../components/navbar/orderslist/Orderslist';
import {API} from "../../App";

const MyLaundry = () => {

    const navigate = useNavigate();

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    const [myOrders, setMyOrders] = useState([])
    const [tabValue, setTabValue] = useState("1")

    const getUserOrders = async() => {
        fetch(`${API}/orders/userGetOrders`, {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({id: user._id})
                })
        .then((data)=> data.json())
        .then((details)=> setMyOrders(details))
    }

    useEffect(()=>{
        getUserOrders()
    }, [user])

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
    }

    console.log(myOrders)

    const activeOrders = myOrders.length > 0 && myOrders.filter((item)=>{
        return item.orderStatus !== "delivered"
    })

    const pastOrders = myOrders.length > 0 && myOrders.filter((item)=>{
        return item.orderStatus === "delivered"
    })

    console.log(activeOrders && activeOrders,)
    console.log(pastOrders && pastOrders)

  return (
    <section className='mylaundry-section'>
        <button onClick={()=>{navigate(-1)}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
        <div className='container mylaundry-wrapper'>
            <div className='mylaundry-heading'>
                <h2>My Orders</h2>
            </div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabValue}>
                            <Box>
                                <TabList onChange={handleTabChange} aria-label="lab API tabs example" centered>
                                    <Tab label="Active Orders" value="1" />
                                    <Tab label="Past Orders" value="2" />
                                </TabList>
                            </Box>        
                            <TabPanel value="1">
                                <h3>Active Orders</h3>
                                {activeOrders?.length > 0 && activeOrders.map((item)=>{
                                    return <OrdersList key={item._id} item={item} getUserOrders={getUserOrders} />
                                })}
                            </TabPanel>
                            <TabPanel value="2">
                                <h3>Past Orders</h3>
                                {pastOrders?.length > 0 && pastOrders.map((item)=>{
                                    return <OrdersList key={item._id} item={item} />
                                })}
                            </TabPanel>    
                        </TabContext>
                </Box>
        </div>
    </section>
  )
}

export default MyLaundry