import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import BookingForm from './BookingForm'

function Reservations() {
  return (
    <>
      <Header />
      <Main>
        <BookingForm />
      </Main>
      <Footer />
    </>
  )
}

export default Reservations