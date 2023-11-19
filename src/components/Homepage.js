import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Promo from './Promo'
import Specials from './Specials'
function Homepage(props) {
    return (
        <>
            <Header />
            <Main>
                <Promo />
                <Specials />
            </Main>
            <Footer />
        </>
    )
}
export default Homepage;