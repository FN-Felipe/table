import { Flex, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

interface HeaderProps extends FlexProps {
  children: ReactNode
}

export function Header({ children, ...props }: HeaderProps) {
  return (
    <Flex mb={2} {...props}>
      {children}
    </Flex>
  )
}