import { useQuery, gql } from '@apollo/client'
import { Flex, Heading, Spinner, useToast } from '@chakra-ui/react'
import { Page, MovieCard } from 'components'

const QUERY_ALL_MOVIES = gql`
    query getAllMovies {
        movies {
            _id
            name
            year
            isInTheaters
            genres,
            posterUrl
        }
    }
`

export function Home() {
    const { data, loading, error } = useQuery(QUERY_ALL_MOVIES)

    const toast = useToast()
    if(error) { 
        toast({
            title: 'Could not load movies',
            description: error.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
        }) 
    }

    return (
        <Page>
            <Heading color="dimgray" textAlign="center" mb="4" p="3">Last Movies Added</Heading>
            <Flex flexWrap="wrap" justify="center">
                {loading && (<Spinner size="xl"/>)}
                {data && data.movies.map((movie)=>{
                    return (
                        <MovieCard movie={movie}/>
                    )
                })}
            </Flex>
        </Page>
    )
  }

  