import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Movie, MovieGenres, Poster } from 'types'
import { ReactNode } from 'react'

interface MovieCardProps {
    movie: Movie
}

export function MovieCard(props: MovieCardProps){
    const { posters, name, year, genres } = props.movie
    const genresStrings = genres.map((genre)=>{
        return MovieGenres[genre].toLowerCase()
    }).join(', ')

    return (
        <Box w="470px" border="1px" borderRadius="md" m="4" p="2">
            <Flex>
                <MainPoster posters={posters}/>
                <Box>
                    <Flex>
                        <Text>Title:</Text>
                        <Text color="dodgerblue" ml="1"> {name}</Text>
                    </Flex>
                    <Text>
                        Year: 
                        <Text as="span" color="dodgerblue"> {year}</Text>
                    </Text>
                    <Text>
                        Genres: 
                        <Text as="span" textTransform="capitalize" color="dodgerblue"> {genresStrings}</Text>
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}

function MainPoster({posters}: {posters: [Poster]}){
    if(posters.length){
        const poster = posters[0]
        return <Image src={poster.url}  width='200px' height="300px" alt="movie poster" mr="4"/>
    } else {
        return <Box w="200px" h="300px" border="1px" textAlign="center" mr="4">No Poster Yet</Box>
    }
}