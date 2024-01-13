import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import { Urlcontexttag } from './Createcontext'

const Genrefilter = ({gl,gs}) => {
    let[generedisp,setgeneredisp]=useState('none')
    let [res,setres]=useState([])
    let{seturl}=useContext(Urlcontexttag)
 
    useEffect(()=>{
        getgenerelist()
    },[])

    let showgenere=(e)=>{

        if (e.target.innerHTML==='Filter By Genere')
        {
            setgeneredisp("")
            e.target.innerHTML='Close Genres'
        }
        else
        {
            e.target.innerHTML='Filter By Genere'  
            setgeneredisp("none")
            seturl(gs)
        }

    }

    let getgenerelist= async()=>{
        let response =await fetch(gl)
        let data= await response.json()
        //console.log(gl)
        if(response.status===200)
        {
            console.log(data)
            setres(data.genres.map(ele=>{
                return(
                    <button className='submitbutton needmargin' id={ele.id} key={ele.id} onClick={(e)=>genereclicked(e)}>{ele.name}</button>
                )
            }))
        }
        else
        {
            console.error(data.detail)
        }
    }

    let genereclicked=(e)=>{
        if (e.target.style.backgroundColor==='rgb(48, 45, 45)')
        {
            e.target.style.backgroundColor='green'
            e.target.classList.add('selected')
        }
        else
        {
            e.target.style.backgroundColor='rgb(48, 45, 45)'
            e.target.classList.remove('selected')
        }
    }

    let handlesearch=()=>{
        let ele=document.querySelectorAll('.selected')
       let x=[]
        ele.forEach(e=>{
            x.push(e.id)
        }  
        )
        x=x.join(",")
        x=gs+x
        console.log(x)
        seturl(x)
    }
  return (
    <div className='gridcentercontainer'>
        <button className="submitbutton needmargin" onClick={(e)=>showgenere(e)}>Filter By Genere</button>
        <div className={`gridcentercontainer ${generedisp} lightcontainer`}>
           <div className="flexwrapcontainer">{res}</div>
           <div className="gridcentercontainer  maxwidth">
           <button className="submitbutton needmargin greenbutton " onClick={()=>(handlesearch())}>Search Genres</button>
           </div>
           
        </div>
       
       
        
    </div>
  )
}

export default Genrefilter