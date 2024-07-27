import { FunctionComponent, PropsWithChildren } from "react";

import { View, ViewProps } from "react-native";
import colors from "tailwindcss/colors";

import { useCardContext } from "./CardContext";

type CardRoundedSquareProps = PropsWithChildren<ViewProps> & {
  withBorder?: boolean;
};

export const CardRoundedSquare: FunctionComponent<CardRoundedSquareProps> = ({
  children,
  className,
  style,
  withBorder,
  ...props
}) => {
  const { color } = useCardContext();

  return (
    <View
      className={`h-14 items-center justify-center overflow-hidden rounded-lg w-14 ${className}`}
      style={[
        {
          backgroundColor: colors[color][200]
        },
        withBorder ? { borderWidth: 2, borderColor: colors[color][400] } : {},
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
