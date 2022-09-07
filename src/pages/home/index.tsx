import { useQuery, gql } from '@apollo/client'
import { Flex, Heading, Spinner, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Page, MovieCard } from 'components'

const QUERY_LATEST_MOVIES = gql`
    query getMovies($input: SearchForMoviesInput) {
        movies(input: $input) {
            _id
            name
            year
            isInTheaters
            genres
            posterUrl
    }
}
`

export function Home() {
    const { data, loading, error } = useQuery(QUERY_LATEST_MOVIES, {variables: {
        input: {
            sortByDate: 'desc',
            limit: 6
        }
    }})

    const toast = useToast()

    useEffect(()=>{
        if(error) { 
            toast({
                title: 'Could not load movies',
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            }) 
        }
    },[error])

    return (
        <Page>
            <Heading color="dimgray" textAlign="center" mb="4" p="3">Last Movies Added</Heading>
            <Flex flexWrap="wrap" justify="center">
                {loading && (<Spinner size="xl"/>)}
                {data && data.movies.map((movie)=>{
                    return (
                        <MovieCard movie={movie} key={movie._id}/>
                    )
                })}
            </Flex>
        </Page>
    )
  }

  