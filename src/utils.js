import { useEffect } from 'react';

export function useFetchData(url, onSuccess, onError = () => {}, onFinally = () => {}) {
  useEffect(() => {
    async function fetchData() {
      const { installMocks } = await import('./mocks/browser');
      installMocks();

      const response = await fetch(url)

      if (response.ok) {
        onSuccess(await response.json())
      } else {
        console.error('Error while getting data. Try again!')
        onError()
      }
      onFinally()
    }
    fetchData();
  }, [])
}