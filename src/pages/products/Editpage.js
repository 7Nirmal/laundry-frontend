import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import "./Editproduct.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {API} from "../../App";

const EditProduct = () => {

    const {id} = useParams()

    const [singleProduct,setSingleProduct] = useState({name:'',rate:''})

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    const navigate = useNavigate()

    const adminGetSingleProduct = () => {
      fetch(`${API}/services/adminGetProductById/${id}`)
      .then((data)=> data.json())
      .then((details)=> setSingleProduct(details))
    }

    useEffect(()=>{
          adminGetSingleProduct()
    },[user])

    console.log(singleProduct, "singleProduct")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleProduct({...singleProduct, [name]:value})
    }

    const handleEditProduct = async() => {
        try{
            const resp = await fetch(`${API}/services/adminUpdateProductById/${id}`, {
            method:'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(singleProduct)
                })

        const data = await resp.json()

        if(resp.ok){
            navigate(-1)
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
    <section className='editProduct-section'>
        <button onClick={()=>{navigate(-1)}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
        <div className='container editProduct-wrapper'>
            <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>Edit Products</h3>
                    <div className='prodCat-heading'>
                        {singleProduct && <p>{singleProduct.serviceName} . {singleProduct.catName} . {singleProduct.name}</p>}
                    </div>
                    <form className="form-wrapper">
                        <div className='form-control'>
                            <TextField className="userInput" type="name" placeholder="enter your name address" value={singleProduct.name} onChange={handleChange} id="name" name="name" multiline variant="standard" />
                        </div>
                        <div className='form-control'>
                            <TextField className="userInput" type="rate" placeholder="enter your rate" value={singleProduct.rate} onChange={handleChange} id="rate" name="rate" multiline variant="standard" />
                        </div>
                        <Button className="submitBtn" variant="contained" size="medium" onClick={handleEditProduct}>Edit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </section>
  )
}

export default EditProduct