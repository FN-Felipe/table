import { Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TitleProps extends TextProps {
  children: ReactNode
}
export function Title({ children, ...props }: TitleProps) {
  if (typeof children === 'string') return <Text {...props}>{children}</Text>
  return <>{children}</>
}