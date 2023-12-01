import { Box } from "@chakra-ui/react"

const MainPage = ({ page }: { page: JSX.Element }) => {
    return (
        <Box w='calc(100% - 1rem - 175px)' pl={'2rem'}>
            { page }
        </Box>
    )
}

export default MainPage