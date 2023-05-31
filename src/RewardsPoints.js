import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
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
} from './styled-components'

export default function RewardsPoints() {
  const [isLoading, setIsLoading] = useState(true)
  const [clientPurchases, setClientPurchases] = useState([])
  const [clientMonthlyPoints, setClientMonthlyPoints] = useState([])
  const { clientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const { installMocks } = await import('./mocks/browser');
      installMocks();

      const response = await fetch('/purchases/client/'+clientId)

      if (response.ok) {
        setClientPurchases(await response.json())
      } else {
        console.error('Error while getting data. Try again!')
      }
      setIsLoading(false)
    }
    fetchData();
  }, [])

  useEffect(() => {
    const months = clientPurchases.reduce((acc, clientPurchase) => {
      const month = clientPurchase.date.substring(0, 7);
      let value = Math.floor(clientPurchase.value)
      let points = 0
      if (value > 100) {
        points += 2*(value - 100)
        value = 100
      }
      if (value >= 50) {
        points += value - 50
      }
      acc[month] ? acc[month] += points : acc[month] = points
      return acc
    }, {});

    setClientMonthlyPoints(Object.keys(months).sort().reduce((acc, month) => [...acc, {month, points: months[month]}], []))
  }, [clientPurchases])


  return <Main>
    <MainHeader>
      <PrimaryButton onClick={() => navigate(-1)}>
        {"<"}
      </PrimaryButton>
      <h2>Reward points for {isLoading || !clientPurchases.length ? '...' : clientPurchases[0].clientName}</h2>

    </MainHeader>
    {isLoading ? (
      <Loading />
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
              {clientMonthlyPoints.map((clientMonthlyPoint) => (
                <Tr key={clientMonthlyPoint.month}>
                  <Td key="1">{clientMonthlyPoint.month}</Td>
                  <Td key="2">{clientMonthlyPoint.points}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Total><h3>Total points: {clientMonthlyPoints.reduce((acc, clientMonthlyPoints) => acc + clientMonthlyPoints.points, 0)}</h3></Total>
      </>
    )}
  </Main>
}

const Total = styled.div`
  padding: 0 1rem;
`