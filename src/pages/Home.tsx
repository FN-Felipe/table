import { Button, Flex } from '@chakra-ui/react';
import { ReactTable } from '../components/ReactTable';
import personFakes from '../fakes/PersonFakes.json'
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

interface Person {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  createdAt: string
}

export function Home() {
  const data: Person[] = useMemo(() => personFakes, [])
  const columns: ColumnDef<Person>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableColumnFilter: false
    },
    {
      header: 'Name',
      accessorFn: (row: { first_name: string; last_name: string }) => `${row.first_name} ${row.last_name}`
    },
    {
      header: 'E-mail',
      accessorKey: 'email',
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
    },
    {
      header: '',
      accessorKey: 'action',
      cell: info => <Button size='sm' colorScheme='blue'>Baixar</Button>,
      enableGlobalFilter: false,
      enableColumnFilter: false
    }
  ]
  
  return (
    <Flex bg='white' w='100%' shadow='lg' borderRadius={8} p={8} overflowX="auto">
      <ReactTable
        data={data}
        columns={columns}
        title='Person Table'
        isSearchable
      />
    </Flex>
  )
}