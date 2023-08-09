import React, { useRef, useState } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {

    const form = useRef();
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState("");
    let send = true;

    const sendEmail = (e) => {
        if (send) {
            send = false;
            e.preventDefault();
            setDisabled(true);
            setMessage("Sending message...");

            emailjs.sendForm('service_nx2twmi', 'template_hytr6tr', form.current, '7RvRiJyTmfqCFnocI')
                .then(() => {
                    setMessage("Thank you for your inquiry, we will reply to you soon!");
                    setDisabled(false);
                    send = true;
                }, (error) => {
                    console.log(error.text);
                    setMessage("An error occurred while sending. Please try again later or contact us by phone or email!");
                    setDisabled(false);
                    send = true;
                });
        }
    };

    return (
        <div className='contact' id='contact'>
            <div className='background'>
                <div className="content">
                    <h1 className='font-bold'>Contact</h1>
                    <span className='line'></span>
                    <p>Would you like information about our services?</p>
                    <p>Not sure which treatment to choose?</p>
                    <p>Contact us!</p>

                    <form ref={form} onSubmit={sendEmail}>
                        <label>Name</label>
                        <input className="bg-gray-100" type="text" name="name" placeholder="Name" required />
                        <label>E-mail address</label>
                        <input className="bg-gray-100" type="text" name="email" placeholder="E-mail address" required />
                        <label>Message</label>
                        <textarea className="bg-gray-100" name="message" placeholder="Message" required></textarea>
                        <input disabled={disabled} className="button mb-0" type="submit" value="Send" />
                        {message ?
                            <span className='text-center mt-5 font-semibold'>
                                {message}
                            </span> : null
                        }
                    </form>

                    <p className='mb-3'>Contact details:</p>
                    <div className='info'>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <a href="mailto:kozpontegeszsegugyi@gmail.com" className='pl-2 pr-0 py-0'>kozpontegeszsegugyi@gmail.com</a>
                        </div>
                        <div className='phone'>
                            <div>
                                <FontAwesomeIcon icon={faPhone} />
                                <a href="tel:06123456789" className='pl-2 pr-0 py-0'>+36123456789</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
