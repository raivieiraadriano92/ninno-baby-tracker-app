import { FunctionComponent, PropsWithChildren } from "react";

import colors from "tailwindcss/colors";

import { Text, TextProps } from "../Text";

import { useCardContext } from "./CardContext";

export const CardCaption: FunctionComponent<PropsWithChildren<TextProps>> = ({
  children,
  className,
  style,
  ...props
}) => {
  const { color } = useCardContext();

  return (
    <Text
      className={`font-medium text-xs ${className}`}
      style={[{ color: colors[color][400] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
