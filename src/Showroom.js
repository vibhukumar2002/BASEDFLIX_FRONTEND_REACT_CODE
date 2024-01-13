import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Contexttag } from './Createcontext'

const Showroom = ({name,rid,roomtopic,host,created,updated,desc}) => {

    let [topic,settopic]=useState("")
    let [user,setuser]=useState("")

    let {backendurl}=useContext(Contexttag)

    let obj={
        n:name,
        id:rid,
        roomtopic:topic,
        host:user,
        c:created,
        u:updated,
        d:desc

    }

    useEffect(()=>{
        getusername()
        gettopicname()

    },[])
    let getusername=async()=>{
        let res= await fetch(`${backendurl}/users/`)
        let data= await res.json()
        if (res.status===200)
        {
          data.forEach(
              ele=>{
                  if (ele.id==host)
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

      let gettopicname=async()=>{
        let res= await fetch(`${backendurl}/community/gettopicslist/`)
        let resdata= await res.json()
        if (res.status===200)
            {
                resdata.data.forEach(ele=>{
                    if(ele.id===roomtopic)
                    {
                        settopic(ele.topicname)
                    }
                })
            }
            else
            {
                console.error(resdata.detail)
            }
      }
    
  return (
    <div>
        <div className="darkcontainer needpadding needmargin">
            <Link state={obj} to='/viewroom/' className="needmargin name">{name}</Link>
            <hr />
           <div className="needpadding">

                 <div className="needmargin">
                    <div className="name needmargin">Hosted By : <div className="at">@{user}</div></div>
                    <div className="name needmargin">About : <div className="at">{topic}</div></div>
                 </div>

                 <div className="flexcontainer needmargin">
                    <div className="name needmargin">Last Updated : <div className="at">{updated}</div></div>
                    
                 </div>

           </div>
        </div>
    </div>
  )
}

export default Showroom