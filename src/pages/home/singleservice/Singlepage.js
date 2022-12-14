import {useState, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useGlobalContext } from '../../../context/Context';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { API } from '../../../App';
import"./singlepage.css";

export function SingleService() {

    const {cart, cartDispatch, user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    const {id} = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [serviceName, setServiceName] = useState({});
    const [catServices, setCatServices] = useState([]);
    const [catDetails, setCatDetails] = useState([]);
    const [extrasList, setExtrasList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [extrasExpanded, setExtrasExpanded] = useState(false)
    const [extrasSelected, setExtrasSelected] = useState([])

    const getcatservices = async() => {
    const res = await axios.get(`${API}/services/getcateogryservices/${id}`)
    setCatServices(res.data);
    }

    const getservices = async() => {
        const res = await axios.get(`${API}/services/getservice/${id}`);
        setServiceName(res.data);
    }

    const getcatdetails = async() => {
        const res = await axios.get(`${API}/services/getallproductsbyservice/${id}`);
        setCatDetails(res.data);
    }

    const getextras = async() => {
        const res = await axios.get(`${API}/services/getextras`);
        setExtrasList(res.data);
    }
    useEffect(()=>{
        getcatservices()
        getservices();
        getcatdetails();
        getextras();
    },[]);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
  };

  const handleExtrasAccordionChange = (panel) => (event, isExpanded) => {
        setExtrasExpanded(isExpanded ? panel : false);
  };

  const addToCart = (cartItem, variant) => {
    console.log({...cartItem, extrasSelected})
    enqueueSnackbar(`${cartItem.name} added`, { variant });
    cartDispatch({type:"ADD_TO_CART", payload:{...cartItem, extrasSelected}})
    setExtrasSelected([])
  }

  const handleExtrasChange = (e, serviceName, catName, productName, variant) => {
    let extrasValue
    if(e.target.checked){
        extrasValue = extrasList.find((item)=>{
            return item.name === e.target.value
        })
        enqueueSnackbar(`${extrasValue.name} added`, { variant });
        setExtrasSelected([...extrasSelected, {...extrasValue, serviceName, catName, productName}])
    }else{
        const newValue = extrasSelected.filter((item)=>{return item.name !== e.target.value})
        setExtrasSelected(newValue)
    }
    console.log(extrasValue, "line no: 115")
  }

  console.log(extrasSelected)

console.log(catServices);
console.log(serviceName);
console.log(catDetails);
console.log(extrasList);
    return(
        <section className='singleService-section'>
<button onClick={()=>{navigate(-1)}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
        <div className='container singleService-wrapper'>
                <div className='singleService-left'>
                    <div className='service-heading'>
                        <h2>{serviceName.name}</h2>
                    </div>
                    <h3>Customize Orders</h3>
                    <div className='service-products-wrapper'>
                    {catDetails.map((item)=>{
                        const {_id, products} = item
                        const catData = catServices.find((catItem)=>{
                            return catItem._id === _id
                        })
                        return (
                        <Accordion key={_id} expanded={expanded === `panel${_id}`} className="catName-div" onChange={handleAccordionChange(`panel${_id}`)}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${_id}bh-content`}
                            id={`panel${_id}bh-header`}
                            >
                            <div className='category-div'>
                                <p className="catName-nameDiv">
                                    {item.catName}
                                </p>
                                {catData && <img src={catData.image } alt={catData.name}></img>}
                            </div>
                                    
                            </AccordionSummary>
                                <AccordionDetails>
                                {products.map((product)=>{
                                    const {_id, name, rate, serviceName, catName} = product
                                    const productName = product.name
                                    return(
                                    <div key={_id} className="product-info">
                                        <h3>{name}</h3>
                                        <div className='product-rate-div'>
                                            <p>??? {rate} / pc</p>
                                            <button className='add-product' onClick={()=>addToCart({_id, name, rate, serviceName, catName},"success")}>Add</button>
                                        </div>
                                        <div className='extras-div'>
                                            <Accordion key={product._id} expanded={extrasExpanded === `panel${product._id}`} className="extrasProd-div" onChange={handleExtrasAccordionChange(`panel${product._id}`)}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel${product._id}bh-content`}
                                                id={`panel${product._id}bh-header`}>
                                                    <h4>Add-ons</h4>
                                                </AccordionSummary>
                                            <AccordionDetails>
                                            <p style={{marginBottom:"15px"}}>would you like to add extras for your product</p>
                                            {extrasList.map((extras, index)=>{
                                                const {name, rate} = extras
                                                return(
                                                    <div key={index} className="product-info">
                                                    <div className='extras-rate-div'>
                                                        <input type="checkbox" className="form-check-input" id={extras.name+"-"+product.name} name={extras.name} value={extras.name} onChange={(e)=>handleExtrasChange(e, serviceName, catName, productName, "success")}></input>
                                                        <label htmlFor={extras.name+"-"+product.name} className="form-check-label">{extras.name} - ??? {extras.rate}</label>
                                                    </div>
                                                    </div>
                                                        )
                                                    })}
                                            </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                    )
                                })}
                                </AccordionDetails>
                        </Accordion>
                            )
                        })}
                    </div>
                </div>
                <div className='singleService-right'>
                    <div className='select-services'>
                        <button className="laundryBag-btn" onClick={()=>{navigate("/cart")}}>Your Laundry Bag <span className='cart-size'>{cart?.length} </span></button>
                    </div>
                </div>
        </div>


            </section>

    )
}