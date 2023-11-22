import Header from './Header'
import MainHEl from './MainHEl'
import Footer from './Footer'
import BookingForm from './BookingForm'
import React from 'react'

function Reservations(props) {
  // const [availableTime, dispatch] = React.useReducer(reducer, []);
  return (
    <>
      <Header />
      <MainHEl>
        <BookingForm {...props}/>
      </MainHEl>
      <Footer />
    </>
  )
}

export default Reservations