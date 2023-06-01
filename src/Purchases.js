import { useEffect, useState } from 'react'
import {
  Loading,
  WarningButton,
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
import { useNavigate } from 'react-router-dom'
import { useFetchData } from './utils'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const navigate = useNavigate()
  useFetchData(
    '/purchases',
    setPurchases,
    () => {},
    () => setIsLoading(false)
  )

  return (
    <Main>
      <MainHeader>
        <h2>Clients Purchases</h2>
      </MainHeader>
      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th align="center" key="1">
                  Purchase ID
                </Th>
                <Th key="2">Date</Th>
                <Th key="3">Value</Th>
                <Th key="4">Client name</Th>
                <Th key="5">Show the client reward points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {purchases.map((purchase) => (
                <Tr key={purchase.id}>
                  <Td align="center" key="1">
                    {purchase.id}
                  </Td>
                  <Td key="2">{purchase.date}</Td>
                  <Td key="3">{purchase.value}</Td>
                  <Td key="4">{purchase.clientName}</Td>
                  <Td key="5">
                    <WarningButton
                      onClick={() =>
                        navigate('/reward-points/client/' + purchase.clientId)
                      }
                    >
                      Show reward points
                    </WarningButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Main>
  )
}

export default App
