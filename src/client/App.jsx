import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStr: '',
      days: '',
      budget: '0',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange(e) {
    this.setState({ dateStr: e.target.value });
  }

  handleDaysChange(e) {
    this.setState({ days: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dateStr, days } = this.state;
    const startDate = new Date(dateStr);
    console.log('startDate: ', startDate);
    if (startDate.toString() === 'Invalid Date') {
      alert('invalid date');
    } else {
      const numberOfDays = days;
      axios.post('http://localhost:3001/getBudget', { startDate, numberOfDays })
        .then((res) => {
          this.setState({ budget: res.data });
        })
        .catch(err => console.log('err: ', err));
    }
  }

  render() {
    const {
      dateStr, days, budget,
    } = this.state;
    return (
      <div id="app">
        <h1>There&apos;s Always Money in the Banana Stand</h1>
        <input id="date" placeholder="enter date mm/dd/yyyy" type="text" value={dateStr} onChange={this.handleDateChange} />
        <input id="days" placeholder="enter days to calculate" type="text" value={days} onChange={this.handleDaysChange} />
        <button type="submit" id="get-budget" onClick={this.handleSubmit}>Get Budget</button>
        <p>
          Your Budget is: $
          {budget}
        </p>
        <img src="http://localhost:3001/bananastand" alt="frozen bananas" />
      </div>

    );
  }
}

export default App;
