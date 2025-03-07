import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './NotificationContext'

import App from './App'

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={qc}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)
