import { FunctionComponent } from "react";

import { Text as RNText, TextProps as RNTextProps } from "react-native";

type TextProps = RNTextProps;

export const Text: FunctionComponent<TextProps> = ({
  children,
  className,
  ...props
}) => (
  <RNText
    className={`font-normal text-base text-black ${className}`}
    {...props}
  >
    {children}
  </RNText>
);
