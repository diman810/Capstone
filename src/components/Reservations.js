import Header from './Header'
import Main from './MainHEl'
import Footer from './Footer'
import BookingForm from './BookingForm'
import React from 'react'

function Reservations(props) {
  // const [availableTime, dispatch] = React.useReducer(reducer, []);
  return (
    <>
      <Header />
      <Main>
        <BookingForm {...props}/>
      </Main>
      <Footer />
    </>
  )
}

export default Reservations