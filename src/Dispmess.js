import React, { useState,useEffect, useContext } from 'react'
import Showreplies from './Showreplies'
import {Contexttag} from './Createcontext'
import {Link} from 'react-router-dom'

const Dispmess = ({a,b,c,u,id,r,t}) => {

    let [user,setuser]=useState("")
    let [disp,setdisp]=useState("none")
    let [reps,setreps]=useState()
    let [adddisp,setadddisp]=useState("none")
    let [inp,setinp]=useState("")
    let [prompt,setprompt]=useState()

    let {tokens} =useContext(Contexttag)
    let {userid}=useContext(Contexttag)
    let {backendurl}=useContext(Contexttag)

    useEffect(()=>{
        if(tokens.access)
        {
            setadddisp("")
        }
        else
        {
            setadddisp("none")
            setprompt(<Link to='/login/' className=' name'>You Must Log In to Add A Reply To Conversations</Link>)
        }
    },[tokens])

    useEffect(()=>{
        getusername()
        getrepslist()
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

      let handlereplyclick=(e)=>{
        if(e.target.innerHTML==='View Replies')
        {
            e.target.innerHTML='Close Replies'
            e.target.style.backgroundColor='red'
            e.target.style.color='green'
            setdisp("")
        }
        else
        {
            e.target.innerHTML='View Replies'
            e.target.style.backgroundColor='green'
            e.target.style.color='red'
            setdisp("none")
        }
      }

      let getrepslist=async()=>{

        let res=await fetch(`${backendurl}/community/getrepliesbythread/${id}/`)

        let resdata= await res.json()

        if (res.status===200)
            {

                let x=resdata.data
                setreps(
                    x.map(ele=>{
                        return(
                            <Showreplies

                            id={ele.id}
                            b={ele.body}
                            c={ele.created}
                            u={ele.updated}
                            a={ele.author}
                            key={ele.id}

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

      let handlepost=async ()=>{
           
           //http://127.0.0.1:8000/community/createreply/messageid/userid/
         if(inp!=="")
         {
            let response= await fetch(`${backendurl}/community/createreply/${id}/${userid}/`,
            {
             method:'POST',
             headers:
             {
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify(
                 {
                     body:inp
                 }
             )
            }
            )
 
            let data= await response.json()
 
            if(response.status===200)
            {
             window.alert(data.detail + ' reload page to viwe')
            }
            else
            {
             console.error(data.detail)
            }
         }
         else
         {
            window.alert('Cant Add Reply With Empty Body')
         }
      }



  return (
    <div className="lightcontainer needmargin needpadding">

        <div className="name"><span className="at">@{user}  Said - </span>" {b} "</div>

        <div className="flexcontainer needmargin needpadding">
           <div className="name needmargin">Comment Added On : <div className="at">{c}</div></div>
           <div className="name needmargin">Comment Updated On : <div className="at">{u}</div></div>
          
        </div>

        <button className="submitbutton greenbutton needmargin" onClick={(e)=>handlereplyclick(e)}>View Replies</button>

        <div className={`lightcontainer needpadding ${disp}`} >
            <div className="name">Replies : </div> <hr />
            <div className={`${adddisp}`}>
                <input type="text" name="searchinp"  className="ninteypercentwidth searchbar needmargin" 
                autoComplete='on'  placeholder='Add Your Opinion on the Comment' onChange={(e)=>handlechange(e)}/>
                <button className="needmargin submitbutton greenbutton" onClick={()=>handlepost()}>Add Reply</button>
            </div>
            {prompt}

            {reps}</div>
       
    </div>
  )
}

export default Dispmess