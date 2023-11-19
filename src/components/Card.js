import { Link } from 'react-router-dom';
import delivery from "../assets/delivery.png"
const Card = ({ title, description, imageSrc, price }) => {
    return (
        <article className="card">
            <img src={imageSrc} className="card-image" alt="Special"/>
            <div className='card-title-line'>
                <h6 className='card-title'>{title}</h6>
                <p className='price'>${price}</p>
            </div>
            <p className='card-discription primary-color1'>{description}</p>
            <div className='card-bottom-line'>
                <Link to="/order">Order a delivery</Link>
                <img src={delivery} alt="delivery" />
            </div>
        </article>
    );
};

export default Card;
