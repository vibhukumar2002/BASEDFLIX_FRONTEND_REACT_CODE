import React, { useContext, useState,useEffect } from 'react'
import Header from './Header'
import { Link, useLocation } from 'react-router-dom'
import Showmessages from './Showmessages'
import { Contexttag } from './Createcontext'

const Roomview = () => {

    let {state}=useLocation()
    let {tokens}=useContext(Contexttag)
    let {userid}=useContext(Contexttag)
    let {backendurl}=useContext(Contexttag)


    useEffect(()=>{
      if(tokens.access)
      {
        setdisp("")
      }
      else
      {
        setdisp("none")
        setmes(<h3>
          <i><Link to='/login/' className='name needmargin'>Login To Join The Conversation</Link></i>
        </h3>
          )
      }
    },[tokens])

    let [inp,setinp]=useState("")
    
    let [disp,setdisp]=useState('none')

    let [mes,setmes]=useState()


    let handlechange=(e)=>{
      setinp(e.target.value)
    }

    let handlepost= async ()=>{
         //console.log(inp)
        //  http://127.0.0.1:8000/community/newmessage/room/user/
        
        if (inp!=="")
        {
          let response = await fetch(`${backendurl}/community/newmessage/${state.id}/${userid}/`,
          {
            method:'POST',
            headers:
            {
              'Accept':'application/json',
              'Content-Type':'allication/json'
            },
            body:JSON.stringify({
              body:inp
            })
            
          }
          )
          let responsedata= await response.json()

          if(response.status===200)
          {
            let x= responsedata.data
            window.alert(x+" reload to view")
          }
          else
          {
            console.error(responsedata.detail)
          }
        }
        else
        {
          window.alert('Canot Post Comment With Empty Body')
        }

    }
    
    
    //console.log(state)
    
  return (
    <div className=''>
        <Header/>
        
      <div className="darkcontainer">
          <div className="darkcontainer  needmargin">
 
<h1 className='needmargin needpadding borderbottom'>{state.n}</h1>
   <hr />
<div className="needmargin needpadding">
    <div className="name needmargin">Hosted By <div className="at">@ {state.host}</div></div>
    <div className="name needmargin">About Topic : <div className="at"> {state.roomtopic}</div></div>
</div>

<div className="needmargin">
    <div className="name needmargin needpadding darkcontainer">Description <div className="at"> {state.d}</div></div>
    
</div>

<div className="needpadding flexcontainer">

<div className="name needmargin">Created On : <div className="at"> {state.c}</div></div>
<div className="name needmargin">Updated On : <div className="at"> {state.u}</div></div>

</div>

</div>

<h2 className=" needmargin darkcontainer">Conversations:</h2>
<div className={`${disp} `}>
<input type="text" name="addmessage" autoComplete='on' className="needmargin searchbar ninteypercentwidth needpadding" placeholder='Add Your Toughts.....'
onChange={(e)=>handlechange(e)}  value={inp}/>
<button className="submitbutton needmargin nounderline" onClick={()=>handlepost()} >Post</button>

</div>
{mes}
<br />
<Showmessages id={state.id}/></div>
        
        </div>
  )
}

export default Roomview