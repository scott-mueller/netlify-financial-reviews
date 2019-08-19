import React, { Component } from 'react';

import '../app.css';
import logo from '../logo.png';

import { getIncomeData } from '../methods/gSheetsData';

let incomes = {
    headings: [ '' ]
};

class App extends Component {

  componentDidMount() {
    
    return new Promise( async (resolve, reject) => {
    
        incomes = await getIncomeData();
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
            {incomes.headings[1]}
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
