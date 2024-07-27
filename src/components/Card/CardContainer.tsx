import { FunctionComponent, PropsWithChildren } from "react";

import { View, ViewProps } from "react-native";
import colors from "tailwindcss/colors";

import { CardContext } from "./CardContext";

type CardContainerProps = PropsWithChildren<ViewProps> & {
  color: keyof typeof colors;
};

export const CardContainer: FunctionComponent<CardContainerProps> = ({
  children,
  className,
  color,
  style,
  ...props
}) => (
  <CardContext.Provider value={{ color }}>
    <View
      className={`flex-row items-center p-3 rounded-2xl space-x-3 ${className}`}
      style={[{ backgroundColor: colors[color][50] }, style]}
      {...props}
    >
      {children}
    </View>
  </CardContext.Provider>
);
