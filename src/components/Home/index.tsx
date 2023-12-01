import { Flex, Text } from "@chakra-ui/react"

const Home = () => {

    return (
        <Flex direction='column' gap={4}>
            <Flex justifyContent='center'>
                <Text fontSize='3xl'>React + TypeScript + Electron + SQLite3</Text>
            </Flex>
        </Flex>
    )
}

export default Home