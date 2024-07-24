import colors from "tailwindcss/colors";

import { GENDER } from "src/services/database/models/BabyModel";

export const genderColor: Record<GENDER, keyof typeof colors> = {
  [GENDER.F]: "rose",
  [GENDER.M]: "sky"
};
