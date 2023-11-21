import React from 'react'
import Homepage from './Homepage'
import About from './About'
import Menu from './Menu'
import Reservations from './Reservations'
import Order from './Order'
import Login from './Login'
import ConfirmedBooking from './ConfirmedBooking'
import { Route, Routes } from 'react-router-dom';
import { getTodayDateValue } from '../utils/getTodayDateValue';
import { fetchAPI, submitAPI } from '../utils/fetch'
import { useNavigate } from "react-router-dom";

function reducer(state, action) {
    console.log('reducer', state, action);
    switch (action.type) {
        case 'set':
            return initTime(action.payload);
        case 'reset':
            return initTime([]);
        default:
            throw new Error();
    }
}

function initTime(state) {
    let isset = false;
    if (state !== undefined && state !== null && state.length !== 0) {
        isset = true;
    }
    console.log('initTime', state, isset);
    return { isSet: isset, times: state };
}

function Main() {
    // const [availableTime, setTime] = React.useState([]);
    const [availableTime, dispatch] = React.useReducer(reducer, [], initTime);
    const [date, setDate] = React.useState(getTodayDateValue());
    const [clear, setClear] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    console.log('onMain clear=',clear);
    const navigate = useNavigate();
    function submitForm(formData) {
        console.log('onSubmit', formData);
        submitAPI(formData).then((data) => {
            console.log("formSubmitted:", data);
            navigate("/confirm");
            setClear(true);
        },
            (data) => {
                console.log("reject formSubmitted:", data);
            }
        )
       // e.preventDefault();
    }
    console.log('Before reservation render', availableTime);

    React.useEffect(() => {
        console.log("before");
        setLoading(true);
        fetchAPI(date).then((data) => {
            // setTime([...data]);
            dispatch({ type: 'set', payload: [...data] })
            console.log("availableTime:", data);
            setLoading(false);
        },
            (data) => {
                dispatch({ type: 'reset' });
                console.log("reject availableTime:", data);
                setLoading(false);
            }
        )
        //    .catch((error) => console.log(error));
        console.log("after");
    }, [date]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/menu" element={<Menu />}></Route>
                <Route path="/reservations" element={<Reservations availableTime={availableTime} date={date} setDate={setDate} onSubmit={submitForm} needClear={clear} setClear={setClear} loading={loading}/>}></Route>
                <Route path="/order" element={<Order />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/confirm" element={<ConfirmedBooking />}></Route>
            </Routes>
        </>
    )
}

export default Main;
export { reducer, initTime };