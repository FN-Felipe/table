import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Home } from './pages/Home'
import { theme } from './styles/theme'

export function App() {

  return (
    <ChakraProvider theme={theme}>
      <Flex direction='column' align='center' bg='gray.50' w='100vw' h='100vh' p={8}>
        <Home />
      </Flex>
    </ChakraProvider>
  )
}
