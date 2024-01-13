import React from 'react'
import { Link } from 'react-router-dom'

const Showfavs = ({pb,pp,t,c,r,l,d,s,id}) => {

    let obj={
        pb:pb,
        pp:pp,
        t:t,
        c:c,
        r:r,
        l:l,
        d:d,
        s:s,
        id:id

    }

  return (
    <div key={id}className='needmargin'>
      <Link state={obj} to='/movieinfo/'><img src={pb+pp} alt={t} className='showmoviesimg' /></Link>
    </div>
  )
}

export default Showfavs