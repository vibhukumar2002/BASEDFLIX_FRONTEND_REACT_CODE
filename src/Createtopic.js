import React, { useContext, useState } from 'react'
import Header from './Header'
import { Contexttag } from './Createcontext'

const Createtopic = () => {

    let [inp,setinp]=useState("")
    let {backendurl} = useContext(Contexttag)

    let handlechange=(e)=>{
        setinp(e.target.value)
    }

    let addtopic=async()=>{

        //console.log(inp)
        if(inp!=="")
        {
            let response=await fetch (`${backendurl}/community/createnewtopic/${inp}/`,
            {
                method:'POST',
                headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            let data = await response.json()
            if (response.status===200)
            {
                //console.log(data)
                if(data.detail)
                {
                    window.alert(data.detail)
                }
                else
                {
                    window.alert("Topic Added Succesfully")
                }
            }
            else
            {
                console.error(data.detail)
            }
        }
    }

  return (
    <div>
        <Header />
        <div className="gridcentercontainer">
            <div className="gridcentercontainer darkcontainer needmargin needpadding">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="userstopic" className="name">Enter Your Topic Name</label>
                                
                            </td>
                            <td><input type="text" name="userstopic" className='searchbar' autoComplete='on' onChange={(e)=>handlechange(e)} value={inp}/></td>
                        </tr>
                    </tbody>
                </table>
                <div className="gridcentercontainer">
                    <button className="submitbutton" onClick={()=>addtopic()}>Add Topic</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Createtopic