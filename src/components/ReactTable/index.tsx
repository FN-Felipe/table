import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  VisibilityState,
  ExpandedState,
  getExpandedRowModel,
  ColumnFiltersState
} from '@tanstack/react-table'
import React, { useState } from 'react'
import { Button, Flex, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { ButtonController } from './ButtonController';
import { SearchInput } from './SearchInput';
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'
import { MdFileDownload } from 'react-icons/md';
import { format } from 'date-fns';
import { PageSizeSelect } from './PageSizeSelect';
import { Summary } from './Summary';
import { ColumnFilter } from './ColumnFilter';

export function ReactTable({
  data,
  columns,
  title,
  isSearchable,
  csvData,
  pageSizeOptions = [10, 20, 30],
  onRowClick,
  columnVisibility,
  tableExpandedContent: TableExpandedContent,
  enableMultiSort = false,
  actionButton,
}: {
    data: any[];
    columns: any[];
    title?: string;
    isSearchable?: boolean;
    csvData?: string | Data
    pageSizeOptions?: number[]
    onRowClick?: ((row: any) => void) | undefined
    columnVisibility?: VisibilityState | undefined
    tableExpandedContent?: (row: any) => JSX.Element
    enableMultiSort?: boolean | undefined
    actionButton?: JSX.Element
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [filtering, setFiltering] = useState('')
  const showTitle = useBreakpointValue({ base: false, md: !!title })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting: sorting,
      expanded,
      globalFilter: filtering,
      columnVisibility
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,
    autoResetExpanded: false,
    enableMultiSort,
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <Flex direction='column'  w='100%'>
      <Flex justify='space-between' align='center' mb={showTitle ? 6 : 0} pr={0}>
        {showTitle && <Text fontSize={20} fontWeight='semibold'>{title}</Text>}
        <Flex gap={2}>
          {isSearchable && <SearchInput value={filtering} setValue={setFiltering} />}
          {actionButton && actionButton}
          {csvData && (
            <Button
              as={CSVLink}
              w="auto"
              h="auto"
              title="Download CSV"
              filename={`${format(new Date(), 'yyyy-MM-dd_HHmm')}_${title}.csv`}
              data={csvData}
              separator=";"
              variant="outline"
            >
              <Icon as={MdFileDownload} boxSize="5" />
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex
        overflow='auto' 
        position='relative'
        css={{
          '&::-webkit-scrollbar': {
            height: 4,
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f7fcf7',
            borderRadius: '100px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#2b6cb0',
            margin: '8px',
            borderRadius: '10px',
          },
        }}>
          <Table variant='striped' size='sm' colorScheme='blackAlpha'>
            <Thead>
              {table.getHeaderGroups().map(headerGorup => (
                <Tr key={headerGorup.id}>
                  {headerGorup.headers.map(header => (
                    <Th key={header.id} align='left'  colSpan={header.colSpan} h='16'>
                      <Flex gap={1} direction='column' h='100%'>
                        <Flex onClick={header.column.getToggleSortingHandler()} cursor='pointer'>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          {{ asc: <TriangleUpIcon />, desc: <TriangleDownIcon /> }[header.column.getIsSorted() as string] ?? null}
                        </Flex>
                        {header.column.getCanFilter() ? (
                          // <ColumnFilter column={header.column} table={table} />
                          <ColumnFilter column={header.column} />
                        ) :
                          null}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map(row => (
                <React.Fragment key={row.id}>
                  <Tr
                    key={row.id}
                    color="gray.600"
                    _hover={{
                      backgroundColor: !row.getIsExpanded() ? 'blackAlpha.50' : 'transparent',
                      color: 'gray.800',
                    }}
                    cursor={onRowClick ? 'pointer' : 'default'}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <Td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    ))}
                  </Tr>
                  {TableExpandedContent && row.getIsExpanded() && (
                    <Tr key={`${row.id}-expanded`}>
                      <Td colSpan={row.getVisibleCells().length} borderColor="transparent">
                        <TableExpandedContent data={row} />
                      </Td>
                    </Tr>
                  )}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
      </Flex>
      <Flex w='100%' justify='space-between' align='center' mt={5}>
        <Summary table={table} />
        <Flex gap={5}>
          <PageSizeSelect table={table} options={pageSizeOptions} />
          <ButtonController table={table} />
        </Flex>
      </Flex>
    </Flex>
  )
}