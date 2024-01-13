import React, { useContext, useEffect, useState } from 'react'


import Header from './Header';
import { Contexttag } from './Createcontext';
import Movies from './Movies';
import Rooms from './Rooms';
import Recentactivites from './Recentactivites';

const Home = () => {
    let {tokens}=useContext(Contexttag)
    
  return (
    <div className="">
      <Header />

      <div className="needmargin">

        

        <div className="gridcentercontainer borderbottom needmargin "><Movies /></div>

       
      </div>
      
     
    </div>
  )
}

export default Home