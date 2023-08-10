import { Thead as ChakraThead, Tr, Th, Flex, Icon, FlexProps, InputProps, TableColumnHeaderProps } from "@chakra-ui/react"
import { useTable } from '../..'
import { ColumnFilter } from "./ColumnFilter"
import { flexRender } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TheadProps extends TableColumnHeaderProps {
  showColumnFilter?: boolean
  titleProps?: FlexProps
  filterProps?: InputProps
}

export function Thead({ showColumnFilter = true, titleProps, filterProps, ...props }: TheadProps) {
  const table = useTable()
  return (
    <ChakraThead position="sticky" top="0" bg="white" boxShadow="sm">
      {table.getHeaderGroups().map(headerGorup => (
        <Tr key={headerGorup.id}>
          {headerGorup.headers.map(header => (
            <Th key={header.id} align='left' border="none" colSpan={header.colSpan} {...props}>
              <Flex gap={1} direction='column' h='100%'>
                <Flex color="gray.400" gap={2} onClick={header.column.getToggleSortingHandler()} cursor='pointer' {...titleProps}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {{ asc: <Icon as={ChevronUp} boxSize={4} />, desc: <Icon as={ChevronDown} boxSize={4} /> }[header.column.getIsSorted() as string] ?? null}
                </Flex>
                {showColumnFilter && header.column.getCanFilter() ? <ColumnFilter column={header.column} {...filterProps} /> : null}
              </Flex>
            </Th>
          ))}
        </Tr>
      ))}
    </ChakraThead>
  )
}