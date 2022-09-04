import { ApolloClient, InMemoryCache} from '@apollo/client'

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: import.meta.env.VITE_apolloUrl,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "no-cache",
            errorPolicy: "ignore"
        },
        query: {
            fetchPolicy: "no-cache",
            errorPolicy: "all"
        }
    }
})

