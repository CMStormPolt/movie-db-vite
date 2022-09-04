import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Movie, MovieGenres } from 'types'

interface MovieCardProps {
    movie: Movie
}

export function MovieCard(props: MovieCardProps){
    const { posterUrl, name, year, genres } = props.movie
    const genresStrings = genres.map((genre)=>{
        return MovieGenres[genre]
    })
    console.log(genresStrings)

    return (
        <Box w="470px" border="1px" borderRadius="md" m="4" p="2">
            <Flex>
                <Image src={posterUrl}  boxSize='200px' alt="No poster yet" mr="2"/>
                <Box>
                    <Text>Title: {name}</Text>
                    <Text>Year: {year}</Text>
                    <Text>Genres: {genresStrings}</Text>
                </Box>
            </Flex>
        </Box>
    )
}
