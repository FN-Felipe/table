import { Flex, Button, FlexProps } from "@chakra-ui/react"
import { MdFirstPage, MdNavigateBefore, MdNavigateNext, MdLastPage } from "react-icons/md"
import { useTable } from '..'

export function Pagination({ ...props }: FlexProps) {
  const table = useTable()
  return (
    <Flex gap={2} justify="flex-end" {...props}>
      <Button
        variant="solid"
        isDisabled={!table.getCanPreviousPage()}
        colorScheme="gray"
        size="sm"
        onClick={() => table.setPageIndex(0)}
      >
        <MdFirstPage />
      </Button>
      <Button
        variant="solid"
        isDisabled={!table.getCanPreviousPage()}
        colorScheme="gray"
        size="sm"
        onClick={() => table.previousPage()}
      >
        <MdNavigateBefore />
      </Button>
      <Button
        variant="solid"
        isDisabled={!table.getCanNextPage()}
        colorScheme="gray"
        size="sm"
        onClick={() => table.nextPage()}
      >
        <MdNavigateNext />
      </Button>
      <Button
        variant="solid"
        isDisabled={!table.getCanNextPage()}
        colorScheme="gray"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      >
        <MdLastPage />
      </Button>
    </Flex>
  );
}
