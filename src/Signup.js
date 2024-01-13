import React, { useContext, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { Contexttag } from './Createcontext'

const Signup = () => {
    let {backendurl}=useContext(Contexttag)

    let [inp,setinp]=useState({
        fn:"",
        ln:"",
        email:"",
        pw:"",
        dob:""
    })

    let handlechange=(e)=>{
        setinp(prev=>{
            return(
                {
                    ...prev,
                    [e.target.name]:e.target.value
                }
            )
        })
    }

    let handlesignup=(e)=>{
        
        console.log(inp)
        createuser()
    }

    let createuser= async ()=>{

        let response= await fetch(`${backendurl}/users/signup/`,
        {
            method:'POST',
            headers:
            {
                'Accept':'aplication/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                    fn: inp.fn ,
                    ln: inp.ln ,
                    email: inp.email,
                    pw: inp.pw ,
                    dob:  inp.dob
                }
            )
        })
    
        let data= await response.json()

        if (response.status===200)
        {
            window.alert("Created Succesfully, Login to continue")
        }
        else
        {
            console.error(data.detail)
        }

    }
  return (
    <div>
        <Header />
        <div className="gridcentercontainer needmargin">
            <div className="gridcentercontainer needmargin needpadding darkcontainer">
                
                <table cellSpacing='15'>
                    <tbody>
                        <tr>
                            <td><label htmlFor="fn" className='name'>First Name :</label></td>
                            <td><input type="text" name="fn" required autoComplete='on'  className='searchbar' onChange={(e)=>handlechange(e)}/></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="ln" className='name'>Last Name :</label></td>
                            <td><input type="text" name="ln" required autoComplete='on'  className='searchbar' onChange={(e)=>handlechange(e)}/></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="email" className='name'>Email-Address :</label></td>
                            <td><input type="email" name="email" required autoComplete='on'  className='searchbar' onChange={(e)=>handlechange(e)}/></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="pw" className='name'>Choosen Password :</label></td>
                            <td><input type="password" name="pw" required autoComplete='on'  className='searchbar' onChange={(e)=>handlechange(e)}/></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="dob" className='name'> Date Of Birth :</label></td>
                            <td><input type="date" name="dob" required autoComplete='on'  className='searchbar' onChange={(e)=>handlechange(e)}/></td>
                        </tr>

                    </tbody>
                </table>
                

                <div className="gridcentercontainer needmargin">
                    <Link to='/login'  className="submitbutton nounderline needmargin" onClick={()=>handlesignup()}>Sign Up</Link>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default Signup