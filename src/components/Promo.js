import Chicago from './Chicago'
import food from "../assets/restauranfood.jpg"
export default function Promo() {
    return (
        <div className="promo">
            <div className="overlay">
                <section className="info-rest">
                    <Chicago />
                    <button className="primary-back2 primary-btn1" type="button">Reserve a Table</button>
                </section>
                <section className="info-img">
                <img src={food} alt="Logo" width={375+"px"} height={440+"px"}/>
                </section>
            </div>
        </div>
    )
}
