import React,{useState, useEffect} from 'react'
import { useGlobalContext } from '../../context/Context'
import "./laundryhome.css"
import { ServiceCard } from '../../components/navbar/servicecard/Servicecard';
import axios from "axios";
import { API } from '../../App';

export function LaundryHome() {

    const [laundryServices, setLaundryServices] = useState([])

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    console.log(user)

    const getLaundryServices = async () => {
    const res = await axios.get(`${API}/services/all-services`);
    console.log(res);
    setLaundryServices(res.data);
    }

    useEffect(()=>{
        getLaundryServices()
    },[])

    console.log(laundryServices)

  return (
    <section className='laundryhome-section'>
        <div className='container laundryhome-wrapper'>
            {laundryServices?.map((item)=>{
                const {_id} = item
                return <ServiceCard key={_id} {...item} />
            })}
        </div>
    </section>
  )
}

