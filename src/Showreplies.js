import React, { useContext } from 'react'
import { useEffect,useState } from 'react'
import { Contexttag } from './Createcontext'

const Showreplies = ({id,b,c,u,a}) => {

    let [user,setuser]=useState("")
    let {backendurl}=useContext(Contexttag)
    
    useEffect(()=>{
        getusername()
        
    },[])

    let getusername=async()=>{
        let res= await fetch(`${backendurl}/users/`)
        let data= await res.json()
        if (res.status===200)
        {
          data.forEach(
              ele=>{
                  if (ele.id==a)
                  {
                      setuser(ele.firstname)
                  }
              }
             )
             
        }
        else
        {
          console.error(data.detail)
        }
      }

  return (
    <div className="darkcontainer needpadding needmargin">
        <div className="name"><div className="at">{user} Replied - </div> " {b} "</div>

        <div className="flexcontainer needmargin">
            <div className="name needmargin">Replied On : <div className="at">{c}</div></div>
            <div className="name needmargin">Replied Last Updated : <div className="at">{u}</div></div>
        </div>
    </div>
  )
}

export default Showreplies