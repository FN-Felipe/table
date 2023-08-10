import { Box, IconButton, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { MdOutlineClose } from 'react-icons/md';
import { useDebounce } from 'use-debounce';

interface ColumnFilterInputProps extends InputProps {
  onChange: (value: any) => void
}

export function ColumnFilterInput({ value: initialValue, onChange, ...props }: ColumnFilterInputProps) {
  const [value, setValue] = useState(initialValue)
  const [deboucedValue] = useDebounce(value, 500)
  useEffect(() => onChange(deboucedValue), [deboucedValue])
  useEffect(() => setValue(initialValue), [initialValue])

  return (
    <Box w='fit-content' mb={1}>
      <InputGroup>
        <Input
          maxW={40}
          variant="flushed"
          size='sm'
          value={value || ''}
          onChange={(event) => setValue(event.target.value)}
          placeholder='Pesquisar...'
          _placeholder={{ opacity: 0.5}}
          {...props}
        />
        {value && (
          <InputRightElement pb={2}>
            <IconButton variant="ghost" aria-label="search-clean" size="xs" onClick={() => setValue('')} icon={<MdOutlineClose />}/>
          </InputRightElement>
         )}
      </InputGroup>
    </Box>
  )
}