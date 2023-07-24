import { Flex, Button } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

export function ButtonController({ table }: { table: Table<any> }) {
  return (
    <Flex gap={2}>
      <Button variant='solid' isDisabled={!table.getCanPreviousPage()} colorScheme='gray' size='sm' onClick={() => table.setPageIndex(0)}>
        <MdFirstPage />
      </Button>
      <Button variant='solid' isDisabled={!table.getCanPreviousPage()} colorScheme='gray' size='sm' onClick={() => table.previousPage()}>
        <MdNavigateBefore />
      </Button>
      <Button variant='solid' isDisabled={!table.getCanNextPage()} colorScheme='gray' size='sm' onClick={() => table.nextPage()}>
        <MdNavigateNext />
      </Button>
      <Button variant='solid' isDisabled={!table.getCanNextPage()} colorScheme='gray' size='sm' onClick={() => table.setPageIndex(table.getPageCount() -1)}>
        <MdLastPage />
      </Button>
    </Flex>
  )
}