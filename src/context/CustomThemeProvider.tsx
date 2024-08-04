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

type CustomThemeContextValues = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

const CustomThemeContext = createContext<CustomThemeContextValues>(
  {} as CustomThemeContextValues
);

export const useCustomThemeContext = () => useContext(CustomThemeContext);

export const CustomThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children
}) => {
  const [theme, setTheme] = useState<Theme>({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: colors.neutral[200]
    }
  });

  return (
    <CustomThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};
