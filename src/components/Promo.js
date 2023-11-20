import Chicago from './Chicago'
import food from "../assets/restauranfood.jpg"
import { Link } from 'react-router-dom';
export default function Promo() {
    return (
        <div className="promo">
            <div className="overlay">
                <section className="info-rest">
                    <Chicago />
                    <Link to="/reservations" className="nav-item">
                        <button className="primary-back2 primary-btn1" type="button">Reserve a Table</button>
                    </Link>
                </section>
                <section className="info-img">
                    <img src={food} alt="Logo" width={375 + "px"} height={440 + "px"} />
                </section>
            </div>
        </div>
    )
}
