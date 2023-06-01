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
} from './components'
import { useFetchData } from './utils'

export default function RewardsPoints() {
  const [isLoading, setIsLoading] = useState(true)
  const [clientPurchases, setClientPurchases] = useState([])
  const [clientMonthlyPoints, setClientMonthlyPoints] = useState([])
  const { clientId } = useParams()
  const navigate = useNavigate()

  useFetchData(
    '/purchases/client/' + clientId,
    setClientPurchases,
    () => {},
    () => setIsLoading(false)
  )

  useEffect(() => {
    const months = clientPurchases.reduce((acc, clientPurchase) => {
      const month = clientPurchase.date.substring(0, 7)
      let value = Math.floor(clientPurchase.value)
      let points = 0
      if (value > 100) {
        points += 2 * (value - 100)
        value = 100
      }
      if (value >= 50) {
        points += value - 50
      }
      acc[month] ? (acc[month] += points) : (acc[month] = points)
      return acc
    }, {})

    setClientMonthlyPoints(
      Object.keys(months)
        .sort()
        .reduce((acc, month) => [...acc, { month, points: months[month] }], [])
    )
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
