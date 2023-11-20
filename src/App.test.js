import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import { Main, reducer, initTime } from './components/Main';
import { getTodayDateValue } from './utils/getTodayDateValue';
import Reservations from './components/Reservations';
import { BrowserRouter } from 'react-router-dom';

describe("Check initTime, reducer", () => {
  test('Check initTime', () => {
    expect(initTime([])).toStrictEqual({ isSet: false, times: [] });
    expect(initTime(['12:30', '13:40'])).toStrictEqual({ isSet: true, times: ['12:30', '13:40'] });
  })
  test('Check reducer', () => {
    expect(reducer([], { type: 'set', payload: ['12:30', '13:40'] })).toStrictEqual({ isSet: true, times: ['12:30', '13:40'] });
    expect(reducer([], { type: 'reset' })).toStrictEqual({ isSet: false, times: [] });
  })

});

describe("Renders the BookingForm", () => {
  test('Renders the BookingForm heading', () => {
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const setDate = jest.fn();
    render(<BookingForm availableTime={availableTime} date={date} setDate={setDate}/>);
    const headingElement = screen.getByText("Make Your reservation");
    expect(headingElement).toBeInTheDocument();
  })
  test('submitForm', () => {
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const setDate = jest.fn();
    const submitForm = jest.fn();
    render(<BookingForm availableTime={availableTime} date={date} setDate={setDate} onSubmit={submitForm}/>);
    const headingElement = screen.getByText("Make Your reservation");
    expect(headingElement).toBeInTheDocument();
    fireEvent.submit(headingElement);
    expect(submitForm).toHaveBeenCalled();
  })
});

describe("Renders the Reservations", () => {
  test('Renders the Reservations', () => {
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const setDate = jest.fn();
    render(<BrowserRouter><Reservations availableTime={availableTime} date={date} setDate={setDate} /></BrowserRouter>);
    const footerElement = screen.getByText("Doormate Navigation");
    expect(footerElement).toBeInTheDocument();
  })
  test('Renders the Reservations and set localstorage', () => {
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const setDate = jest.fn();
    const dom = render(<BrowserRouter><Reservations availableTime={availableTime} date={date} setDate={setDate} /></BrowserRouter>);
    const getById = queryByAttribute.bind(null, 'id');
    const rangeInput = getById(dom.container, 'guests');
    fireEvent.change(rangeInput, { target: { value: 5 } });
    const footerElement = screen.getByText("Doormate Navigation");
    expect(footerElement).toBeInTheDocument();
    //    render(<BrowserRouter><Reservations availableTime={availableTime} date={date} setDate={setDate} /></BrowserRouter>);
  })
  test('Renders the Reservations and check localstorage', () => {
    console.log('Renders the Reservations after set localstorage');
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const setDate = jest.fn();
    const dom = render(<BrowserRouter><Reservations availableTime={availableTime} date={date} setDate={setDate} /></BrowserRouter>);
    const getById = queryByAttribute.bind(null, 'id');
    const rangeInput = getById(dom.container, 'guests');
    expect(rangeInput.value).toBe('5');
  })
});

/*
  test('Renders the BookingForm heading', () => {
    render(<BookingForm />);
    const headingElement = screen.getByText("Make Your reservation");
    expect(headingElement).toBeInTheDocument();
  })
  });
*/
/*
  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass

    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});

describe("BookingForm", () => {
  test('Renders the BookingForm heading', () => {
    render(<BookingForm />);
    const headingElement = screen.getByText("Make Your reservation");
    expect(headingElement).toBeInTheDocument();
  })

  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const textArea = screen.getByLabelText(/Comments:/);
    fireEvent.change(textArea, { target: { value: comment } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass

    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});
*/
