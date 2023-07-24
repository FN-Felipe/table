import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.600',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#F7FAFC',
          borderRadius: '100px',
        },
        '&::-webkit-scrollbar-thumb': {
          boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#CBD5E0',
          borderRadius: '100px',
        },
      },
    },
  },
})
