import React, { useState , useContext } from 'react'
import { useEffect } from 'react'
import Showmovies from './Showmovies'
import { Urlcontexttag } from './Createcontext'
import Moviesheader from './Moviesheader'
import Moviesfooter from './Moviesfooter'
import { Contexttag } from './Createcontext'
import { jwtDecode } from 'jwt-decode'


const Movies = () => {
    const key= `api_key=69525a4c4d3ed50bd6f7af5b199239e0`
    const base_url=`https://api.themoviedb.org/3`
    const posterbase=`https://image.tmdb.org/t/p/original`
    const popularmovies=base_url+`/discover/movie?sort_by_popularity.desc&`+key
    const searchurl=base_url+`/search/movie?`+key+'&query='
    const generelisturl=base_url+`/genre/movie/list?`+key
    const genreselectedserch=popularmovies+`&with_genres=`
    const languageurl=`https://api.themoviedb.org/3/discover/movie?${key}&with_original_language=`


    let [res,setres]=useState([])
    let[url,seturl]=useState(popularmovies)
    let [pages,setpages]=useState()
    let [fdisp,setfdisp]=useState("")
    
    
    let {backendurl}=useContext(Contexttag)
    let {tokens}=useContext(Contexttag)

    let obj={url:url,seturl:seturl,pages:pages}

   let  getmovie=async(url)=>{
    console.log("url received in getmovies ",url)
    let favsarr=[]
    if(tokens.access)
    {
        favsarr= JSON.parse(localStorage.getItem('favslist'))
        console.log(favsarr)
    }
           
            
      let  response= await fetch(url)
      let  data = await response.json()
       if (response.status===200)
       {
        setpages(data.total_pages)
        setres(data.results.map(ele=>{
            let color='green'
            let flag='Add To Favourites'
            if(ele.vote_average>5 && ele.vote_average<8)
            {
                color='orange'
            }
            else if(ele.vote_average<5)
            {
                color='red'
            }
            else
            {
              color='green'
            }
            if(tokens.access)
            {
                favsarr= JSON.parse(localStorage.getItem('favslist'))
                favsarr.forEach(fav=>{
                    if(fav.movieid===ele.id)
                    {
                        flag='Remove From Favourites'
                    }
                })
            }

            
            return(
                <Showmovies key={ele.id} pb={posterbase} pp={ele.poster_path}  t={ele.original_title}
                c={color}  r={ele.vote_average} l={ele.original_language} d={ele.release_date}  s={ele.overview}
                id={ele.id} f={flag}
                />
            )
        }))
       }
       else
       {
        console.error(data.detail)
       }
    }

    useEffect(()=>{
        getmovie(url)

    },[url])

    useEffect(()=>{
        if(pages===1)
        {
            setfdisp("none")
        }
        else
        {
            setfdisp("")
        }
        
    },[pages])

    useEffect(()=>{
        if(tokens.access)
        {
            //console.log(jwtDecode(JSON.stringify(tokens.access)).user_id)
            getfavs(jwtDecode(JSON.stringify(tokens.access)).user_id)
        }
        
    },[tokens])

    
let getfavs=async(reqid)=>{
    let response =await fetch(`${backendurl}/community/favslist/${reqid}/`)
    let data = await response.json()
    if (response.status===200)
    {

        // setfavsarr(data.map(ele=>{
        //     console.log(ele)
        //     return(ele)
           
        // }))
        localStorage.setItem('favslist',JSON.stringify(data))
        
       

    }
    else
    {
        console.error(data.detail)
    }
}


  return (
    <Urlcontexttag.Provider value={obj}  >
        <Moviesheader surl={searchurl} pop={popularmovies} gl={generelisturl} gs={genreselectedserch} lu={languageurl}/>
        <div className='flexnowrapscrollcontainer lightcontainer maxwidth needpadding'>  {res} </div>
        <div className={`gridcentercontainer ${fdisp} maxwidth`}><Moviesfooter /></div>
        
    </Urlcontexttag.Provider>
  )
}

export default Movies




// data.forEach(ele=>{
//     //             if (ele.moviename===t)
//     //             {
//     //                 setfavstext('Remove From Favourites')
//     //                 console.log('matched',ele,t)
//     //             }
//     //             else
//     //             {
//     //                 setfavstext('Add To Favourites')
//     //             }
//     //         })