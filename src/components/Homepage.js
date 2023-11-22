import Header from './Header'
import MainHEl from './MainHEl'
import Footer from './Footer'
import Promo from './Promo'
import Specials from './Specials'
function Homepage(props) {
    return (
        <>
            <Header />
            <MainHEl>
                <Promo />
                <Specials />
            </MainHEl>
            <Footer />
        </>
    )
}
export default Homepage;