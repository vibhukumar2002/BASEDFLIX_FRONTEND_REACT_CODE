import React, { useContext, useEffect, useState } from 'react'
import { Contexttag } from './Createcontext'
import { Link } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const Header = () => {
    let {tokens}=useContext(Contexttag)
    let {backendurl}=useContext(Contexttag)
    // let {settokens}=useContext(Contexttag)
    let [disp,setdisp]=useState(<Link to='login/' className='username nounderline'>Login</Link>)
    
    let [name,setname]=useState("")
    let [disp2,setdisp2]=useState()
    
    useEffect(()=>{
        if (name!=="")
        {
            setdisp2( <div>
                <p className="name needmargin">Welcome @<span className='at'> {name}</span></p>
                <div className="flexcontainer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg" alt="Account Details" className="logoimg" />
                <span className='needmargin'><Link to='/account/' className='name'>View Account Details</Link></span>
                </div>
            </div>)
        }
    },[name])

    useEffect(()=>{
        if (tokens.access !==undefined)
        {
            let x=jwtDecode(tokens.access)
        //   setname(x.user_id)
        getname(x)
          
        }
    },[tokens])

    let getname= async(x)=>{

        let response=await fetch(`${backendurl}/users/`)
        let data= await response.json()
        if(response.status===200)
        {
            data.forEach(ele=>{
                if (ele.id===x.user_id)
                {
                    setname(ele.firstname)
                   
                    
                }
            })
        }
        else
        {
            console.error(data.detail)
        }

    }
    
    useEffect(()=>{
        if(tokens.access !== undefined ) 
        {
         setdisp(<Link to='/logout/' className='username nounderline'>Logout</Link>)
        }
        else
        {
            setdisp(<Link to='/login/' className='username nounderline'>Login</Link>)
        }
    },[tokens])
    
  return (
  <div className='borderbottom '>
     <div className="flexspacebetweencontainer needpadding">
      
      <div className="needmargin">
      <Link to='/' className="nameandlogocontainer nounderline">
       
       <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/CoA_bull.svg" alt="Based Flix" className="logoimg" />
       <p  className="name needmargin nounderline">Based Flix</p>
     </Link>

      </div>
      <div className="needmargin">
        
        <div className="needmargin needpadding">
        <Link to='/community' className=" name ">Go To Based Flix Communites..</Link>
        </div>

        
          
      </div>
      
      
      
   </div>

   <div className=" flexspacebetweencontainer">
   {disp2}

   <div className="marginrightless">
        {disp} 
        </div>
  
   </div>
   
  </div>
  )
}

export default Header