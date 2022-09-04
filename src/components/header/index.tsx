import { Flex, ButtonGroup, Button } from '@chakra-ui/react'
import { Link } from "wouter";

export function Header(){
    return (
        <Flex justify="flex-end" px="4" bg="midnightblue" h="64px" alignItems="center">
            <ButtonGroup variant='solid' spacing='6'>
                <Link href='/'>
                    <Button colorScheme="whiteAlpha">
                        Home
                    </Button>
                </Link>
                <Link href='/movies/create'>
                    <Button colorScheme='whiteAlpha'>
                        Create
                    </Button>
                </Link>
            </ButtonGroup>
        </Flex>
    )
}