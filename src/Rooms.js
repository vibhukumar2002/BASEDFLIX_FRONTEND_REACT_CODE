import React, { useContext,useEffect, useState } from 'react'
import { Communitycontexttag, Contexttag } from './Createcontext'
import { Link } from 'react-router-dom'
import Showroom from './Showroom'

const Rooms = () => {

  // let {Gettopicnamebyid}=useContext(Communitycontexttag)

  let [res,setres]=useState([])
  let [val,setval]=useState("")

  let [newroom,setnewroom]=useState()

  let {tokens}=useContext(Contexttag)
  let {username}=useContext(Contexttag)
  let {userid}=useContext(Contexttag)
  let {backendurl}=useContext(Contexttag)

  useEffect(()=>{

    if(tokens.access)
    {
      setnewroom(<Link state={{uname:username,uid:userid}} to='/createroom/' className="submitbutton needmargin needpadding nounderline">+ Create Room </Link>)
    }
    else
    {
      setnewroom(<Link to='/login/' className="submitbutton needmargin needpadding nounderline">+ Create Room</Link>)
    }

  },[tokens])

  useEffect( ()=>{
    getrooms()
  
  },[])

  // let x= Gettopicnamebyid(11)
  // console.log(x)

  let getrooms= async()=>{
    let response=await fetch(`${backendurl}/community/getroomslist/`)
    let resdata= await response.json()
    if (response.status==200)
    {
      //console.log(resdata.data)
      setres(
        resdata.data.map(ele=>{
          return(
          <Showroom name={ele.name}  
          rid={ele.id}
           key={ele.id} 
           roomtopic={ele.roomtopic}
           host={ele.host}
           created={ele.created}
           updated={ele.updated}
           desc={ele.desc}

           
           /> 
          )
        })
      )
    }
    else
    {
      console.error(response.detail)
    }
  }

  let handlechange=(e)=>{
    setval(e.target.value)
  }

  let handleclick=(e)=>{
    //console.log(val)
    
   if(val!=="")
   {
    if (e.target.innerHTML==='Filter')
    {
      getsearchedrooms()
      e.target.innerHTML='Clear Search'
      e.target.style.backgroundColor='red'
      e.target.style.color='green'
    }
    else
    {
      getrooms()
      e.target.innerHTML='Filter'
      e.target.style.backgroundColor='green'
      e.target.style.color='red'

    }
   }
   else
   {
    window.alert("Type Term To Search In Search Bar Before Filtering Room")
   }

  }

  let  getsearchedrooms=async()=>{
    let response=await fetch(`${backendurl}/community/searchrooms/${val}/`)
    let data =await response.json()
    if (response.status===200)
    {
      //console.log(data.length,data)
      if(data.length>0)
      {
        setres(
          data.map(ele=>{
            return(
            <Showroom name={ele.name}  
            rid={ele.id}
             key={ele.id} 
             roomtopic={ele.roomtopic}
             host={ele.host}
             created={ele.created}
             updated={ele.updated}
             desc={ele.desc}
  
             
             /> )
            })
             
             )
      }
      else{
        window.alert('No matching Rooms Found')
        getrooms()
      }
    }
    else
    {
      console.error(data.detail)
    }
  }

  return (
    <div>

    
     <div className="flexspacebetweencontainer">
     <div className="flexcontainer">
      <input type="text" name="searchinp"  className="searchbar needmargin needpadding"  
      placeholder='Filter Rooms By Name OR Description OR HostName OR Topicname ' value={val} onChange={(e)=>handlechange(e)}/>
      <button className="needmargin submitbutton greenbutton " onClick={(e)=>handleclick(e)}>Filter</button>
      </div>

      <div className=" needpadding needmargin">
      {/* <Link className="submitbutton needmargin needpadding nounderline">+ Create Room</Link> */}
        {newroom}
        
      </div>
     </div>
    

      {res}
     
    </div>
  )
}

export default Rooms