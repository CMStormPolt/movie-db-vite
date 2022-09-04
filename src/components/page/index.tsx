import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PageProps {
    children?: ReactNode
}

export function Page(props: PageProps){
    return (
        <Box minH="calc(100vh - 104px)">
            {props.children}
        </Box>
    )
}