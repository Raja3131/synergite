import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme/theme'
import CustomFonts from './theme/customFont'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <ModalsProvider>
            <CustomFonts />
            <App />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
