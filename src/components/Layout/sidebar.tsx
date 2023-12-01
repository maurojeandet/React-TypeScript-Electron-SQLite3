import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Button, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { Paths } from '@/routes/app-routes'
import Quit from '@/components/Quit'

const Sidebar = () => {
	return (
		<Box w='175px' h='calc(100vh - 2rem)' pos='sticky' top='2rem' alignSelf='flex-start'>
			<VStack h='calc(100% - 2rem)' justifyContent={'center'} gap={'1rem'}>
				{
					Paths.map((path, index) => (
						<ChakraLink key={index} as={ReactRouterLink} to={path.path} w='100%' h='60px'>
							<Button w='100%' h='100%'>{path.name}</Button>
						</ChakraLink>
					))
				}

				<Quit />
			</VStack>
		</Box>
	)
}

export default Sidebar