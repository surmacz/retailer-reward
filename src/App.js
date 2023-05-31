import {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    async function fetchData() {
      const { installMocks } = await import('./mocks/browser');
      installMocks();

      const response = await fetch('/purchases')

      if (response.ok) {
        const data = await response.json()
        console.log('>>>', data)
      } else {
        console.error('Error while getting data. Try again!')
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    async function fetchData() {
      const { installMocks } = await import('./mocks/browser');
      installMocks();

      const response = await fetch('/purchases/client/2')

      if (response.ok) {
        const data = await response.json()
        console.log('>>>2', data)
      } else {
        console.error('Error while getting data. Try again!')
      }
    }
    fetchData();
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
