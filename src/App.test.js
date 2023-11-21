import { render, screen, fireEvent, queryByAttribute, act, waitFor } from '@testing-library/react';
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
  test('Renders the BookingForm heading', async () => {

    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const setDate = jest.fn();

    await act(async () => {
      render(<BookingForm availableTime={availableTime} date={date} setDate={setDate} />);
    });
    screen.findByText("Make Your reservation");
    let headingElement = screen.getByText("Make Your reservation");
    expect(headingElement).toBeInTheDocument();
  });

  test('submitForm', async () => {
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const clear = false;
    const loading = false;
    const setDate = jest.fn();
    const submitForm = jest.fn((data) => console.log("I was called",data));
    const setClear = jest.fn();
    let dom;
    await act(async () => {
      dom = render(<BookingForm availableTime={availableTime} date={date} setDate={setDate} onSubmit={submitForm} needClear={clear} setClear={setClear} loading={loading} />);
    });
    await act(async () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dateInput = getById(dom.container, 'res-date');
      const timeInput = getById(dom.container, 'res-time');
      const guestsInput = getById(dom.container, 'guests');
      const occasionsInput = getById(dom.container, 'occasion');

      fireEvent.change(guestsInput, { target: { value: 5 } });
      fireEvent.change(timeInput, { target: { value: '13:40' } });
      fireEvent.change(occasionsInput, { target: { value: 'Birthday' } });
    });
    await act(async () => {
      const headingElement = screen.getByText("Make Your reservation");
      expect(headingElement).toBeInTheDocument();
      fireEvent.submit(headingElement);
    });
    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenLastCalledWith({ time: '13:40', guests: 5, occasion: 'Birthday', date: '2023-11-21' });
  })

  test('Form input validation', async () => {
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const clear = false;
    const loading = false;
    const setDate = jest.fn();
    const submitForm = jest.fn((data) => console.log("I was called",data));
    const setClear = jest.fn();
    let dom;
    await act(async () => {
      dom = render(<BookingForm availableTime={availableTime} date={date} setDate={setDate} onSubmit={submitForm} needClear={clear} setClear={setClear} loading={loading} />);
    });
    await act(async () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dateInput = getById(dom.container, 'res-date');
      const timeInput = getById(dom.container, 'res-time');
      const guestsInput = getById(dom.container, 'guests');
      const occasionsInput = getById(dom.container, 'occasion');

      fireEvent.change(guestsInput, { target: { value: -5 } }); // wrong value
      fireEvent.change(timeInput, { target: { value: '13:40' } });
      fireEvent.change(occasionsInput, { target: { value: 'Birthday' } });
    });
    await act(async () => {
      const headingElement = screen.getByText("Make Your reservation");
      expect(headingElement).toBeInTheDocument();
      fireEvent.submit(headingElement);
    });
    expect(submitForm).not.toHaveBeenCalled();
    // expect(submitForm).toHaveBeenLastCalledWith({ time: '13:40', guests: 5, occasion: 'Birthday', date: '2023-11-21' });
  })
});

describe("Renders the Reservations", () => {

  test('Renders the Reservations', async () => {
    const date = getTodayDateValue();
    const availableTime = initTime(['12:30', '13:40']);
    const setDate = jest.fn();
    await act(async () => {
      render(<BrowserRouter><Reservations availableTime={availableTime} date={date} setDate={setDate} /></BrowserRouter>);
    });
    const footerElement = screen.getByText("Doormate Navigation");
    expect(footerElement).toBeInTheDocument();
  })

  test('Renders the Reservations and set localstorage', async () => {
    let dom;
    await act(async () => {
      const date = getTodayDateValue();
      const availableTime = initTime(['12:30', '13:40']);
      const setDate = jest.fn();
      dom = render(<BrowserRouter><Reservations availableTime={availableTime} date={date} setDate={setDate} /></BrowserRouter>);
    });
    const getById = queryByAttribute.bind(null, 'id');
    const rangeInput = getById(dom.container, 'guests');

    act(() => {
      fireEvent.change(rangeInput, { target: { value: 5 } });
    }
    )
    expect(rangeInput.value).toBe('5');
    await act(async () => {
      const date = getTodayDateValue();
      const availableTime = initTime(['12:30', '13:40']);
      const setDate = jest.fn();
      dom = render(<BrowserRouter><Reservations availableTime={availableTime} date={date} setDate={setDate} /></BrowserRouter>);
    });
    const rangeInput1 = getById(dom.container, 'guests');
    expect(rangeInput1.value).toBe('5');
  })
  /*
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
    */
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

it("renders user data", async () => {
  const fakeUser = {    name: "Joni Baez",    age: "32",    address: "123, Charming Avenue"  };  jest.spyOn(global, "fetch").mockImplementation(() =>    Promise.resolve({      json: () => Promise.resolve(fakeUser)    })  );
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // remove the mock to ensure tests are completely isolated  global.fetch.mockRestore();});
*/
