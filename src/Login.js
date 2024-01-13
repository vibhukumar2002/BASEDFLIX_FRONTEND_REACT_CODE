import React, { useContext, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { Contexttag } from './Createcontext'

const Login = () => {
    let [inp,setinp]=useState({
        em:"",
        pw:""
    })

    let {settokens}=useContext(Contexttag)
    let {backendurl}=useContext(Contexttag)

    let handlechange=(e)=>{
        setinp(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    let handlelogin= async ()=>{
        console.log(inp)
        let response= await fetch(`${backendurl}/auth/token/`,
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                    email:inp.em,
                    password:inp.pw
                }
            )
        }
        )
        let data = await response.json()
        if (response.status===200)
        {
            console.log("data",data)
            settokens(data)
            localStorage.setItem('authtokens',JSON.stringify(data))
        
        }
        else
        {
          console.error(data.detail)
        }
    }
  return (
    <div>
        <Header/>
        <div className="needmargin gridcentercontainer">
            <div className="gridcentercontainer needmargin needpadding darkcontainer">
              <form >
              <table cellSpacing='15'>
                    <tbody>
                        <tr>
                            <td><label htmlFor="em" className="name">Enter Your Email Address :</label></td>
                            <td><input type="email" name="em" autoComplete='on' className='searchbar'  onChange={(e)=>handlechange(e)} /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="pw" className="name">Enter Your Password :</label></td>
                            <td><input type="password" name="pw" autoComplete='on' className='searchbar' onChange={(e)=>handlechange(e)} /></td>
                        </tr>
                    </tbody>
                </table>

              </form>
                <div className="gridcentercontainer">
                    <Link to='/' className="submitbutton nounderline" onClick={()=>handlelogin()}>Log In</Link>
                    <span className="needmargin needmargin needpadding needpadding name">OR</span>
                    <Link to='/signup/' className="nounderline needmargin submitbutton">Sign Up</Link>
                </div>


            </div>

        </div>
    </div>
  )
}

export default Login