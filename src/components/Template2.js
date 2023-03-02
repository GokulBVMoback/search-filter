import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Template.css'

const Template = () => {
    const [searchTerm,setSearchTerm]=useState("");
    const [product, setProduct]=useState("");
    const [sortValue, setSortValue]=useState("");
    const [product2,setProd]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [pageLimit]=useState(3);
    const  sortoptions=["title","product","price"];

useEffect(()=>{
    loaderProdData(0,3,0);
},[])
    
    const loaderProdData=async(start,end,increase)=>{
        return await axios
        .get('http://localhost:4000/prod?_start='+start+'&_end='+end)
        .then((res)=>setProd(res.data)).catch((err)=>console.log(err));
    };

    const handleSort= async(e)=>{
        let value=e.target.value;
        setSortValue(value);
        return await axios
        .get('http://localhost:4000/prod?_sort='+value+'&_order=asc?_start=0&_end=3')
        .then((res)=>setProd(res.data)).catch((err)=>console.log(err));
    }

    const renderPagination=()=>{
        if(currentPage==0){
            return(
                
            )
        }
    }

  return (
    <div className='templateContainer'>
            <div className='radiobutton'>
            <label>
            <input name='product' type="radio" value="bat" onClick={(Event)=>{setProduct(Event.target.value)}}/>
            Bat
          </label>
          <label>
            <input name='product' type="radio" value="ball" onClick={(Event)=>{setProduct(Event.target.value)}}/>
            Ball
          </label>
          </div>
          <div className='searchInput_Container'>

            <input id='search' type='text' placeholder='Search' onChange={(Event)=>{setSearchTerm(Event.target.value);}} />
        </div>
        <div className='template_Container'>
        {
            
            product2 
            .filter((val)=>{
                if(product=="")
                {
                    if(searchTerm == ""){
                        return val;
                    }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                    }
                }else if(val.product.toLowerCase().includes(product.toLowerCase())){
                    if(searchTerm == ""){
                        return val;
                    }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                    }
                }
            })
            .map(p=>{
                return(
                    <div className='template' key={p.id}>
                        <img src={require('../assets/'+p.image)} alt='product img' />
                        <h3>{p.title}</h3>
                        <p className='price'><del>&#2352;</del>{p.price}</p>
                    </div>
                )
            })
        }
        </div>
        <div className='sort'>
            <select style={{width:"50%", borderRadius:"2px", height:"35px"}}
            onChange={handleSort}
            value={sortValue}>
                <option>Sort by</option>
                {
                    sortoptions.map((item,index)=>(
                        <option value={item} key={index}>{item}</option>
                    ))
                }

            </select>

        </div>
    </div>
  )
}

export default Template