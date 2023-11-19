import Card from "./Card";

const specials = [
  {
    title: "Greek salad",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    getImageSrc: () => require("../assets/greek salad.jpg"),
    price: 12.99
  },
  {
    title: "Bruchetta",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    getImageSrc: () => require("../assets/brusket.jpg"),
    price: 5.99
  },
  {
    title: "Lemon Dessert",
    description:
      "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    getImageSrc: () => require("../assets/lemon dessert.jpg"),
    price: 5.00
  }
];

const Specials = () => {
  return (
    <section className="specials">
      <div className="top">
          <h2 className="sub-title">This week specials!</h2>
          <button className="primary-back2 primary-btn1" type="button">Online Menu</button>
      </div>
      <div className="special-cards">
        {specials.map((special) => {
          return (
            <Card
              key={special.title}
              title={special.title}
              description={special.description}
              imageSrc={special.getImageSrc()}
              price={special.price}
            />
          );
        })}
      </div>

    </section>
  );
};

export default Specials;
