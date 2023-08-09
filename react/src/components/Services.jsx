import React from 'react'
import szakorvosi from './images/szakorvosi.jpg'
import borgyogyaszat from './images/borgyogyaszat.jpg'
import eletmod from './images/eletmod.jpg'
import gyermekgyogyaszat from './images/gyermekgyogyaszat.jpg'
import gyogytorna from './images/gyogytorna.jpg'
import laborvizsgalat from './images/laborvizsgalat.jpg'
import terapia from './images/terapia.jpg'
import ultrahang from './images/ultrahang.jpg'
import './Services.css'

const Services = () => {
    return (
        <div className='services' id='services'>
            <div className='container'>
                <h1 className='font-bold'>Services</h1>
                <span className='line'></span>
                <div className='content'>
                    <div className='card'>
                        <img src={szakorvosi} alt="Examination" />
                        <div className="details">
                            <h2>Medical examinations</h2>
                            <p>With the help of the professional examinations, you can get a comprehensive picture of the condition of the given case and possible solutions.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={borgyogyaszat} alt="Dermatology examination" />
                        <div className="details">
                            <h2>Dermatology examination</h2>
                            <p>In case of skin problems, we identify the cause of the problem with the help of our experienced dermatologists and recommend appropriate treatment.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={terapia} alt="Special treatments and therapies" />
                        <div className="details">
                            <h2>Special treatments and therapies</h2>
                            <p>During treatments, our nurses provide high-quality care to help you maintain your health and improve your well-being.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={gyermekgyogyaszat} alt="Pediatrics" />
                        <div className="details">
                            <h2>Pediatrics</h2>
                            <p>Our pediatricians help maintain health and treat disorders from newborn age.</p>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='card'>
                        <img src={gyogytorna} alt="Medical gymnastics" />
                        <div className="details">
                            <h2>Physiotherapy and<br />massage</h2>
                            <p>With the help of our physiotherapists and masseurs, you can improve your locomotor functions and relieve your pain.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={eletmod} alt="Lifestyle counseling" />
                        <div className="details">
                            <h2>Lifestyle counseling</h2>
                            <p>Our dietitian will help you to feel better in your skin, to be more energetic and healthier.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={laborvizsgalat} alt="Laboratory tests" />
                        <div className="details">
                            <h2>Laboratory tests</h2>
                            <p>During laboratory tests, we can obtain a lot of information about our body, so we have the opportunity to recognize various diseases.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={ultrahang} alt="3d nyomtató beállítás javítás" />
                        <div className="details">
                            <h2>Ultrasound and<br />x-ray examinations</h2>
                            <p>With modern imaging procedures, we painlessly assess the patient's medical condition.</p>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <a href='/login' className='button'>Make an appointment</a>
                </div>


            </div>
        </div>
    )
}

export default Services
