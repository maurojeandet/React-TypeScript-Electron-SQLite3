import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from '@/routes/app-routes'

function App() {
    return (
        <ChakraProvider>
            <AppRoutes />
        </ChakraProvider>
    )
}

function render() {
    const domNode = document.getElementById('root')
    const root = createRoot(domNode)

    root.render(<App />)
}

render()