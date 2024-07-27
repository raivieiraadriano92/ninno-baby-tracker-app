import { FunctionComponent, PropsWithChildren } from "react";

import { Text, TextProps } from "../Text";

export const CardCaption: FunctionComponent<PropsWithChildren<TextProps>> = ({
  children,
  className,
  ...props
}) => (
  <Text
    className={`font-light text-neutral-500 text-xs ${className}`}
    {...props}
  >
    {children}
  </Text>
);
