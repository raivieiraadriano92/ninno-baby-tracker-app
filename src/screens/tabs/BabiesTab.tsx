import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, View } from "react-native";
import colors from "tailwindcss/colors";

import { BabyCard } from "src/components/BabyCard";
import { Button } from "src/components/Button";
import { Header } from "src/components/Header";
import { ObserveBabiesWrapper } from "src/components/ObserveBabiesWrapper";
import { TabScreen } from "src/navigation/types";

export const BabiesTab: TabScreen<"Babies"> = ({ navigation }) => (
  <>
    <Header title="My Babies" />
    <ScrollView showsVerticalScrollIndicator={false}>
      <ObserveBabiesWrapper>
        {({ babies }) => (
          <View className="flex-1 p-6 space-y-5">
            {babies.map((baby) => (
              <BabyCard
                baby={baby}
                key={baby.id}
                onPress={() =>
                  navigation.navigate("BabyForm", { babyId: baby.id })
                }
              />
            ))}
          </View>
        )}
      </ObserveBabiesWrapper>
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
