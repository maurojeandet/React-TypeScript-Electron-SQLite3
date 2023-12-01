import Sidebar from "./sidebar"
import MainPage from "./main-page"
import { Flex } from "@chakra-ui/react"

const Layout = ({ page }: { page: JSX.Element }) => {
    return (
        <Flex gap={'1rem'}>
            <Sidebar />
            <MainPage page={page} />
        </Flex>
    )
}

export default Layout