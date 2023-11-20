import React from 'react'
import Header from './Header'
import Main from './MainHEl'
import Footer from './Footer'
import { Link } from 'react-router-dom';
function ConfirmedBooking() {
    return (
        <>
            <Header />
            <Main>
                <section className='form-container'>
                        <article className='booking-confirmation card-back'>
                            <h6 className='sub-title'>Congradulations!</h6>
                            <p className='lead'>Your booking is confirmed</p>
                            <Link to="/" className="nav-item">
                                <button className='primary-back1 primary-btn1' >Return home</button>
                            </Link>
                        </article>
                </section>
            </Main>
            <Footer />
        </>
    )
}

export default ConfirmedBooking