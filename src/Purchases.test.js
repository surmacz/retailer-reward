import { render, screen } from '@testing-library/react'
import Purchases from './Purchases'
import * as utils from './utils'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => {}),
}))

test('renders purchases table', () => {
  jest
    .spyOn(utils, 'useFetchData')
    .mockImplementationOnce((url, onSuccess, onError, onFinally) => {
      onSuccess([
        {
          id: 1,
          clientId: 1,
          value: 999.99,
          date: '2023-01-01',
          clientName: 'John Waine',
        },
        {
          id: 2,
          clientId: 2,
          value: 123.45,
          date: '2022-01-01',
          clientName: 'Tom Cruise',
        },
      ])
      onFinally()
    })
    .mockImplementation(() => {})

  render(<Purchases />)

  const table = screen.queryByRole('table')

  expect(table).toHaveTextContent('Purchase ID')
  expect(table).toHaveTextContent('999.99')
  expect(table).toHaveTextContent('2023-01-01')
  expect(table).toHaveTextContent('John Waine')
  expect(table).toHaveTextContent('123.45')
  expect(table).toHaveTextContent('2022-01-01')
  expect(table).toHaveTextContent('Tom Cruise')
})

test('renders loading spinner when loading data', () => {
  jest.spyOn(utils, 'useFetchData').mockImplementation(() => {})

  render(<Purchases />)

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument()
  expect(screen.queryByRole('table')).not.toBeInTheDocument()
})
