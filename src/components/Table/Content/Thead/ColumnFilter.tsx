import { Column } from '@tanstack/react-table'
import { ColumnFilterInput } from './ColumnFilterInput'
import { InputProps } from '@chakra-ui/react'
import { useTable } from '../..'

interface ColumnFilterProps extends InputProps {
  column: Column<any, unknown>
}

export function ColumnFilter({ column, ...props }: ColumnFilterProps) {
  const table = useTable()
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
  const columnFilterValue = column.getFilterValue()

  return (typeof firstValue === 'number' ? (
    <ColumnFilterInput
      type="number"
      value={(columnFilterValue as [number, number])?.[0] ?? ''}
      onChange={value => column.setFilterValue(() => [value, value])}
      min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
      max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
      width='24'
      {...props}
    />
    ) : (
    <ColumnFilterInput
      value={(columnFilterValue ?? '') as string}
      onChange={value => column.setFilterValue(value)}
      list={column.id + 'list'}
      {...props}
    />
  ))
}