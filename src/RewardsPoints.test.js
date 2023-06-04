import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import RewardsPoints from './RewardsPoints'
import * as DataLoader from './DataLoader'

jest.mock('react-router-dom', () => ({
  useNavigate: () => {},
  useParams: () => ({ clientId: '1' }),
}))

test('renders reward points table and total caption', () => {
  jest
    .spyOn(DataLoader, 'default')
    .mockImplementation(({ children, setData }) => {
      useEffect(() => {
        setData([
          {
            id: 1,
            value: 30, //no reward points
            date: '2023-01-01',
            client: {
              id: 1,
              name: 'John Wayne',
            },
          },
          {
            id: 2,
            value: 60.99, // 10 reward points in January
            date: '2023-01-01',
            client: {
              id: 1,
              name: 'John Wayne',
            },
          },
          {
            id: 3,
            value: 120, // 90 reward points in January
            date: '2023-01-01',
            client: {
              id: 1,
              name: 'John Wayne',
            },
          },
          {
            id: 4,
            value: 130, // 110 reward points in February
            date: '2023-02-01',
            client: {
              id: 1,
              name: 'John Wayne',
            },
          },
        ])
      }, [])
      return children
    })

  render(<RewardsPoints />)

  const firstRow = screen.queryByTestId('reward-points-row-0')
  expect(firstRow).toHaveTextContent('Jan 2023')
  expect(firstRow).toHaveTextContent('100')

  const secondRow = screen.queryByTestId('reward-points-row-1')
  expect(secondRow).toHaveTextContent('Feb 2023')
  expect(secondRow).toHaveTextContent('110')

  const total = screen.queryByTestId('total')
  expect(total).toHaveTextContent('210')
})
