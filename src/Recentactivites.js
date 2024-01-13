import React, { useContext, useEffect, useState } from 'react'
import { Communitycontexttag, Contexttag } from './Createcontext'
import Dispmess from './Dispmess'
import Showrecentactvites from './Showrecentactvites'

const Recentactivites = () => {

  let[mess,setmess]=useState()
  let [inp,setinp]=useState("")

  let {backendurl}=useContext(Contexttag)


  useEffect(()=>{
    getmesslist()
  },[])

  let getmesslist=async()=>{
    let res = await fetch(`${backendurl}/community/allmessages/`)
    let resdata= await res.json()
    if (res.status===200)
    {
      let x=resdata.data
      //console.log(x)
      setmess(
        x.map(ele=>{
         return(
             <Showrecentactvites 
             a={ele.author}
             b={ele.body}
             c={ele.created}
             u={ele.updated}
             id={ele.id}
             key={ele.id}
             r={ele.roomname}
             t={ele.threadname}
             />
         )
        })
     )
    }
    else
    {
      console.error(resdata.detail)
    }
  }

  let handlechange=(e)=>{
    setinp(e.target.value)
  }

  let handlesearch=(e)=>{
    if(e.target.innerHTML==='Search')
    {
          e.target.innerHTML='Clear Search'
          e.target.style.backgroundColor='red'
          e.target.style.color='green'
          getquerylist()
    }
    else
    {
          e.target.innerHTML='Search'
          e.target.style.backgroundColor='green'
          e.target.style.color='red'
          getmesslist()
    }
  }
  
  let getquerylist=async()=>{
      // console.log(inp)
      // setmess(inp)
      let response = await fetch(`${backendurl}/community/searchmessages/${inp}/`)
      let data= await response.json()
      if (response.status===200)
      {

       if(inp!="")
       {
        setmess(
          data.map(ele=>{
           return(
               <Showrecentactvites 
               a={ele.author}
               b={ele.body}
               c={ele.created}
               u={ele.updated}
               id={ele.id}
               key={ele.id}
               r={ele.roomname}
               t={ele.threadname}
               />
           )
          })
       )
       }

      }
      else
      {
        console.error(data.detail)
      }
  }

  return (
    <div>
    <div className="gridcentercontainer ">

      <input type="text" name="userinput"  className="searchbar needmargin" autoComplete='on' placeholder='Search Recent Comments' value={inp} onChange={(e)=>handlechange(e)}/>
      <button className="submitbutton needmargin greenbutton" onClick={(e)=>handlesearch(e)}>Search</button>

    </div>


      {mess} 
      
    </div>
  )
}

export default Recentactivites