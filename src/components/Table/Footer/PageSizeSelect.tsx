import { Select } from "@chakra-ui/react"
import { useTable } from '..'

interface PageSizeSelectProps {
  options?: number[]
}

export function PageSizeSelect({ options = [10, 20, 30] }: PageSizeSelectProps) {
  const table = useTable()
  return (
    <Select
      borderRadius={6}
      w={32}
      size="sm"
      value={table.getState().pagination.pageSize}
      onChange={e => table.setPageSize(Number(e.target.value))}
    >
      {options.map(pageSize => (
        <option key={pageSize} value={pageSize}>
          Mostrar {pageSize}
        </option>
      ))}
    </Select>
  )
}