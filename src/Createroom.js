import React, { useContext, useEffect,useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import { Contexttag } from './Createcontext'

const Createroom = () => {

    let {backendurl}=useContext(Contexttag)

    let [tlist,settlist]=useState()
    let [inp,setinp]=useState({
        roomname:"",
        roomdesc:""
    })
    let{state}=useLocation()
    let userid=state.uid

    useEffect(()=>{gettopicslist()},[])

    let gettopicslist=async()=>{
       let res= await fetch(`${backendurl}/community/gettopicslist/`)
       let resdata = await res.json()
       
       if(res.status===200)
       {
        let  x=resdata.data
        //console.log(x)
        settlist(
            x.map(ele=>{
                return(
                    <option value={ele.id} className='searchbar' key={ele.id} >{ele.topicname}</option>
                )
            })
        )
       }
       else
       {
        console.error(resdata.detail)
       }

    }

    let handlecreate=async()=>{
        let selectedtopictag=document.querySelector('#selectedtopic')
        console.log(selectedtopictag.value,inp)
        console.log(userid)
        if(inp.roomname!=="")
        {

            let res= await fetch(`${backendurl}/community/createroom/${userid}/${selectedtopictag.value}/`,
            {
                method:'POST',
                headers:
                {

                    'Accept':'application/json',
                    'Content-Type':'application/Json'

                },
                body:JSON.stringify({
                    desc: inp.roomdesc ,
                    name: inp.roomname
                })
            }
            
            )

            let resdata=await res.json()

            if(res.status===200)
            {
                console.log(resdata)
                if(resdata!=='Room with same name and topic Already Exists')
                {
                    window.alert('created Succesfully')
                }
                else
                {
                    window.alert('Room with same name and topic Already Exists')
                }
            }
            else
            {
                console.error(resdata)
                window.alert('failed to create')
            }

        }
    }

    let handlechange=(e)=>{

        setinp(prev=>{
            return(
                {
                    ...prev,
                    [e.target.name] :  e.target.value
                }
            )
        })

    }

  return (

    <div>
        <Header />
        <div className="gridcentercontainer">
            <div className="gridcentercontainer needmargin needpadding darkcontainer needpadding">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="selecttopic" className='name'>Select Your Rooms Topic : </label></td>
                            <td><select className='searchbar' id='selectedtopic'>
                               { tlist}
                                </select></td>
                        </tr>
                        </tbody>
                          </table>
                    
                            <div className="gridcentercontainer needpadding">
                                
                            <div className="name needpadding">OR</div>
                           
                           <Link state={{uid:userid}}  to='/createtopic/' className="submitbutton nounderline">Create Your Own Topic</Link>
                            </div>
                        
                       <table>
                        <tbody>
                        <tr>
                            <td>
                                <label className='name' htmlFor="roomname">Room Name : </label>
                            </td>
                            <td>
                                <input type="text" name="roomname"  className="searchbar"  autoComplete='on' onChange={(e)=>handlechange(e)} value={inp.roomname}/>
                                
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label className='name' htmlFor="roomdesc">Room Description : </label>
                            </td>
                            <td>
                                <input type="text" name="roomdesc"  className="searchbar"  autoComplete='on' onChange={(e)=>handlechange(e)} value={inp.roomdesc}/>
                                
                            </td>
                        </tr>
                        </tbody>
                       </table>

                   
                <div className="gridcentercontainer needmargin needpadding">
                    <button className="submitbutton" onClick={()=>handlecreate()}>Create Room</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Createroom