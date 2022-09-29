import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./singleorder.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { API } from '../../App';
import { useGlobalContext } from '../../context/Context';
import axios from "axios";

const Singleorder = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    console.log(id);

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    const [orderDetail, setOrderDetail] = useState();
console.log(user.token);
    const getOrderDetail =async () => {
        const res = await axios(`${API}/orders/getOrderDetail/${id}`,{"x-auth-token":user.token});
        console.log(res);
        setOrderDetail(res.data);
    }

    useEffect(()=>{
        getOrderDetail()
    },[])

    console.log(orderDetail)

  return (
    <section className='orderSuccess-section'>
        <button onClick={()=>{navigate(-1)}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
        <div className='container orderSuccess-wrapper'>
            <div className='orderSuccess-left'>
                <div className='orderSuccess-heading'>
                    <h2>Your Order Summary</h2>
                    <p>Order Id: <b>#{orderDetail?._id}</b></p>
                </div>
                <div className='orderSuccess-products-wrapper'>
                    <h3>Order Details</h3>
                    <p>Total Amount Paid: ₹ {orderDetail?.grandTotal}</p>
                    <p>Order Status: {orderDetail?.orderStatus}</p>
                    <p>Delivery Method: {orderDetail?.deliveryMethod}</p>
                    <p>Email Id: {orderDetail?.userEmail}</p>
                    <div className='order-cart-div'>
                        <h3>Cart Details</h3>
                        {orderDetail && orderDetail?.cart.map((item)=>{
                            const {qty} = item
                            return(
                                <div key={item._id} className='subtotal-item'>
                                    <p>{item.serviceName && item.serviceName} . {item.catName && item.catName}</p>
                                    <div className='product-rate-div'>
                                    <h4>{item.name} * {qty}</h4>
                                    <p>₹ {item.rate * qty}</p>
                                    </div>
                                    <p>₹ {item.rate} / pc</p>
                                    
                                    {item.extrasSelected.length > 0 && item.extrasSelected.map((item)=>{
                                        return(
                                        <div className='extras-cartRate-div' key={item._id}>
                                            <div className='extras-product'>
                                            <h4>{item.name} * {qty}</h4>
                                            <p>₹ {item.rate * qty}</p>
                                            </div>
                                            <p>₹ {item.rate} / pc</p>
                                        </div>
                                        )
                                    })}
                            
                                </div>
                            )
                        })}
                    </div>
                    <div className='checkout-pickup'>
                    <h3>Pickup Details</h3>
                    <div className='checkout-pickup-wrapper'>
                        {orderDetail?.pickupDetails.map((item, index)=>{
                            return(
                                <div key={index}>
                                    {(orderDetail?.orderStatus !== "completed" && orderDetail?.orderStatus !== "on progress" && orderDetail?.orderStatus !== "delivered" )&& <p><b>Pickup Date:</b> {new Date(parseInt(item.pickupDate)*1000).toLocaleDateString()}</p>}
                                    {(orderDetail?.orderStatus !== "completed" && orderDetail?.orderStatus !== "on progress" && orderDetail?.orderStatus !== "delivered" ) && <p><b>Pickup Time:</b> {item.pickupTime}</p>}
                                    
                                    <div className='checkout-address'>
                                        <h4>Address:</h4>
                                        <p>{item.address1}</p>
                                        <p>{item.address2}</p>
                                        <p>{item.fullAddress}</p>
                                    </div>
                                    {orderDetail?.orderStatus !== "delivered" && <p><b>Expected Delivery:</b> {item.expectedDelivery}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
                </div>
            </div>
            <div className='orderSuccess-right'>
                <div className='backTo-home'>
                    <button className="laundryBag-btn" onClick={()=>{navigate("/")}}> Go Back to Shopping </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Singleorder