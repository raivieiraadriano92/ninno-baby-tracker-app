import colors from "tailwindcss/colors";

export const genderColor: Record<"F" | "M", keyof typeof colors> = {
  F: "rose",
  M: "sky"
};
