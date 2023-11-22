import Header from './Header'
import MainHEl from './MainHEl'
import Footer from './Footer'
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <>
            <Header />
            <MainHEl>
                <section className='form-container'>
                    <article className='page-info card-back'>
                        <h6 className='sub-title'>Login</h6>
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
