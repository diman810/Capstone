import React from 'react'
import { getTodayDateValue } from '../utils/getTodayDateValue';
// import { useFormik } from "formik";
// import * as Yup from 'yup';

function BookingForm(props) {
    const [time, setTime] = React.useState('');
    const [guests, setGuests] = React.useState(1);
    const [occasion, setOccasion] = React.useState('Birthday');
    const date = props.date;
    // const setDate = props.setDate;
    const clearForm = () => {
        props.setDate(getTodayDateValue())
        setTime("")
        setGuests(1)
        setOccasion("")
    };
    const formData = {date: date, time:time, guests : guests, occasion : occasion}
    console.log('start formData:',formData, props.date, date);
    console.log('props.availableTime:', props.availableTime);
    let availableTimeIsSet = false;
    if (props.availableTime!==undefined && props.availableTime!==null) {
        availableTimeIsSet = props.availableTime.isSet;
    }
    let strData = JSON.stringify(formData);

    React.useEffect(() => {
        console.log('Get from localstorage=',localStorage.getItem("dataKey"));
        let data = localStorage.getItem("dataKey");
        if (data !== undefined && data !== null && props.needClear!==true) {
            const parsedObject = JSON.parse(data);
            props.setDate(parsedObject.date);
            setTime(parsedObject.time);
            setGuests(Number(parsedObject.guests));
            setOccasion(parsedObject.occasion);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

    React.useEffect(() => {
        console.log('stringify=',strData);
        localStorage.setItem('dataKey', strData);
        console.log('localstorage=',localStorage.getItem("dataKey"));
     }, [strData]);

     React.useEffect(() => {
        if (props.needClear === true) {
            console.log('props.needClear=',props.needClear);
            clearForm();
            props.setClear(false);
            console.log('After set props.needClear=',props.needClear);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [props]);

    let listItems = props.availableTime.times.map(item => <option key={item}>{item}</option>);
/*
    const getIsFormValid = () => {
        return (
            props.date !== '' && time !== ''
        );
    };

    const clearForm = () => {
        props.setDate(getTodayDate())
        setTime("")
        setGuests("")
        setOccasion("")
    };
*/
/*
    let handleSubmit = (e) => {
        if (getIsFormValid()) {
            alert("Table reserved!");
            clearForm();
        }
        console.log('Submit',props.date,time,guests,occasion);
        e.preventDefault();
    };
    if (props.onSubmit!==undefined && props.onSubmit!==null) {
        handleSubmit = props.onSubmit;
    }
*/
    return (
        <section className='form-container'>
            <form className='booking-form card-back' onSubmit={(e)=>{console.log(formData); props.onSubmit(e, formData)}}>
                <label htmlFor="res-date">Choose date</label>
                <input aria-labelledby="reservation date"  aria-required='true' type="date" id="res-date" className='input' value={props.date} onChange={e => { console.log('date.value:', e.target.value); props.setDate(e.target.value); }} />
                <label htmlFor="res-time">Choose time</label>
                <select aria-labelledby="reservation time" aria-required='true' id="res-time" className='input' value={time} onChange={e => { console.log('time.value:', e.target.value); setTime(e.target.value) }}>
                    <option key='cat' value="" disabled hidden>Choose available time</option>
                    {availableTimeIsSet?listItems:'Time is unavailable'}
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input aria-labelledby="number of guests" aria-required='true' type="number" placeholder="1" min="1" max="10" id="guests" className='input' value={guests} onChange={e => { console.log('guests.value:', e.target.value); setGuests(e.target.value) }} />
                <label htmlFor="occasion">Occasion</label>
                <select aria-labelledby="occasion" aria-required='true' id="occasion" className='input' value={occasion} onChange={e => { console.log('occasion.value:', e.target.value); setOccasion(e.target.value) }}>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                <input type="submit" value="Make Your reservation" className='primary-back1 primary-btn1' />
            </form>
        </section>
    )
}

export default BookingForm