import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState, useEffect, InputHTMLAttributes } from 'react'
import { MdOutlineClose } from 'react-icons/md';

export function InputColumnFilter({
  value: initialValue, onChange, debounce = 500
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Box w='fit-content'>
      <InputGroup>
        <Input maxW={40} size='sm' value={value || ''} onChange={(event) => setValue(event.target.value)} placeholder='Pesquisar...' borderRadius='md' boxShadow='base' />
        {value && (
          <InputRightElement pb={2}>
            <IconButton variant="ghost" aria-label="search-clean" size="xs" onClick={() => setValue('')} icon={<MdOutlineClose />}/>
          </InputRightElement>
         )}
      </InputGroup>
    </Box>
  )
}