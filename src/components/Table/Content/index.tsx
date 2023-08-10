import { Table, TableProps, Flex } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";

interface ContentProps extends TableProps {
  children: ReactNode;
}

export function Content({ children, ...props }: ContentProps) {
  const marginTop = useMemo(() => {
    if (props.size === 'sm') return '64px'
    if (props.size === 'md') return '80px'
    return '92px'
  }, [props.size])

  return (
    <Flex
      h="100%"
      direction="column"
      justify="space-between"
      overflow="auto"
      position="relative"
      css={{
        "&::-webkit-scrollbar": {
          height: 5,
          width: 5,
        },
        "&::-webkit-scrollbar-track": {
          marginTop,
          background: "#f7fcf7",
          borderRadius: "100px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#A0AEC0",
          margin: "8px",
          borderRadius: "10px",
        },
      }}
    >
      <Table {...props}>
        {children}
      </Table>
    </Flex>
  )
}
