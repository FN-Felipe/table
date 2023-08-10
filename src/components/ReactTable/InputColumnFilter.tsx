import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState, useEffect, InputHTMLAttributes } from 'react'
import { MdOutlineClose } from 'react-icons/md';

type InputColumnFilterProps = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

export function InputColumnFilter({ value: initialValue, onChange, debounce = 500 }: InputColumnFilterProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
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
        <Input maxW={40} variant="flushed" size='sm' value={value || ''} onChange={(event) => setValue(event.target.value)} placeholder='Pesquisar...' _placeholder={{ opacity: 0.5}} />
        {value && (
          <InputRightElement pb={2}>
            <IconButton variant="ghost" aria-label="search-clean" size="xs" onClick={() => setValue('')} icon={<MdOutlineClose />}/>
          </InputRightElement>
         )}
      </InputGroup>
    </Box>
  )
}