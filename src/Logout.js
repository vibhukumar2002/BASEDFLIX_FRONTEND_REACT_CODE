import React, { useContext } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { Contexttag } from './Createcontext'

const Logout = () => {
    let {settokens}=useContext(Contexttag)
    

    let handlelogout=()=>{

        settokens({})
        localStorage.removeItem('authtokens')
        localStorage.removeItem('favslist')

    }
  return (
    <div>
        <Header />
        <div className="gridcentercontainer needmargin needpadding">
            <div className="gridcentercontainer needpadding needmargin darkcontainer">
                <p className="name">Are you Sure You Want to Logout</p>
                <Link to='/' className="submitbutton nounderline needmargin" onClick={()=>handlelogout()}>Logout</Link>
            </div>
        </div>
    </div>
  )
}

export default Logout