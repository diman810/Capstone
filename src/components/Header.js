import Nav from './Nav'
import logo from"../assets/Logo.svg"
function Header(props) {
    return (
      <header>
        <img src={logo} alt="Logo" height={76}px/>
        <p>Header</p>
        <Nav />
      </header>
    )
  }
  export default Header;