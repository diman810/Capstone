import Nav from './Nav'
import logo from "../assets/Logo.svg"
function Header(props) {
    return (
        <header>
            <section>
                <img src={logo} alt="Logo" width={208+"px"} />
                <Nav />
            </section>
        </header>
    )
}
export default Header;