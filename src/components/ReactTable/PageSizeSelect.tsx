import { Select } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';

export function PageSizeSelect({ table, options = [10, 20, 30] }: { table: Table<any>;  options?: number[] }) {
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