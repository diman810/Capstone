import Header from './Header'
import MainHEl from './MainHEl'
import Footer from './Footer'
import { Link } from 'react-router-dom';

function Order(props) {
    return (
        <>
            <Header />
            <MainHEl>
                <section className='form-container'>
                    <article className='page-info card-back'>
                        <h6 className='sub-title'>Order Online</h6>
                        <Link to="/" className="nav-item">
                            <button className='primary-back1 primary-btn1' >Return home</button>
                        </Link>
                    </article>
                </section>
            </MainHEl>
            <Footer />
        </>
    )
}

export default Order
