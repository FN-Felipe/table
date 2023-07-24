import { Flex, Text } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';

export function Summary({ table }: { table: Table<any>}) {
  return (
    <Flex align="center" gap={1}>
      <Text fontSize={['xs', 'sm']}>Página</Text>
      <Text fontSize={['xs', 'sm']} fontWeight="semibold">
        {table.getState().pagination.pageIndex + 1}
      </Text>
      <Text fontSize={['xs', 'sm']} fontWeight="normal">
        de
      </Text>
      <Text fontSize={['xs', 'sm']} fontWeight="semibold">
        {table.getPageCount()}
      </Text>
    </Flex>
  )
}