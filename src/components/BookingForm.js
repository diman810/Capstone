import React from 'react'
// import { useFormik } from "formik";
// import * as Yup from 'yup';

function BookingForm() {
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('17:00');
    const [guests, setGuests] = React.useState(1);
    const [occasion, setOccasion] = React.useState('Birthday');

    const getIsFormValid = () => {
        return (
            date !==''
          );
      };

    const clearForm = () => {
        setDate("")
        setTime("")
        setGuests("")
        setOccasion("")
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (getIsFormValid()) alert("Table reserved!");
        clearForm();
      };
    return (
        <section className='form-container'>
            <form className='booking-form card-back' onSubmit={handleSubmit}>
                <label htmlFor="res-date">Choose date</label>
                <input type="date" id="res-date" className='input' value={date} onChange={e=>{console.log('date.value:',e.target.value); setDate(e.target.value)}}/>
                <label htmlFor="res-time">Choose time</label>
                <select id="res-time" className='input' value={time} onChange={e=>{console.log('time.value:',e.target.value); setTime(e.target.value)}}>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input type="number" placeholder="1" min="1" max="10" id="guests" className='input' value={guests} onChange={e=>{console.log('guests.value:',e.target.value); setGuests(e.target.value)}} />
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" className='input'  value={occasion} onChange={e=>{console.log('occasion.value:',e.target.value); setOccasion(e.target.value)}}>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                <input type="submit" value="Make Your reservation" className='primary-back1 primary-btn1'/>
            </form>
        </section>
    )
}

export default BookingForm