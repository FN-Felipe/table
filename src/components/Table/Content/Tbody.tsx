import { Tbody as ChakraTbody, Tr, Td } from "@chakra-ui/react";
import { useTable } from '..'
import { Fragment, ReactNode } from "react";
import { Row, flexRender } from "@tanstack/react-table";

interface TbodyProps<TData> {
  onRowClick?: ((row: Row<TData>) => void) | undefined
  expandedContent?: (row: Row<TData>) => ReactNode
}

export function Tbody<TData>({ onRowClick, expandedContent: TableExpandedContent }: TbodyProps<TData>) {
  const table = useTable()

  function isEven(number: string | number): boolean {
    return Number(number) % 2 === 0
  }

  return (
    <ChakraTbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <Fragment key={row.id}>
            <Tr
              key={row.id}
              color="gray.600"
              bg={isEven(row.id) ? "blackAlpha.50" : 'white'}
              _hover={{ backgroundColor: !row.getIsExpanded() ? "blackAlpha.50" : "transparent", color: "gray.800" }}
              cursor={onRowClick ? 'pointer' : 'default'}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
            {TableExpandedContent && row.getIsExpanded() && (
                <Tr key={`${row.id}-expanded`} borderBottomStyle="solid" borderBottomColor="blackAlpha.100" borderBottomWidth={1}>
                  <Td colSpan={row.getVisibleCells().length} borderColor="transparent">
                    <TableExpandedContent {...row} />
                  </Td>
                </Tr>
              )}
          </Fragment>
        )
      })}
    </ChakraTbody>
  );
}
