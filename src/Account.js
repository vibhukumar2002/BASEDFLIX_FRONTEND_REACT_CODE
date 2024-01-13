import React, { useContext, useEffect , useState } from 'react'
import Header from './Header'
import { Contexttag } from './Createcontext'

import { Link } from 'react-router-dom'
import Showfavs from './Showfavs'
import Showroom from './Showroom'

const Account = () => {

    let {userid}=useContext(Contexttag)
    let {backendurl}=useContext(Contexttag)
    let [res,setres]=useState({})
    let [sfav,setsfav]=useState([])
    let [rlist,setrlist]=useState([])

    const posterbase=`https://image.tmdb.org/t/p/original`

    useEffect(()=>{

        getdetails()

    },[userid])

    let getdetails=async()=>{
        let response= await fetch(`${backendurl}/users/userbyid/${userid}/`)
        let data = await response.json()

        if(response.status===200)
        {
            //console.log(data)
            setres(data)
        }
        else
        {
            console.error(data.detail)
        }
    }

    let handledelete= async ()=>{

        let response= await fetch(`${backendurl}/users/deleteuser/${userid}/`,
        {
            method:'DELETE'
        }
        
        
        )
        let data= await response.json()
        if (response.status===200)
        {
            window.alert(data.message)
        }
        else
        {
            window.alert(data.detail)
        }

    }

    let getfavslist=async()=>{
        let response= await fetch(`${backendurl}/community/favslist/${userid}/`)
        let data= await response.json()
        if(response.status===200)
        {
            //console.log(data)
            // setsfav(data.map(ele=>{
            //     return(
            //         <li key={ele.id}>{ele.moviename}</li>
            //     )
            // }))
            // let iurl=`https://api.themoviedb.org/3/movie/${state.id}?api_key=69525a4c4d3ed50bd6f7af5b199239e0`

            data.forEach(ele=>{
                getmovieinfo(ele)
            })
   
        }
        else
        {
            console.error(data.detail)
        }
    }

    let getmovieinfo=async(obj)=>
    {
        //console.log(obj)
         let r= await fetch(`https://api.themoviedb.org/3/movie/${obj.movieid}?api_key=69525a4c4d3ed50bd6f7af5b199239e0`)
         let d= await r.json()
         if(r.status===200)
         {
           // console.log(d)

            let ele=d
            
                let color='green'
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
                setsfav(prev=>{
                    return([
                        ...prev,
                        <Showfavs key={ele.id} pb={posterbase} pp={ele.poster_path}  t={ele.original_title}
                        c={color}  r={ele.vote_average} l={ele.original_language} d={ele.release_date}  s={ele.overview}
                        id={ele.id}
                        />
                    ])
                }
                    
                       
                    
                )
            
         }
         else
         {
            console.error(d.detail)
         }
    }

    let handlefavsclick=(e)=>{
      //  getfavslist()
        if(e.target.innerHTML==='See Favourite Movies List')
        {
            getfavslist()
            e.target.innerHTML='Close Favs List'

        }
        else
        {
            setsfav("")
            e.target.innerHTML='See Favourite Movies List'
        }
    }

    let handleroomsclick=(e)=>{
        //  getfavslist()
          if(e.target.innerHTML==='See Rooms Hosted ')
          {
              getroomslist()
              e.target.innerHTML='Close Rooms Hosted'
  
          }
          else
          {
              setrlist([])
              e.target.innerHTML='See Rooms Hosted '
          }
      }

      let getroomslist=async()=>{
        let response=await fetch(`${backendurl}/community/usersrooms/${userid}/`)
        let data=await response.json()
        if(response.status===200)
        {
            //console.log(data)
            setrlist(data.map(ele=>{
                return(
                    <Showroom  key={ele.id}
                    name={ele.name}  rid={ele.id} roomtopic={ele.roomtopic} host={ele.host}
                    created={ele.created} updated={ele.updated} desc={ele.desc}
                    />
                )
            }))
        }
        else
        {
            console.error(data)
        }


      }

  return (
    <div>

        <Header />

        <div className="gridcentercontainer">
            <div className="needmargin gridentercontainer needpadding darkcontainer ninteypercentwidth">

                <table cellSpacing='15'>
                    <tbody>
                        <tr>
                            <td><div className="name">First Name : </div></td>
                            <td><div className="at"> {res.firstname}</div></td>
                        </tr>

                        <tr>
                            <td><div className="name">Last Name : </div></td>
                            <td><div className="at"> {res.lastname}</div></td>
                        </tr>

                        <tr>
                            <td><div className="name">Email : </div></td>
                            <td><div className="at"> {res.email}</div></td>
                        </tr>

                        <tr>
                            <td><div className="name">Date Of Birth : </div></td>
                            <td><div className="at"> {res.DOB}</div></td>
                        </tr>

                        <tr>
                            <td><div className="name">Date Of Joining : </div></td>
                            <td><div className="at"> {res.date_joined}</div></td>
                        </tr>

                        <tr>
                            <td><div className="name">Last Login : </div></td>
                            <td><div className="at"> {res.last_login}</div></td>
                        </tr>



                    
                    </tbody>


                </table>

                <div className="gridcentercontainer">
                    <button className="submitbutton" onClick={()=>handledelete()}>Delete Account</button>
                    <button className="submitbutton needmargin greenbutton" onClick={(e)=>handlefavsclick(e)}>See Favourite Movies List</button>
                    <div className="flexwrapcontainer yoverflowscrollcontainer">
                    {sfav}
                    </div>
                    <button className="submitbutton needmargin greenbutton" onClick={(e)=>handleroomsclick(e)}>See Rooms Hosted </button>
                    <div className="flexwrapcontainer yoverflowscrollcontainer">
                     {rlist}
                    </div>
                        
                
                    
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Account