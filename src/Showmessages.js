import React, { useContext, useEffect, useState } from 'react'
import Dispmess from './Dispmess'
import { Contexttag } from './Createcontext'

const Showmessages = ({id}) => {

    let [mess,setmess]=useState()

    let {backendurl}=useContext(Contexttag)

    useEffect(()=>{
        getmessageslist()
    }
    ,[])

    let getmessageslist=async()=>{
        let res=await fetch(`${backendurl}/community/messagesbyroom/${id}/`)
        let resdata=await res.json()
        if (res.status===200)
        {
           // console.log(resdata.data)
            setmess(
               resdata.data.map(ele=>{
                return(
                    <Dispmess 
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
        else{
            console.error(resdata.detail)
        }
    }

  return (
    <div className='needmargin needpadding darkcontainer'>
        {mess}
    </div>
  )
}

export default Showmessages