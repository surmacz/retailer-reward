import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Purchases from './Purchases'
import RewardPoints from './RewardsPoints'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Purchases />,
  },
  {
    path: 'reward-points/client/:clientId',
    element: <RewardPoints />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
