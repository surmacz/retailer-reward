import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import {
  PrimaryButton,
  Th,
  Td,
  Tr,
  Table,
  Thead,
  Tbody,
  TableContainer,
} from './components'
import DataLoader from './DataLoader'

export default function RewardPoints() {
  const [purchases, setPurchases] = useState([])
  const [pointsInMonths, setPointsInMonths] = useState([])
  const { clientId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const pointsInMonthsObj = purchases.reduce((acc, purchase) => {
      const month = purchase.date.substring(0, 7)
      const points = calculatePoints(Math.floor(purchase.value))
      acc[month] ? (acc[month] += points) : (acc[month] = points)
      return acc

      function calculatePoints(value) {
        let points = 0
        if (value > 100) {
          points += 2 * (value - 100)
          value = 100
        }
        if (value > 50) {
          points += value - 50
        }
        return points
      }
    }, {})

    setPointsInMonths(convertObjToArray(pointsInMonthsObj))

    function convertObjToArray(pointsInMonthsObj) {
      return Object.keys(pointsInMonthsObj)
        .sort()
        .reduce(
          (acc, month) => [
            ...acc,
            {
              month: new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'short',
              }).format(new Date(month + '-01')),
              points: pointsInMonthsObj[month],
            },
          ],
          []
        )
    }
  }, [purchases])

  return (
    <DataLoader
      url={'/purchases/client/' + clientId}
      setData={setPurchases}
      header={
        <>
          <PrimaryButton onClick={() => navigate(-1)}>Back</PrimaryButton>
          <h2>
            Reward points for{' '}
            {purchases.length ? purchases[0].client.name : '...'}
          </h2>
        </>
      }
    >
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th key="1">Month</Th>
              <Th key="2">Reward points</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pointsInMonths.map((pointsInMonth, i) => (
              <Tr
                key={pointsInMonth.month}
                data-testid={'reward-points-row-' + i}
              >
                <Td key="1">{pointsInMonth.month}</Td>
                <Td key="2">{pointsInMonth.points}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Total data-testid="total">
        <h3>
          Total points:{' '}
          {pointsInMonths.reduce(
            (acc, pointsInMonth) => acc + pointsInMonth.points,
            0
          )}
        </h3>
      </Total>
    </DataLoader>
  )
}

const Total = styled.div`
  padding: 0 1rem;
`
