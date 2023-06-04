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

function useFetchData(
  url,
  onSuccess,
  onError = () => {},
  onFinally = () => {}
) {
  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      const { installMocks } = await import('./api/browser')
      installMocks()

      let response
      try {
        response = await fetch(url, { signal: controller.signal })
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error(e)
          onError()
          onFinally()
        }
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

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
