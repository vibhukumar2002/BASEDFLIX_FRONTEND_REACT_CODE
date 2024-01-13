import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Contexttag } from './Createcontext'

const Showrecentactvites = ({a,b,c,u,id,r,t}) => {

    let [user,setuser]=useState("")
    let [rname,setrname]=useState('')
    let [rdata,setrdata]=useState({})
    let [topic,settopic]=useState("")
    let [tid,settid]=useState()

    let {backendurl}=useContext(Contexttag)


    useEffect(()=>{
        getusername()
        getroomname()
        
        
    },[])

    let getroomname=async()=>{
         let response=await fetch (`${backendurl}/community/getroombyid/${r}/`)
         let data = await response.json()
         if (data)
         {
            //console.log(data)
            setrname(data.name)
       
            settid(data.roomtopic)
            setrdata(data)
            gettopicname(data.roomtopic)
            
         }
         else
         {
            console.error(data.detail)
         }
    }

    let gettopicname=async(id)=>{
        let res= await fetch(`${backendurl}/community/gettopicslist/`)
        let resdata= await res.json()
        if (res.status===200)
            {
                //console.log(resdata,id,rdata)
                resdata.data.forEach(ele=>{
                    if(ele.id===id)
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

      let obj={
        
          n:rname,
          id:rdata.id,
          roomtopic:topic,
          host:user,
          c:rdata.created,
          u:rdata.updated,
          d:rdata.desc
  
      
      }

  return (
    <div className="darkcontainer needmargin needpadding">

        <div className="name"><div className="at">@ {user} </div> said " {b} " </div>
        <hr />
        <div className="flexcontainer">
            <div className="name"><small className='needmargin'>at <Link  state={obj} to='/viewroom/' className="username"> {rname} </Link></small> <small className="needmargin">on {c}</small></div>
        </div>

    </div>
  )
}

export default Showrecentactvites