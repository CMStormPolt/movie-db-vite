import { Box } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { AppRouter } from 'routes'
import { Header, Footer } from 'components'
import { apolloClient } from 'apollo'

function App() {

  return (
    <ApolloProvider client={apolloClient}>
      <Box w="100%">
        <Header />
        <AppRouter />
        <Footer />
      </Box>
    </ApolloProvider>
  )
}

export default App
