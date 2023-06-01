import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  padding-top: 0.2rem;

  :after {
    content: ' ';
    display: block;
    width: 32px;
    height: 32px;
    margin: 16px;
    border-radius: 50%;
    border: 6px solid gray;
    border-color: gray transparent gray transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`

export const PrimaryButton = styled.button`
  background-color: #1a73e8;
  border-radius: 5px;
  border: 1px solid #1a73e8;
  color: white;
  padding: 0.2rem 1.2rem;
  font-size: 0.8rem;
  :hover {
    background-color: #005db3;
    border-color: #005db3;
  }
  :active {
    background-color: #5195ce;
    border-color: #5195ce;
  }
`

export const WarningButton = styled(PrimaryButton)`
  background-color: #e88e1a;
  border-color: #e88e1a;
  :hover {
    background-color: #df8816;
    border-color: #df8816;
  }
  :active {
    background-color: #cc7c14;
    border-color: #cc7c14;
  }
`
export const Main = styled.main`
  margin: 1rem 1rem;
  padding-bottom: 1rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;

  @media (min-width: 1024px) {
    margin: 1rem 3rem;
  }
`

export const MainHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid gray;
  gap: 1rem;
`

export const TableContainer = styled.div`
  margin: 1rem 1rem 0 1rem;
  overflow-x: auto;
`
export const Table = styled.table`
  width: 100%;
  border: 1px solid gray;
  border-spacing: 0;
`
export const Thead = styled.thead`
  background-color: lightgrey;
`
export const Tr = styled.tr``
export const Tbody = styled.tbody`
  > tr:not(:last-child) td {
    border-bottom: 1px solid lightgray;
  }

  > tr td:last-child {
    padding-right: 0.6rem;
  }
`
export const Th = styled.th`
  padding: 1rem 0 1rem 0.6rem;
  text-align: ${(props) => props.align || 'left'};
`
export const Td = styled.td`
  padding: 1rem 0 1rem 0.6rem;
  text-align: ${(props) => props.align || 'left'};
`
