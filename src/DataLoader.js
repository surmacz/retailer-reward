import { useState, useEffect } from 'react'
import { Error, Loading, Main, MainHeader } from './components'

const ERROR_MESSAGE = 'Error while getting data. Try again!'

export default function DataLoader({ url, setData, children, header }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useFetchData(
    url,
    setData,
    () => setIsError(true),
    () => setIsLoading(false)
  )

  return (
    <Main>
      <MainHeader>{header}</MainHeader>
      {isLoading ? (
        <Loading data-testid="loading-spinner" />
      ) : isError ? (
        <Error>{ERROR_MESSAGE}</Error>
      ) : (
        children
      )}
    </Main>
  )
}

export function useFetchData(
  url,
  onSuccess,
  onError = () => {},
  onFinally = () => {}
) {
  console.log('>>>>')
  useEffect(() => {
    async function fetchData() {
      const { installMocks } = await import('./mocks/browser')
      installMocks()

      let response
      try {
        response = await fetch(url)
      } catch {
        console.error(ERROR_MESSAGE)
        onError()
        onFinally()
        return
      }

      if (response.ok) {
        onSuccess(await response.json())
      } else {
        console.error(ERROR_MESSAGE)
        onError()
      }
      onFinally()
    }
    fetchData()
  }, [])
}
