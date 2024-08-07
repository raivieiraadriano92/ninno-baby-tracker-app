import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from "react";

import { DefaultTheme, Theme } from "@react-navigation/native";
import colors from "tailwindcss/colors";

import { genderColor } from "src/utils/global";

type CustomTheme = Theme & {
  colorTokens: { primary: keyof typeof colors };
};

type CustomThemeContextValues = {
  theme: CustomTheme;
  setTheme: Dispatch<SetStateAction<CustomTheme>>;
};

const CustomThemeContext = createContext<CustomThemeContextValues>(
  {} as CustomThemeContextValues
);

export const useCustomThemeContext = () => useContext(CustomThemeContext);

export const CustomThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children
}) => {
  const [theme, setTheme] = useState<CustomThemeContextValues["theme"]>({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: genderColor.M,
      border: colors.neutral[200]
    },
    colorTokens: {
      primary: genderColor.M
    }
  });

  return (
    <CustomThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};
