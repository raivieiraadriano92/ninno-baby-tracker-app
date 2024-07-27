import { FunctionComponent, PropsWithChildren } from "react";

import { Text, TextProps } from "../Text";

export const CardTitle: FunctionComponent<PropsWithChildren<TextProps>> = ({
  children,
  className,
  ...props
}) => (
  <Text className={`capitalize font-medium ${className}`} {...props}>
    {children}
  </Text>
);
