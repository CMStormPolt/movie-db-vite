import { Flex, Text, Link, Button } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'


export function Footer(){
    return (
        <Flex justify="space-between" px="4" bg="CaptionText" h="40px" alignItems="center">
            <Text color="Highlight" fontSize="small">
                Created By A.Boyadzhiev CMStormPolt
            </Text>
            <Button colorScheme="whatsapp" rightIcon={<ArrowRightIcon />} size="xs">
                <Link isExternal href="https://github.com/CMStormPolt/movie-db-vite" textTransform="none">
                    Check the repo
                </Link >
            </Button>
        </Flex>
    )
}