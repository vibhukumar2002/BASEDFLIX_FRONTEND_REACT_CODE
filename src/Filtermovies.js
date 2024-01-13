import React, { useContext, useState } from 'react'
import { Urlcontexttag } from './Createcontext'
import Genrefilter from './Genrefilter'
import Languagefilter from './Languagefilter'

const Filtermovies = ({gl,gs,lu,pop}) => {

    let {seturl}=useContext(Urlcontexttag)

    let[showfiltersdisp,setshowfiltersdisp]=useState("none")
    
    
    

    let showfilters=(e)=>{

        if (e.target.innerHTML==='Show Filters')
        {
            e.target.innerHTML='Close Filters'
            setshowfiltersdisp("")

        }
        else
        {
            e.target.innerHTML='Show Filters'
            setshowfiltersdisp("none")
            seturl(pop)
        }
        
    }
  return (
    <div className='gridcentercontainer'>
        <button className="submitbutton" onClick={(e)=>showfilters(e)}>Show Filters</button>
        <div className={`gridcentercontainer  ${showfiltersdisp} lightcontainer maxwidth needmargin needpadding` }>
            
            <Genrefilter gl={gl} gs={gs} />
            <span className="neemargin needpadding name">OR</span>
            <Languagefilter lu={lu} pop={pop} />
        </div>
    </div>
  )
}

export default Filtermovies