import React,{useState} from 'react'
import data from '../Data.json'
import './Template.css'

const Template = () => {
    const [searchTerm,setSearchTerm]=useState("");
    const [product, setProduct]=useState("");
    console.log(product);

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
            
            data
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
            .map((val)=>{
                return(
                    <div className='template' key={val.id}>
                        <img src={require('../assets/'+val.image)} alt='product img' />
                        <h3>{val.title}</h3>
                        <p className='price'><del>&#2352;</del>{val.price}</p>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default Template