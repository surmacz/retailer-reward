import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import Purchases from './Purchases'
import * as DataLoader from './DataLoader'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

test('renders purchases table', () => {
  jest
    .spyOn(DataLoader, 'default')
    .mockImplementation(({ children, setData }) => {
      useEffect(() => {
        setData([
          {
            id: 1,
            value: 999.99,
            date: '2023-01-01',
            client: {
              id: 1,
              name: 'John Waine',
            },
          },
          {
            id: 2,
            value: 123.3,
            date: '2022-04-11',
            client: {
              id: 2,
              name: 'Tom Cruise',
            },
          },
        ])
      }, [])
      return children
    })

  render(<Purchases />)

  const table = screen.queryByRole('table')

  expect(table).toHaveTextContent('Purchase ID')
  expect(table).toHaveTextContent('999.99')
  expect(table).toHaveTextContent('1 Jan 2023')
  expect(table).toHaveTextContent('John Waine')
  expect(table).toHaveTextContent('123.30')
  expect(table).toHaveTextContent('11 Apr 2022')
  expect(table).toHaveTextContent('Tom Cruise')
})
