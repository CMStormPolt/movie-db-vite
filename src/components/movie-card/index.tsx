import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Movie, MovieGenres } from 'types'
import { ReactNode } from 'react'

interface MovieCardProps {
    movie: Movie
}

export function MovieCard(props: MovieCardProps){
    const { posterUrl, name, year, genres } = props.movie
    const genresStrings = genres.map((genre)=>{
        return MovieGenres[genre].toLowerCase()
    }).join(', ')

    return (
        <Box w="470px" border="1px" borderRadius="md" m="4" p="2">
            <Flex>
                <Poster posterUrl={posterUrl}/>
                <Box>
                    <Text>
                        Title:
                        <Text as="span" color="dodgerblue"> {name}</Text>
                    </Text>
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

function Poster({posterUrl}: {posterUrl: string}){
    if(posterUrl){
        return <Image src={posterUrl}  boxSize='200px' alt="No poster yet" mr="4"/>
    } else {
        return <Box w="200px" h="200px" border="1px" textAlign="center" mr="4">No Poster Yet</Box>
    }
}