import Nav from './Nav'
import logo from "../assets/logo-second.png"
function Footer(props) {
  return (
    <footer>
      <div className='footer-container'>
        <section className='logo'>
          <img className='logo1' src={logo} alt="Logo" height={279 + "px"} />
        </section>
        <section className='menu'>
          <h6>Doormate Navigation</h6>
          <Nav />
        </section>
        <section className='contacts'>
          <h6>Contacts</h6>
          <p>Adress</p>
          <p>phone number</p>
          <p>email</p>
        </section>
        <section className='media'>
          <h6>Social Media Links</h6>
          <p>Adress</p>
          <p>phone number</p>
          <p>email</p>
        </section>
      </div>
    </footer>
  )
}
export default Footer;