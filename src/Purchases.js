import { useState } from 'react'
import {
  WarningButton,
  Th,
  Td,
  Tr,
  Table,
  Thead,
  Tbody,
  TableContainer,
} from './components'
import { useNavigate } from 'react-router-dom'
import DataLoader from './DataLoader'

function Purchases() {
  const [purchases, setPurchases] = useState([])
  const navigate = useNavigate()

  return (
    <DataLoader
      url="/purchases"
      setData={setPurchases}
      header={<h2>Clients Purchases</h2>}
    >
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th key="1">Purchase ID</Th>
              <Th key="2">Date</Th>
              <Th key="3">Value</Th>
              <Th key="4">Client name</Th>
              <Th key="5">Show the client reward points</Th>
            </Tr>
          </Thead>
          <Tbody>
            {purchases.map((purchase) => (
              <Tr key={purchase.id}>
                <Td key="1">{purchase.id}</Td>
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
    </DataLoader>
  )
}

export default Purchases
