import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SetStateAction } from 'react';
import { MdOutlineClose } from 'react-icons/md';

export function SearchInput({ value, setValue, ...rest }: { value: string; setValue: (value: SetStateAction<string>) => void}) {
  return (
    <Box>
      <InputGroup>
        <Input maxW={64} value={value} onChange={(event) => setValue(event.target.value)} placeholder='Pesquisar...' borderRadius='md' {...rest} />
        <InputRightElement>
          {value && (
            <IconButton variant="ghost" aria-label="search-clean" size="sm" onClick={() => setValue('')} icon={<MdOutlineClose />}/>
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}