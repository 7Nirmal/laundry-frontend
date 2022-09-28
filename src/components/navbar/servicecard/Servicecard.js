import React from 'react'
import "./servicecard.css"
import { useNavigate } from 'react-router-dom'

export function  ServiceCard({_id, image, name}) {
const navigate = useNavigate();

  return (
    <div className='service-container'>
        <div className='service-img'>
            <img src={image} alt={name}></img>
        </div>
        <div className='service-type'>
            <h4>{name}</h4>
        </div>
        <div className='service-btn'>
            <button onClick={()=>{navigate(`/singleService/${_id}`)}}>Select Service</button>
        </div>
    </div>
  )
}

