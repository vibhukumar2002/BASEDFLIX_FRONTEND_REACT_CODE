import React, { useContext, useEffect, useState } from 'react'

import Header from './Header'
import Reacentactivites from './Recentactivites'
import Rooms from './Rooms'
import { Communitycontexttag, Contexttag } from './Createcontext'


const Basedflixcommunites = () => {

//  let {userid}=useContext(Contexttag)
//  let {username}=useContext(Contexttag)

 
//  let gettopicnamebyid=(tid)=>{
  
//   fetch('http://127.0.0.1:8000/community/gettopicslist/').then
//   (response=>response.json()).then(resdata=>{

//     let x= resdata.data.filter(
//       ele=>{
//         return ele.id==tid
//       }
//      )
//      return x

//   }).catch(err=>console.error(err))
  
//  }
 
 
//   let obj={
//       Gettopicnamebyid:gettopicnamebyid,
//   }
 
  

  return (
    <Communitycontexttag.Provider value={{}}>

        <Header />
           {/* {userid} <br />
           {username} */}
        
        

        <div className="customgridcontainer">
          

            <div className="borderbox xoverflowscrollcontainer"><Reacentactivites/></div>

            <div className="borderbox xoverflowscrollcontainer"><Rooms/></div>
        </div>
    </Communitycontexttag.Provider>
  )
}

export default Basedflixcommunites

// {tokens.access}
//           <br />
//           {tokens.refresh}
//           <br />
//           {user.user_id}
//           <br />
//           {username.firstname}




// let [username,setusername]=useState("nologin")

//  let [uid,setuid]=useState("nologin")

//  let [obj,setobj]=useState({})


//  useEffect(()=>{
//    setuidfunc()
 

//  },[tokens])

//  useEffect(()=>{
//      setusernamefunc()
//  },[uid])

//   let getusername=async()=>{
//     let response= await fetch('http://127.0.0.1:8000/users/')
//     let data =await response.json()
//     if(response.status===200)
//     {
//       //console.log(data)
//       data.forEach(ele=>{
//         if (ele.id===uid)
//         {
//         setusername(ele.firstname)
          
          
//         }
//       })
//     }
//     else{
//       console.error(data.detail)
//     }
//   }
  
//   let setuidfunc=()=>{
//     if (tokens.access)
//   {
//     setuid(jwtDecode(tokens.access).user_id)
    

//   }
//   }

//  let setusernamefunc=()=>{
//   if(uid!=="nologin")
//      {
//       getusername()
//      }
//  }
