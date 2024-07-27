import { createContext, useContext } from "react";

import colors from "tailwindcss/colors";

type CardContextValues = {
  color: keyof typeof colors;
};

export const CardContext = createContext<CardContextValues>({ color: "sky" });

export const useCardContext = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCardContext must be used within a CardContextProvider");
  }

  return context;
};
