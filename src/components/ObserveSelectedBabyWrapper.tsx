import { FunctionComponent, useEffect } from "react";

import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import colors from "tailwindcss/colors";

import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";
import { genderColor } from "src/utils/global";

type WrapperProps = {
  babies: BabyModel[];
  children: (_props: { selectedBaby: BabyModel }) => JSX.Element;
};

type ObserveSelectedBabyWrapperProps = Pick<WrapperProps, "children">;

const babiesQuery = database
  .get<BabyModel>("babies")
  .query(Q.where("is_selected", Q.eq(true)));

const Wrapper: FunctionComponent<WrapperProps> = ({ babies, children }) => {
  const selectedBaby = babies[0];

  const { setTheme } = useCustomThemeContext();

  useEffect(() => {
    if (selectedBaby) {
      setTheme((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          primary: colors[genderColor[selectedBaby.gender]][500]
        }
      }));
    }
  }, [selectedBaby, setTheme]);

  return selectedBaby ? children({ selectedBaby }) : <></>;
};

export const ObserveSelectedBabyWrapper: FunctionComponent<ObserveSelectedBabyWrapperProps> =
  withObservables([], () => ({
    babies: babiesQuery.observeWithColumns([
      "birth_date",
      "gender",
      "picture_url",
      "name",
      "is_selected"
    ])
  }))(Wrapper);
