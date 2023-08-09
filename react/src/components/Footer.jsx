import React from 'react'
import './Footer.css'
import logo from '/logo.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='bottom'>
                    <img src={logo} alt='logo' className='h-14'/>
                    <p className='font-semibold mt-4 mb-4 text-xl'>Healthcare Centre</p>
                    <p className="text-base">All rights reserved © 2023</p>
                    <p className="text-base">Developed by Peter Iszak</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
