import { Column, Table } from '@tanstack/react-table';
import { useMemo } from 'react';
import { InputColumnFilter } from './InputColumnFilter';
import { Flex } from '@chakra-ui/react';


export function ColumnFilter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(() =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return (typeof firstValue === 'number' ? (
    <Flex gap={2}>
      <InputColumnFilter
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={value => column.setFilterValue(() => [value, value])}
        placeholder='Min'
        width='24'
      />
    </Flex>
    ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <InputColumnFilter
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        list={column.id + 'list'}
      />
    </>
  ))
}