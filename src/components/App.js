import React, { Component } from 'react';

import '../app.css';
import logo from '../logo.png';

import { getIncomeData, getBillsData, getCreditCardData } from '../methods/gSheetsData';

let doneFlag = 'NOT DONE';

class App extends Component {

  componentDidMount() {
    
    return new Promise( async (resolve, reject) => {
    
        const incomes = await getIncomeData();
        const bills = await getBillsData();
        const creditCards = await getCreditCardData();

        doneFlag = 'DONE!'
        this.forceUpdate();
    });
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <button onClick={() => this.pipelineTest()}>A Test Button</button>
            {doneFlag}
          </p>
          <span>
            Learn{' '}
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>{' '}
            and{' '}
            <a
              className="App-link"
              href="https://react-static.js.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Static
            </a>
          </span>
        </header>
      </div>
    )
  }
}

export default App
