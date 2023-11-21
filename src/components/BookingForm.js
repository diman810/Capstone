import React from 'react'
import { getTodayDateValue } from '../utils/getTodayDateValue';
import { useFormik } from "formik";
import * as Yup from 'yup';
import parse from "date-fns/parse";

function isDateValue(date) {
    let baddate = parse('2016-61-01', 'yyyy-MM-dd', new Date())
    console.log('In isDate baddate=', baddate);
    let gooddate = parse(date, "yyyy-MM-dd", new Date());
    console.log('In isDate gooddate=', gooddate, date);
    if (gooddate instanceof Date && !isNaN(gooddate.valueOf())) {
        return true;
    } else {
        return false;
    }
}
function BookingForm(props) {
    /*
    const [time, setTime] = React.useState('');
    const [guests, setGuests] = React.useState(1);
    const [occasion, setOccasion] = React.useState('Birthday');
    const date = props.date;
    */
    const formik = useFormik({
        initialValues: {
            time: '',
            guests: 1,
            occasion: '',
            date: getTodayDateValue(),
        },
        onSubmit: (e) => {
            console.log(formData);
            props.onSubmit(e)
        },
        validationSchema: Yup.object({
            time: Yup.string().required('required').notOneOf(['Choose available time'], 'Choose time').label('time'),
            guests: Yup.number("not number").required('required').min(1).max(10).label('number of guests'),
            occasion: Yup.string().required('requied').oneOf(['Birthday', 'Anniversary'], 'Choose occasion').label('ocassion'),
            date: Yup.date().transform((value, originalValue) => {
                console.log('transform: ', value, originalValue);
                const parsedDate = (originalValue instanceof Date && !isNaN(originalValue.valueOf())) ? originalValue : parse(originalValue, "yyyy-MM-dd", new Date());
                return parsedDate;
            }).typeError('Please enter a valid date').required('required')
        }),
    });
    console.log('loading: ', props.loading);
    let availableTimeIsSet = false;
    if (props.availableTime !== undefined && props.availableTime !== null) {
        availableTimeIsSet = props.availableTime.isSet;
    }
    const date = props.date;
    const clearForm = () => {
        formik.setFieldValue('time', '');
        formik.setFieldValue('guests', 1);
        formik.setFieldValue('occasion', '');
        formik.setFieldValue('date', getTodayDateValue());
        props.setDate(getTodayDateValue());
    };
    //const formData = {date: date, time:time, guests : guests, occasion : occasion}
    const formData = { date: formik.values.date, time: formik.values.time, guests: formik.values.guests, occasion: formik.values.occasion }
    console.log('start formData:', formData, props.date, formik.values.date);
    console.log('props.availableTime:', props.availableTime);

    let strData = JSON.stringify(formData);

    React.useEffect(() => {
        console.log('Get from localstorage=', localStorage.getItem("dataKey"));
        let data = localStorage.getItem("dataKey");
        if (data !== undefined && data !== null && props.needClear !== true) {
            const parsedObject = JSON.parse(data);
            formik.setFieldValue('time', parsedObject.time);
            formik.setFieldValue('guests', Number(parsedObject.guests));
            formik.setFieldValue('occasion', parsedObject.occasion);
            formik.setFieldValue('date', parsedObject.date);
            props.setDate(parsedObject.date);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        console.log('stringify=', strData);
        localStorage.setItem('dataKey', strData);
        console.log('localstorage=', localStorage.getItem("dataKey"));
    }, [strData]);

    React.useEffect(() => {
        if (props.needClear === true) {
            console.log('props.needClear=', props.needClear);
            clearForm();
            props.setClear(false);
            console.log('After set props.needClear=', props.needClear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
    React.useEffect(() => {
        formik.setFieldValue('time', '');
        formik.setFieldTouched('time', false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    let listItems = props.availableTime.times.map(item => <option key={item}>{item}</option>);
    console.log('formik.date: ', formik.errors.date, formik.touched.date)
    console.log('formik.props:', formik.getFieldProps("date"));
    return (
        <section className='form-container'>
            <form className='booking-form card-back' onSubmit={formik.handleSubmit}>
                <h6 className='sub-title'>Table reservation</h6>
                <label htmlFor="res-date">Choose date</label>
                <input required aria-labelledby="reservation date" aria-required='true' type="date" id="res-date" className='input' value={formik.values.date} onChange={e => { console.log('date.value:', e.target.value); props.setDate(e.target.value); formik.setFieldValue('date', e.target.value, true); }} onBlur={e => { formik.setFieldTouched('date') }} />
                {formik.errors.date && formik.touched.date ? (<div className='inline-error'>{formik.errors.date}</div>)
                    : ((isDateValue(formik.values.date)&&!availableTimeIsSet&&!props.loading) ? (<div className='inline-error'>All tables reserved! Choose other date, please</div>) : null)}
                <label htmlFor="res-time">Choose time</label>
                <select aria-labelledby="reservation time" aria-required='true' id="res-time" className='input' {...formik.getFieldProps("time")}>
                    <option key='cat' value="" disabled hidden>Choose available time</option>
                    {availableTimeIsSet ? listItems : ''}
                </select>
                {formik.errors.time && formik.touched.time ? (<div className='inline-error'>{formik.errors.time}</div>) : null}
                <label htmlFor="guests">Number of guests</label>
                <input required aria-labelledby="number of guests" aria-required='true' type="number" placeholder="1" min="1" max="10" id="guests" className='input' {...formik.getFieldProps("guests")} />
                {formik.errors.guests && formik.touched.guests ? (<div className='inline-error'>{formik.errors.guests}</div>) : null}
                <label htmlFor="occasion">Occasion</label>
                <select aria-labelledby="occasion" aria-required='true' id="occasion" className='input' {...formik.getFieldProps("occasion")}>
                    <option key='cho' value="" disabled hidden>Choose occasion</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                {formik.errors.occasion && formik.touched.occasion ? (<div className='inline-error'>{formik.errors.occasion}</div>) : null}
                <input disabled={formik.isSubmitting} aria-label="Make Your reservation" type="submit" value="Make Your reservation" className='primary-back1 primary-btn1' />
            </form>
        </section>
    )
}

export default BookingForm

/*
    const getIsFormValid = () => {
        return (
            props.date !== '' && time !== ''
        );
    };
        return (
        <section className='form-container'>
            <form className='booking-form card-back' onSubmit={(e)=>{console.log(formData); props.onSubmit(e, formData)}}>
                <h6 className='sub-title'>Table reservation</h6>
                <label htmlFor="res-date">Choose date</label>
                <input required aria-labelledby="reservation date"  aria-required='true' type="date" id="res-date" className='input' value={props.date} onChange={e => { console.log('date.value:', e.target.value); props.setDate(e.target.value); }} />
                <label htmlFor="res-time">Choose time</label>
                <select aria-labelledby="reservation time" aria-required='true' id="res-time" className='input' value={time} onChange={e => { console.log('time.value:', e.target.value); setTime(e.target.value) }}>
                    <option key='cat' value="" disabled hidden>Choose available time</option>
                    {availableTimeIsSet?listItems:''}
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input required aria-labelledby="number of guests" aria-required='true' type="number" placeholder="1" min="1" max="10" id="guests" className='input' value={guests} onChange={e => { console.log('guests.value:', e.target.value); setGuests(e.target.value) }} />
                <label htmlFor="occasion">Occasion</label>
                <select aria-labelledby="occasion" aria-required='true' id="occasion" className='input' value={occasion} onChange={e => { console.log('occasion.value:', e.target.value); setOccasion(e.target.value) }}>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                <input type="submit" value="Make Your reservation" className='primary-back1 primary-btn1' />
            </form>
        </section>
    )
*/