import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import DataLoader from './DataLoader'

jest.mock('./api/browser', () => ({
  installMocks: jest.fn(),
}))

beforeEach(() => {
  jest.useFakeTimers()
})

test('renders loading spinner when loading data and then its children', async () => {
  const data = [{ id: 1, date: '2020-01-01' }]
  const setData = jest.fn()
  jest.spyOn(global, 'fetch').mockImplementation(
    () =>
      new Promise((resolve) =>
        //simulating latency on fetch to render the spinner first
        setTimeout(
          () => resolve({ ok: true, json: jest.fn().mockResolvedValue(data) }),
          1000
        )
      )
  )

  await act(() => {
    render(
      <DataLoader
        url="/my-url"
        setData={setData}
        children={<div>my content</div>}
        header={<div>my header</div>}
      />
    )
  })
  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument()
  expect(screen.queryByText('my content')).not.toBeInTheDocument()

  await act(() => {
    jest.runAllTimers()
  })

  expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  expect(screen.queryByText('my content')).toBeInTheDocument()
  expect(screen.queryByText('my header')).toBeInTheDocument()

  expect(setData).toHaveBeenCalledWith(data)
})
