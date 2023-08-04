// import { Column, Table } from '@tanstack/react-table';
// import { useMemo } from 'react';
// import { InputColumnFilter } from './InputColumnFilter';
// import { Flex } from '@chakra-ui/react';


// export function ColumnFilter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   const sortedUniqueValues = useMemo(() =>
//       typeof firstValue === 'number'
//         ? []
//         : Array.from(column.getFacetedUniqueValues().keys()).sort(),
//     [column.getFacetedUniqueValues()]
//   )

//   return (typeof firstValue === 'number' ? (
//     <Flex gap={2}>
//       <InputColumnFilter
//         type="number"
//         min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//         max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={value => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
//         placeholder='Min'
//         width='24'
//       />
//       <InputColumnFilter
//         type="number"
//         min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//         max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={value => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
//         placeholder='Max'
//         width='24'
//       />
//     </Flex>
//     ) : (
//     <>
//       <datalist id={column.id + 'list'}>
//         {sortedUniqueValues.slice(0, 5000).map((value: any) => (
//           <option value={value} key={value} />
//         ))}
//       </datalist>
//       <InputColumnFilter
//         value={(columnFilterValue ?? '') as string}
//         onChange={value => column.setFilterValue(value)}
//         className="w-36 border shadow rounded"
//         list={column.id + 'list'}
//       />
//     </>
//   ))
// }

import { Column } from '@tanstack/react-table';
import { InputColumnFilter } from './InputColumnFilter';

export function ColumnFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue()

  return (
    <InputColumnFilter
      value={(columnFilterValue ?? '') as string}
      onChange={value => column.setFilterValue(value)}
      className="w-36 border shadow rounded"
    />
  )
}