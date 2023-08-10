import { extendTheme } from '@chakra-ui/react'
import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  table: {
    th: {
      borderBottom: 0
    },
    td: {
      borderBottom: 0
    },
    tr: {
      "&:nth-of-type(odd)": {
        td: {
          background: 'gray.50',
        },
      }
    }
  },
})

const tableTheme = defineMultiStyleConfig({ baseStyle })

export const theme = extendTheme({
  // components: {
  //   Table: tableTheme
  // },
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
