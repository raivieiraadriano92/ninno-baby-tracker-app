import { FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Query } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { ScrollView, View } from "react-native";
import colors from "tailwindcss/colors";

import { BabyCard } from "src/components/BabyCard";
import { Button } from "src/components/Button";
import { Header } from "src/components/Header";
import { TabScreen } from "src/navigation/types";
import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";

type ListProps = {
  babies: BabyModel[];
  onPressBabyCard: (_babyId: BabyModel["id"]) => void;
};

type ObservableListProps = Pick<ListProps, "onPressBabyCard"> & {
  babiesQuery: Query<BabyModel>;
};

const babiesQuery = database.get<BabyModel>("babies").query();

const List: FunctionComponent<ListProps> = ({ babies, onPressBabyCard }) => (
  <View className="flex-1 p-6 space-y-5">
    {babies.map((baby) => (
      <BabyCard
        baby={baby}
        key={baby.id}
        onPress={() => onPressBabyCard(baby.id)}
      />
    ))}
  </View>
);

const ObservableList: FunctionComponent<ObservableListProps> = withObservables(
  ["babiesQuery"],
  ({ babiesQuery }) => ({
    babies: babiesQuery.observe()
  })
)(List);

export const BabiesTab: TabScreen<"Babies"> = ({ navigation }) => (
  <>
    <Header title="My Babies" />
    <ScrollView showsVerticalScrollIndicator={false}>
      <ObservableList
        babiesQuery={babiesQuery}
        onPressBabyCard={(babyId) =>
          navigation.navigate("BabyForm", { babyId })
        }
      />
    </ScrollView>
    <View className="absolute bottom-6 right-6">
      <Button
        className="w-16"
        onPress={async () => navigation.navigate("BabyForm")}
      >
        <Ionicons name="add" size={24} color={colors.white} />
      </Button>
    </View>
    {/* <Button title={"Sync"} onPress={sync} /> */}
  </>
);
