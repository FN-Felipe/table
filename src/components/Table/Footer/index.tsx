import { ReactNode } from "react"
import { Flex, FlexProps } from "@chakra-ui/react"

interface TableFooterProps extends FlexProps {
  children: ReactNode
}

export function Footer({ children, ...props }: TableFooterProps) {
  return (
    <Flex mt={2} {...props}>
      {children}
    </Flex>
  )
}