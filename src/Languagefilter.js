import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Urlcontexttag } from './Createcontext'


const Languagefilter = ({lu,pop}) => {

    let[languagedisp,setlanguagedisp]=useState('none')
    let [res,setres]=useState([])

    let {seturl}=useContext(Urlcontexttag)
   


   let  languages=   [ {code:"en",name:"English"},
    {code:"ja",name:"Japanese"},{code:"fr",name:"french"},
    {code:"es",name:"Spanish"},{code:"af",name:"Affrikaans"},
    {code:"ab",name:"Arabic"},{code:"de",name:"German"},{code:"it",name:"Italian"},{code:"be",name:"Russian"}
    ,{code:"zh",name:"Mandarin Chinese"} ,{code:"hi",name:"Hindi"},{code:"ks",name:"Kashmiri"},{code:"ml",name:"Malayam"},{code:"ta",name:"Tamil"},
    {code:"te",name:"Telugu"},{code:"as",name:"Assamese"},{code:"bn",name:"Bengali"}
,{code:"gu",name:"Gujarati"}, {code:"or",name:"Oria"},{code:"ur",name:"Urudu"}]

 useEffect(()=>{
    setres(languages.map(ele=>{
        return(
            <button className='submitbutton needmargin' key={ele.code} id={ele.code} onClick={(e,id)=>(handleselection(e,id))}>{ele.name}</button>
        )
    }))
 },[])

 let showlanguage=(e)=>{

    if(e.target.innerHTML==='Filter By Language')
    {
        e.target.innerHTML="Close Languages"
        setlanguagedisp("")
    }
    else
    {
        e.target.innerHTML='Filter By Language'
        setlanguagedisp("none")
        seturl(pop)
    }

 }

 let handleselection=(e,id)=>{
    if (e.target.style.backgroundColor==='rgb(48, 45, 45)')
    {
        e.target.style.backgroundColor='green'
        e.target.classList.add('selectedlang')
    }
    else
    {
        e.target.style.backgroundColor='rgb(48, 45, 45)'
        e.target.classList.remove('selectedlang')
    }
 }

 let handlesearch=(e)=>{
    let elelist=document.querySelectorAll('.selectedlang')
    let arr=[]
    elelist.forEach(ele=>{
        arr.push(ele.id)
    })

    arr=arr.join("|")
    arr=lu+arr
    //console.log(arr)
    seturl(arr)
 }

  return (
    <div className='gridcentercontainer'>
        <button className={`submitbutton needmargin `} onClick={(e)=>showlanguage(e)}>Filter By Language</button>
        <div className="gridcentercontainer">
        <div className={`gridcentercontainer lightcontainer needmargin ${languagedisp} maxwidth`}>
            
            <div className='flexwrapcontainer maxwidth'>{res}</div>

            <div className="gridcentercontainer needmargin">
            <button className="submitbutton greenbutton lightcontainer" onClick={(e)=>handlesearch(e)}>Search</button>
        </div>
        </div>
        
        </div>
    </div>
  )
}

export default Languagefilter