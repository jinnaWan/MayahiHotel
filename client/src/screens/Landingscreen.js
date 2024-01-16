import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing'>
        <div className='col-md-12 text-center'>
            <h1 style={{fontSize:'130px'}}>Mayahi</h1>
            <h3>Book unique places to stay and things to do.</h3>
            <h3>WHEREVER YOU ARE.</h3>

            <Link to='/home' className='btn landingbtn btn-primary'>Explore</Link>
        </div>
    </div>
  )
}

export default Landingscreen