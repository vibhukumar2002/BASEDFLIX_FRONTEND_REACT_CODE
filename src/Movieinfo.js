
import { useEffect, useState } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'


const Movieinfo = () => {
    let {state}=useLocation()

    let [tagline,settagline]=useState("")
    let [status,setstatus]=useState("")
    let [budget,setbudget]=useState("")
    let [revenue,setrevenue]=useState("")
    let [rt,setrt]=useState("")
    let [vc,setvc]=useState("")
    let[pc,setpc]=useState([])
    let [p,setp]=useState('')
    let [g,setg]=useState([])
    let [vids,setvids]=useState([])
    let [l,setl]=useState("")
    
    let iurl=`https://api.themoviedb.org/3/movie/${state.id}?api_key=69525a4c4d3ed50bd6f7af5b199239e0`
    let vurl=`https://api.themoviedb.org/3/movie/${state.id}/videos?api_key=69525a4c4d3ed50bd6f7af5b199239e0`

    useEffect(()=>{
        getidata(iurl)
        getvdata(vurl)
    },[state.id])

    let getidata =async(url)=>{

        let response = await fetch(url)

        let data = await response.json()

        if (response.status===200)
        {
           // console.log(data,state.pb+data.backdrop_path,state.pb+state.pp)
            settagline(data.tagline)
            setstatus(data.status)
            setbudget(data.budget)
            setrevenue(data.revenue)
            setpc(data.production_companies.map(ele=>{
                return(

                    <div className="companyimgcontainer ">
                    <img src={state.pb+ele.logo_path} alt={ele.name} className="companyimg" key={ele.id} />
                    
                    </div>

                    )
            })
                )
                setrt(data.runtime)
                setvc(data.vote_count)
                setp(data.popularity)

                setg(data.genres.map(ele=>{
                    return(
                        <li className='at' key={ele.id}>{ele.name}</li>
                    )
                }))

                setl(state.pb+data.backdrop_path)
        }
        else
        {
            console.error(data.detail)
        }

    }

    let getvdata =async(url)=>{

        let response = await fetch(url)

        let data = await response.json()

        if (response.status===200)
        {
            console.log(data)
            setvids(data.results.map(ele=>{
                return(
                    // <a target='blank' href={`https://www.youtube.com/watch?v=${ele.key}`} key={ele.key}>"YouTube video player"</a>
                    <iframe width="320" height="215" src={`https://www.youtube.com/embed/${ele.key}`}
                    title={ele.name} frameborder="0" key={ele.key} className='needmargin'
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen></iframe>
                    
                )
            }))
        }
        else
        {
            console.error(data.detail)
        }

    }
    
    
//   let l="https://image.tmdb.org/t/p/original/hCHVDbo6XJGj3r2i4hVjKhE0GKF.jpg"
  return (
    <div>
        <Header />
        <div  className='bg needmargin' style={
            {
                backgroundImage:`url(${l})`
            }
     }>


        
        <div className="gridcentercontainer needmargin needpadding">

            <h3 className='darkcontainer needmargin needpadding'>Scroll To View Details </h3>

        <div className=" needpadding  movieinformation flexnowrapscrollcontainer">

            <div className=" needpadding borderbox bodetails">
            <img src={state.pb+state.pp} alt={'title'} className="infoimg" />
            <span className="needmargin">
                <h1 className="">{state.t}</h1>
                <h3 className="at">" {tagline} "</h3>
            </span>
            </div>

            <div className="needmargin borderbox bodetails yoverflowscrollcontainer">
                <h1>INFO:</h1>
                <p className="name">Status: <span className="at">{status}</span></p>
                <p className="name">Summary: <span className="at">{state.s}</span></p>
            </div>
            

            <div className="needmargin borderbox bodetails">
                <h1>Box Office Details</h1>
                <ul>
                    <li><p className="name">Budget: <span className="at">{budget} $</span></p>
                <li><p className="name">Revenue: <span className="at">{revenue} $</span></p></li>
             <li><p className="name">Production Companies: <span className="at">
                      
                      <div className="flexnowrapscrollcontainer">

                    {pc}
                      
                    </div>



                
                </span></p></li>
               </li>
                </ul>
            </div>

            <div className="needmargin borderbox bodetails">
                <h1>Ratings:</h1>
                <ul>
                    <li className='name'>Ratings :  <span className="at">{state.r}</span></li>
                    <li className='name'>Popularity : <span className="at">{p}</span> </li>
                    <li className='name'>Votes Count : <span className="at">{vc}</span> </li>
                    <li className='name'>Runtime : <span className="at">{rt} Minitues</span> </li>
                    <li className='name'>Original Language : <span className="at">{state.l}</span> </li>
                    <li className='name'>Genres :
                        <ul>
                        {g}
                        </ul>
                    </li>
                    <li className='name'>Relesed On : <span className="at">{state.d}</span> </li>
                </ul>
            </div>

            <div className="needmargin borderbox bodetails gridcentercontainer yoverflowscrollcontainer needpadding">
                {vids}
            </div>

        </div>
        </div>


     </div>

     
    
        </div>
  )
}

export default Movieinfo






