import { Box, InputGroup, Input, InputProps, InputRightElement, IconButton } from "@chakra-ui/react";
import { useTable } from '..'
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

export function SearchInput({ ...props }: InputProps) {
  const { setGlobalFilter } = useTable()
  const [value, setValue] = useState('')
  const [deboucedValue] = useDebounce(value, 500)
  
  useEffect(() => setGlobalFilter(deboucedValue), [deboucedValue])

  return (
    <Box>
      <InputGroup px={0}>
        <Input
          placeholder="Pesquisar..."
          borderRadius="md"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          _placeholder={{ opacity: 0.5}}
          {...props}
        />
        {value && (
          <InputRightElement pb={2}>
            <IconButton
              size="xs"
              variant="ghost"
              aria-label="search-clean"
              onClick={() => setValue('')}
              icon={<MdOutlineClose />}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
}