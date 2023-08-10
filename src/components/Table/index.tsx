import { Flex, ContainerProps as ChakraContainerProps, } from "@chakra-ui/react"
import { useReactTable, getCoreRowModel, ColumnDef, Table as TanstackTable, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, getExpandedRowModel, ColumnFiltersState, VisibilityState, SortingState, ExpandedState, ColumnOrderState } from "@tanstack/react-table"
import { ReactNode, createContext, useContext, useState } from "react"
import { Content } from "./Content"
import { Thead } from "./Content/Thead"
import { Footer } from "./Footer"
import { Tbody } from "./Content/Tbody"
import { DownloadButton } from "./Header/DownloadButton"
import { Header } from "./Header"
import { Pagination } from "./Footer/Pagination"
import { Summary } from "./Footer/Summary"
import { PageSizeSelect } from "./Footer/PageSizeSelect"
import { SearchInput } from "./Header/SearchInput"
import { Title } from "./Header/Title"

interface ContainerProps<TData> extends ChakraContainerProps {
  children: ReactNode
  data: TData[]
  columns: ColumnDef<TData, any>[]
  columnVisibility?: VisibilityState | undefined
}

interface TableContextData extends TanstackTable<any> {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
}

const TableContext = createContext<TableContextData>({} as TableContextData)

function Container<TData>({ children, data, columns, columnVisibility, ...props }: ContainerProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
      sorting,
      globalFilter,
      columnVisibility,
      expanded,
      columnOrder,
    },
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableExpanding: true,
    autoResetExpanded: false,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  const contextData: TableContextData & TanstackTable<TData> = {
    ...table,
    setGlobalFilter
  }
  
  return (
    <TableContext.Provider value={contextData}>
      <Flex direction="column" h="100%" p={4} bg="white" {...props}>
        {children}
      </Flex>
    </TableContext.Provider>
  )
}

const useTable = () => useContext(TableContext)

const Table = {
  Container,
  Header,
  Content,
  Footer,
  Head: Thead,
  Body: Tbody,
  Pagination,
  Summary,
  PageSizeSelect,
  SearchInput,
  Title,
  DownloadButton
}

export { Table, useTable }