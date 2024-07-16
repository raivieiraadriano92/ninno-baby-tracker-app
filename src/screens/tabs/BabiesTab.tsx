import { FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { withObservables } from "@nozbe/watermelondb/react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { BabyCard } from "src/components/BabyCard";
import { Button } from "src/components/Button";
import { Text } from "src/components/Text";
import { TabScreen } from "src/navigation/types";
import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";

type ListProps = {
  babies: BabyModel[];
};

const babiesQuery = database.get<BabyModel>("babies").query();

const List: FunctionComponent<ListProps> = ({ babies }) => (
  <View className="flex-1 p-6 space-y-5">
    {babies.map((baby) => (
      <BabyCard
        baby={baby}
        key={baby.id}
        onPress={async () => {
          try {
            await database.write(async () => {
              try {
                await baby.markAsDeleted();
              } catch (e) {
                console.error(e);
              }
            });
          } catch (e) {
            console.error(e);
          }
        }}
      />
    ))}
  </View>
);

const enhance = withObservables(["babies"], ({ babies }) => ({ babies }));

export const EnhancedList = enhance(List);

export const BabiesTab: TabScreen<"Babies"> = ({ navigation }) => (
  <>
    <SafeAreaView
      className="border-b-neutral-100 border-b-[1px] flex-row items-center p-6"
      edges={["top"]}
    >
      <Text className="font-bold text-xl">My Babies</Text>
    </SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={false}>
      <EnhancedList babies={babiesQuery} />
    </ScrollView>
    <View className="absolute bottom-6 right-6">
      <Button onPress={async () => navigation.navigate("BabyForm")}>
        <Ionicons name="add" size={24} color={colors.white} />
      </Button>
    </View>
    {/* <Button title={"Sync"} onPress={sync} /> */}
  </>
);
