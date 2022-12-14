import React,{useState, useEffect} from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useGlobalContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import {API} from "../../App";
import "./services.css"

const Services = () => {

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    const navigate = useNavigate();

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    const [services, setServices] = useState([])

    const adminGetServices = () => {
        fetch(`${API}/services/adminGetAllServices`, {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token}
                })
        .then((data)=> data.json())
        .then((details)=> setServices(details))
    }

    useEffect(()=>{
        adminGetServices()
    },[user])

    console.log(services)

  return (
    <section className='products-section'>
        <button onClick={()=>{navigate(-1)}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
        <div className='container products-wrapper'>
            <div className='products-heading'>
                <h1>Products</h1>
            </div>
            <div className='prodService-heading'>
                <h3>All Services</h3>
            </div>
            <div className='services-div'>
                {services.length > 0 && services.map((item)=>{
                    return(
                        <div key={item._id} className="single-services-div">
                            <p>{item.name}</p>
                            <button className="view-details" onClick={()=>{navigate(`/categories/${item._id}`)}}>view details</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Services