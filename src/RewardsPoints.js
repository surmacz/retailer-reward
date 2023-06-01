import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Loading,
  PrimaryButton,
  Main,
  MainHeader,
  Th,
  Td,
  Tr,
  Table,
  Thead,
  Tbody,
  TableContainer,
  Error,
} from './components'
import { useFetchData } from './utils'

export default function RewardsPoints() {
  const [clientPurchases, setClientPurchases] = useState([])
  const [clientMonthlyPoints, setClientMonthlyPoints] = useState([])
  const { clientId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  useFetchData(
    '/purchases/client/' + clientId,
    setClientPurchases,
    () => setIsError(true),
    () => setIsLoading(false)
  )

  useEffect(() => {
    const monthsWithPoints = clientPurchases.reduce((acc, clientPurchase) => {
      const month = clientPurchase.date.substring(0, 7)
      const points = calculatePoints(Math.floor(clientPurchase.value))
      acc[month] ? (acc[month] += points) : (acc[month] = points)
      return acc

      function calculatePoints(value) {
        let points = 0
        if (value > 100) {
          points += 2 * (value - 100)
          value = 100
        }
        if (value >= 50) {
          points += value - 50
        }
        return points
      }
    }, {})

    setClientMonthlyPoints(convertObjToArray(monthsWithPoints))

    function convertObjToArray(monthsWithPoints) {
      return Object.keys(monthsWithPoints)
        .sort()
        .reduce(
          (acc, month) => [...acc, { month, points: monthsWithPoints[month] }],
          []
        )
    }
  }, [clientPurchases])

  return (
    <Main>
      <MainHeader>
        <PrimaryButton onClick={() => navigate(-1)}>Back</PrimaryButton>
        <h2>
          Reward points for{' '}
          {isLoading || !clientPurchases.length
            ? '...'
            : clientPurchases[0].clientName}
        </h2>
      </MainHeader>
      {isLoading ? (
        <Loading data-testid="loading-spinner" />
      ) : isError ? (
        <Error>Error while getting data. Try again!</Error>
      ) : (
        <>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th key="1">Month</Th>
                  <Th key="2">Reward points</Th>
                </Tr>
              </Thead>
              <Tbody>
                {clientMonthlyPoints.map((clientMonthlyPoint, i) => (
                  <Tr
                    key={clientMonthlyPoint.month}
                    data-testid={'reward-points-row-' + i}
                  >
                    <Td key="1">{clientMonthlyPoint.month}</Td>
                    <Td key="2">{clientMonthlyPoint.points}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Total data-testid="total">
            <h3>
              Total points:{' '}
              {clientMonthlyPoints.reduce(
                (acc, clientMonthlyPoints) => acc + clientMonthlyPoints.points,
                0
              )}
            </h3>
          </Total>
        </>
      )}
    </Main>
  )
}

const Total = styled.div`
  padding: 0 1rem;
`
