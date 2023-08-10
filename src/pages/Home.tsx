import { Flex, Icon, Text } from "@chakra-ui/react";
import personFakes from "../fakes/PersonFakes.json";
import { useMemo, useState } from "react";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { format, isEqual, isValid, parse } from "date-fns";
import { Table } from "../components/Table";
import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  createdAt: Date;
}

export function Home() {
  const [previusRow, setPreviousRow] = useState<Row<Person>>()
  const data: Person[] = useMemo(() =>
      personFakes.map((person) => ({
        ...person, 
        createdAt: parse(person.createdAt, "dd/MM/yyyy", new Date()),
      })),
    []
  )
  const columnHelper = createColumnHelper<Person>()
  
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("first_name", {
      header: "Nome",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("gender", {
      header: "Gênero",
    }),
    columnHelper.accessor("createdAt", {
      header: "Cadastrado",
      cell: (info) => <Text>{format(info.getValue(), "dd/MM/yyyy")}</Text>,
      filterFn: (row, _column, filterValue) => {
        const parsedDate = parse(filterValue, "dd/MM/yyyy", new Date());
        if (!isValid(parsedDate)) return false;
        return isEqual(parsedDate, row.original.createdAt);
      },
    }),
    columnHelper.accessor("id", {
      header: "",
      size: 0,
      enableColumnFilter: false,
      cell: (info) => info.row.getIsExpanded() ? (
          <Icon as={ChevronDownIcon} mr={0} h={4} w={4} color="gray.500" />
        ) : (
          <Icon as={ChevronLeftIcon} mr={0} h={4} w={4} color="gray.500" />
        ),
    }),
  ]

  function onRowClick(row: Row<Person>) {
    setPreviousRow(row)
    if (previusRow) previusRow.toggleExpanded(false)
    row.toggleExpanded(!row.getIsExpanded())
  }

  return (
    <Table.Container
      w="100%"
      data={data}
      columns={columns}
      boxShadow="sm"
      borderRadius="8"
    >
      <Table.Header justify="space-between">
        <Table.Title color="gray.500" fontSize="xl">
          Person Table
        </Table.Title>
        <Flex gap={2}>
          <Table.SearchInput w={48} size="sm" />
          <Table.DownloadButton csvData={data} filename="Test" />
        </Flex>
      </Table.Header>
      <Table.Content variant="unstyled" size="sm">
        <Table.Head
          showColumnFilter={true}
          titleProps={{ textTransform: 'none' }}
          filterProps={{ variant: 'outline', borderRadius: 6 }}
        />
        <Table.Body
          onRowClick={onRowClick}
          expandedContent={(row) => (
            <Flex bg="white" h={48} p={8} my={2}>
              <Text>{row.original.email}</Text>
            </Flex>
          )}
        />
      </Table.Content>
      <Table.Footer justify="space-between">
        <Table.Summary />
        <Flex gap={4}>
          <Table.PageSizeSelect />
          <Table.Pagination />
        </Flex>
      </Table.Footer>
    </Table.Container>
  );
}
