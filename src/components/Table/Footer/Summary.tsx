import { Flex, Text } from "@chakra-ui/react"
import { useTable } from '..'

export function Summary() {
  const table = useTable()
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