import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "tailwindcss/colors";

import { Button } from "./Button";

import { useCustomThemeContext } from "src/context/CustomThemeProvider";

export const AddButton: typeof Button = ({ className, ...props }) => {
  const { theme } = useCustomThemeContext();

  return (
    <Button
      className={`h-12 p-0 w-12 ${className}`}
      customColors={[
        colors[theme.colorTokens.primary][500],
        colors[theme.colorTokens.primary][400]
      ]}
      enableShadow
      shadowColor={colors[theme.colorTokens.primary][500]}
      {...props}
    >
      <Ionicons name="add" size={24} color={colors.white} />
    </Button>
  );
};
