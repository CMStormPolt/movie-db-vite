import { Box } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { AppRouter } from 'routes'
import { Header, Footer } from 'components'
import { apolloClient } from 'apollo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Box w="100%">
          <Header />
          <AppRouter />
          <Footer />
        </Box>
      </QueryClientProvider>
    </ApolloProvider>
  )
}

export default App
