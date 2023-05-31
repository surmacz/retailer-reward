import {useEffect} from 'react';

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
    <div />
  );
}

export default App;
