import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, ScrollView, View } from "react-native";
import colors from "tailwindcss/colors";

import { BabyCard } from "src/components/BabyCard";
import { Button } from "src/components/Button";
import { ObserveBabiesWrapper } from "src/components/ObserveBabiesWrapper";
import { TabScreen } from "src/navigation/types";
import { BabyModel } from "src/services/database/models/BabyModel";
import { markBabyAsSelected } from "src/services/database/utils/babies";

export const BabiesTab: TabScreen<"Babies"> = ({ navigation }) => {
  const handleMarkBabyAsSelected = (baby: BabyModel) => {
    markBabyAsSelected(baby, () => navigation.jumpTo("Home"));
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ObserveBabiesWrapper>
          {({ babies }) => (
            <View className="flex-1 p-6 space-y-5">
              {babies.map((baby) => (
                <View className="flex-row items-center space-x-4" key={baby.id}>
                  <Pressable onPress={() => handleMarkBabyAsSelected(baby)}>
                    <Ionicons
                      name={
                        baby.isSelected ? "radio-button-on" : "radio-button-off"
                      }
                      size={24}
                      color={colors.black}
                    />
                  </Pressable>
                  <BabyCard
                    baby={baby}
                    className="flex-1"
                    onPress={() =>
                      navigation.navigate("BabyForm", { babyId: baby.id })
                    }
                  />
                </View>
              ))}
            </View>
          )}
        </ObserveBabiesWrapper>
      </ScrollView>
      <View className="absolute bottom-6 right-6">
        <Button
          className="h-14 p-0 w-14"
          onPress={() => navigation.navigate("BabyForm")}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </Button>
      </View>
    </>
  );
};
