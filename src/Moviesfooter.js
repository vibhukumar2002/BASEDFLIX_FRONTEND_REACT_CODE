import React, { useContext, useEffect, useState } from 'react'
import {  Urlcontexttag } from './Createcontext'


const Moviesfooter = () => {

    let {pages}= useContext(Urlcontexttag)
    let {url}=useContext(Urlcontexttag)
    let {seturl}=useContext(Urlcontexttag)
    

    let [cp,setcp]= useState(Number(1))
    let [inp,setinp]=useState()
    let[mes,setmes]=useState("")
    let [idisp,setidisp]=useState("")
    let [ddisp,setddisp]=useState("")

    useEffect(()=>{
        setcp(Number(1))
        setinp(Number(1))
    },[pages])

    //&page=

    let inc=()=>{

        if(Number(cp+1)<=pages)
        {
            setcp(Number(cp+1))
            setmes("")
            setidisp("")
            setddisp("")
            let urlarr=url.split('&page=')
            let x=urlarr[0]+'&page='+Number(cp+1)
            seturl(x)
        }
        else
        {
          setmes("Page No Cant be greater than Total Pages")
          setidisp("none")
        }
            

    }

    let dec=()=>{

        if(Number(cp)>1)
        {
            setcp(Number(cp-1))
            setmes("")
            setddisp("")
            setidisp("")
            let urlarr=url.split('&page=')
            let x=urlarr[0]+'&page='+Number(cp-1)
            seturl(x)
            //console.log(x)
        }
        else
        {
            setmes("Page No Must Be Greater Than  or equal to 1")
           
                setddisp("none")
            
           
        }
    }

    let handlegoto=()=>{
        setcp(Number(inp))
        let urlarr=url.split('&page=')
            let x=urlarr[0]+'&page='+Number(inp)
            seturl(x)
    }

    let handlechange=(e)=>{
        setinp(e.target.value)
    }


  return (
    <div className="gridcentercontainer darkcontainer maxwidth needpadding needmargin">
        <div className="gridcentercontainer needmargin">

            <div className="flexspacebetweencontainer needmargin">

                <button className={`submitbutton needmargin ${ddisp}`} onClick={()=>dec()}>Previous Page</button>

                <span className="name needpadding needmargin">{cp}</span>

                <button className={`submitbutton needmargin ${idisp}`} onClick={()=>inc()}>Next Page</button>

            </div>
                <table cellPadding='15'>
                   <tbody>
                   <tr>
                        <td><label htmlFor="goto" className='name' >Enter Page you want to View : </label></td>
                        <td><input type="number" className=" searchbar" onChange={(e)=>handlechange(e)} value={inp} /></td>
                    </tr>
                   </tbody>
                </table>
                <button className="submitbutton greenbutton needmargin" onClick={()=>handlegoto()}>Go To Page {inp}</button>

            <span className="name">Total Pages : {pages} </span>
            <div className="username">{mes}</div>

        </div>

        
        
    </div>
  )
}

export default Moviesfooter