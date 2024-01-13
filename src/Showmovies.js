import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Contexttag } from './Createcontext'
import { jwtDecode } from 'jwt-decode'


const Showmovies = ({pb,pp,t,c,r,l,d,s,id,f}) => {
    let [favsdisp,setfavsdisp]=useState("none")
    // let [favstext,setfavstext]=useState()

    let {tokens}=useContext(Contexttag)
    let {userid}=useContext(Contexttag)
    let {backendurl}=useContext(Contexttag)
    


    let obj={
        pb:pb,
        pp:pp,
        t:t,
        c:c,
        r:r,
        l:l,
        d:d,
        s:s,
        id:id

    }

    useEffect(()=>{
        if(tokens.access)
        {
            setfavsdisp("")
            
            
            
        }
        else
        {
            setfavsdisp("none")
        }
    },[tokens])

   

   
    let handleclcik=(e)=>{

        sendtofavs()
        if(e.target.innerHTML==='Add To Favourites')
        {
            
            e.target.innerHTML='Remove From Favourites'
            // e.target.style.color='green'
            // e.target.style.backgroundColor='red'
            // setfavstext('Remove From Favourites')
            //console.log(id)
        }
        else
        {
            
            e.target.innerHTML='Add To Favourites'
            // e.target.style.color='red'
            // e.target.style.backgroundColor='green'
            // setfavstext('Add To Favourites')
        }
    }

    let sendtofavs= async()=>{
        let response= await fetch(`${backendurl}/community/favs/${userid}/${id}/${t}/`,
        {
            method:'POST'
        }
        )
        let data= await response.json()
        console.log(data)

        if(response.status===200)
        {
            window.alert(data)
            
        }
        else
        {
            console.error(data.detail)
        }
        
    }

   

  return (
    
    <div className="showmoviescontainer needmargin">
        <img src={  pb+pp } alt={t} className="showmoviesimg" />
        <div className="summary needpadding">

            <div className="flexspacebetweencontainer needmargin">
                <p>{t}</p>
                <p className={`${c} needpadding `}>{r}</p>
            </div>

            <div className="flexspacebetweencontainer needmargin">
                <p>{l}</p>
                <p>{d}</p>
            </div>

            <div className="needmargin">
                {s}
                <div className='needmargin gridcentercontainer'>
                <Link to='/movieinfo' className={`submitbutton nounderline name ${c}`} state={obj}>Know More</Link>
                <div className={`${favsdisp}`}>
                <button className="submitbutton greenbutton needmargin" onClick={(e)=>handleclcik(e)}>{f}</button>
                </div>
                </div>
            </div>

            
        </div>
        
    </div>
  )
}

export default Showmovies