
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from "./Home";
import { Contexttag } from "./Createcontext";
import Login from './Login';
import { useState,useEffect } from 'react';
import Logout from './Logout';
import Signup from './Signup';
import Movieinfo from './Movieinfo';
import Basedflixcommunites from './Basedflixcommunites';
import { jwtDecode } from 'jwt-decode';
import Roomview from './Roomview';
import Createroom from './Createroom';
import Createtopic from './Createtopic';
import Account from './Account';




function App() {

  
  let [tokens,settokens]=useState(localStorage.getItem('authtokens') ? JSON.parse(localStorage.getItem('authtokens')):{})
  let [username,setusername]=useState('')
  let [userid,setuserid]=useState('')
 

  let getusername=async()=>{
        let response= await fetch('https://vibhukumar.pythonanywhere.com/users/')
        let data =await response.json()
        if(response.status===200)
        {
          //console.log(data)
          data.forEach(ele=>{
            if (ele.id===jwtDecode(tokens.access).user_id)
            {
             setusername(ele.firstname)
             setuserid(ele.id)
              
              
            }
          })
        }
        else{
          console.error(data.detail)
        }
      }

      useEffect (()=>{

        if(tokens.access)
        {
          getusername()
        }
       
       
      
       },[tokens])

      let obj={
        tokens:tokens,
        username:username,
        userid:userid,
        settokens:settokens,
        Getusername:getusername,
        backendurl:'https://vibhukumar.pythonanywhere.com'
      }
  
  return (
    <BrowserRouter>
     <Contexttag.Provider value={obj}>
    <Routes >
      <Route path='/' element={<Home/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/Logout' element={<Logout/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/movieinfo' element={<Movieinfo/>} />
      <Route path='/community' element={<Basedflixcommunites/>} />
      <Route path='/viewroom' element={<Roomview/>} />
      <Route path='/createroom' element={<Createroom/>} />
      <Route path='/createtopic' element={<Createtopic/>} />
      <Route path='/account' element={<Account/>} />
    </Routes>
    </Contexttag.Provider>
    </BrowserRouter>
  );
}

export default App;
