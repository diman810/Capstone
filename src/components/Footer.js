import Nav from './Nav'
import logo from "../assets/logo-second.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faInstagramSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";


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
          <p>1020 West Madison Street</p>
          <p>Chicago IL 60607</p>
          <p>(312) 888-3041</p>
          <p>nospam@nofill.com</p>
        </section>
        <section className='media'>
          <h6>Social Media Links</h6>
          <a href='https://facebook.com/' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookSquare} size="2x" /><p>Facebook</p>
          </a>
          <a href='https://twitter.com/' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitterSquare} size="2x" /><p>Twitter</p>
          </a>
          <a href='https://instagram.com/' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagramSquare} size="2x" /><p>Instagram</p>
          </a>
        </section>
      </div>
    </footer>
  )
}
export default Footer;