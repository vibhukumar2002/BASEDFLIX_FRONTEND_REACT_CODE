import React, { useContext, useState } from 'react'
import { Urlcontexttag } from './Createcontext'
import Filtermovies from './Filtermovies'

const Moviesheader = ({surl,pop,gl,gs,lu}) => {

    let {seturl}=useContext(Urlcontexttag)

    let[inp,setinp]=useState("")
    let [cleardisp,setcleardisp]=useState("none")
    let [searchdisp,setsearchdisp]=useState("")

    let handlesearchbyname= async()=>{

        // inp=inp.split(" ")
        // inp=inp.join("")

        if(inp!== '')
        {
            let x= surl+inp
        seturl(x)
        setcleardisp("")
        setsearchdisp("none")
        }

        //console.log(x)

    }

    let handlechange=(e)=>{
        setinp(e.target.value)
    }

   

    let showpopular=()=>{
        seturl(pop)
        setsearchdisp("")
        setcleardisp("none")
    }

  return (
    <div className="needpadding darkcontainer gridcentercontainer maxwidth">
        <div className="flexspacebetweencontainer">
            <button className="submitbutton needmargin" onClick={()=>showpopular()}>View Trending</button>
            <input type="text" name="searchinp" className="searchbar needmargin"  onChange={(e)=>handlechange(e)}/>
            <button className={`submitbutton needmargin ${searchdisp}`} onClick={()=>handlesearchbyname()}>Search</button>
            <button className={`submitbutton needmargin ${cleardisp}`} onClick={()=>showpopular()}>Clear Search</button>
        </div>

        <div className="flexspacebetweencontainer needmargin">
            
            <Filtermovies gl={gl} gs={gs} lu={lu} pop={pop}/>
        </div>
    </div>
  )
}

export default Moviesheader