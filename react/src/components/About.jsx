import React from 'react'
import logos from '/logos.jpg'
import { Link } from 'react-scroll'
import './About.css'

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <img src={logos} alt='About us' />
                <div className='col-2'>
                    <h1 className='font-bold'>About us</h1>
                    <span className='line'></span>
                    <p>Our goal is to help you maintain your health, improve your physical and mental condition, and provide you with appropriate medical care in case of possible illnesses.</p>
                    <p className='secondary'>Our team of professionals pays great attention to treating each of our patients according to their individual needs and offering a wide range of health services.
The services we provide include specialist appointments, laboratory tests, diagnostic imaging procedures and rehabilitation programs.</p>
                    <div className='button'>
                        <a href='/login'>Make an appointment</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About
