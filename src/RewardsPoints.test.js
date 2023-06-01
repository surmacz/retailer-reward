import { render, screen } from '@testing-library/react'
import RewardsPoints from './RewardsPoints'
import * as utils from './utils'

jest.mock('react-router-dom', () => ({
  useNavigate: () => {},
  useParams: () => ({ clientId: '0' }),
}))

test('renders reward points table and total caption', () => {
  jest
    .spyOn(utils, 'useFetchData')
    .mockImplementationOnce((url, onSuccess, onError, onFinally) => {
      onSuccess([
        {
          id: 1,
          clientId: 1,
          value: 30, //no reward points
          date: '2023-01-01',
          clientName: 'John Waine',
        },
        {
          id: 2,
          clientId: 1,
          value: 60.99, // 10 reward points in January
          date: '2023-01-01',
          clientName: 'John Waine',
        },
        {
          id: 3,
          clientId: 1,
          value: 120, // 90 reward points in January
          date: '2023-01-01',
          clientName: 'John Waine',
        },
        {
          id: 4,
          clientId: 1,
          value: 130, // 110 reward points in February
          date: '2023-02-01',
          clientName: 'John Waine',
        },
      ])
      onFinally()
    })
    .mockImplementation(() => {})

  render(<RewardsPoints />)

  const firstRow = screen.queryByTestId('reward-points-row-0')
  expect(firstRow).toHaveTextContent('2023-01')
  expect(firstRow).toHaveTextContent('100')

  const secondRow = screen.queryByTestId('reward-points-row-1')
  expect(secondRow).toHaveTextContent('2023-02')
  expect(secondRow).toHaveTextContent('110')

  const total = screen.queryByTestId('total')
  expect(total).toHaveTextContent('210')

  expect(screen.queryByText('Reward points for John Waine')).toBeInTheDocument()
})

test('renders loading spinner when loading data', () => {
  jest.spyOn(utils, 'useFetchData').mockImplementation(() => {})

  render(<RewardsPoints />)

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument()
  expect(screen.queryByRole('table')).not.toBeInTheDocument()
  expect(screen.queryByText('Reward points for ...')).toBeInTheDocument()
})
