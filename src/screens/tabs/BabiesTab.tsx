import { FunctionComponent } from "react";

import { withObservables } from "@nozbe/watermelondb/react";
import { View } from "react-native";

import { Button } from "src/components/Button";
import { Text } from "src/components/Text";
import { TabScreen } from "src/navigation/types";
import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";
import { sync } from "src/services/database/sync";

database
  .get("babies")
  //   .find("16dba95b-2021-46e8-9e3d-d44f9e7ab088")
  .query()
  .fetch()
  .then((babies) => {
    babies.forEach((baby) => {
      console.log(baby.name);
    });
  });

const List: FunctionComponent<{ babies: BabyModel[] }> = ({ babies }) => (
  <View>
    {babies.map((baby) => (
      <Text key={baby.id}>{baby.name}</Text>
    ))}
  </View>
);

const enhance = withObservables(["babies"], ({ babies }) => ({
  babies: babies.observe()
}));

export const EnhancedList = enhance(List);

export const BabiesTab: TabScreen<"Babies"> = ({}) => (
  <View className="flex-1 justify-center p-6 space-y-6">
    {/* <EnhancedList /> */}
    <Button
      title={"New Baby"}
      onPress={async () => {
        // const { data, error } = await supabase
        //   .from("babies")
        //   .insert({ name: "test", gender: "F", birthday: "2024-01-01" });

        // console.log(data, error);

        // return;

        database.write(() =>
          database
            .get<BabyModel>("babies")
            .create((baby) => {
              baby.name = "New Baby";

              baby.gender = "F";

              baby.birthday = "2024-01-01";
            })
            .then((baby) => console.log(baby))
            .catch((e) => console.error(e))
        );
      }}
    />
    <Button title={"Sync"} onPress={sync} />
  </View>
);
