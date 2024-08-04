import { FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { format, parseISO } from "date-fns";
import { Image } from "expo-image";
import { PressableProps, View } from "react-native";
import colors from "tailwindcss/colors";

import { Card } from "./Card";
import { PressableWithScaleEffect } from "./PressableWithScaleEffect";

import NinnoFace from "assets/ninno-face.png";
import { BabyModel } from "src/services/database/models/BabyModel";
import { genderColor } from "src/utils/global";

type BabyCardPropd = PressableProps & {
  baby: BabyModel;
};

export const BabyCard: FunctionComponent<BabyCardPropd> = ({
  baby,
  onPressIn,
  onPressOut,
  ...props
}) => (
  <PressableWithScaleEffect {...props}>
    <Card.Container color={genderColor[baby.gender]}>
      <Card.RoundedSquare
        style={{
          padding: baby.pictureUrl ? 0 : 8
        }}
        withBorder
      >
        {baby.pictureUrl ? (
          <Image className="h-full w-full" source={baby.pictureUrl} />
        ) : (
          <Image
            className="h-full w-full"
            contentFit="contain"
            source={NinnoFace}
          />
        )}
      </Card.RoundedSquare>
      <View className="flex-1">
        <Card.Title>{baby.name}</Card.Title>
        <Card.Caption>
          {format(parseISO(baby.birthDate), "MMM d, yyyy")}
        </Card.Caption>
      </View>
      <Ionicons
        name="arrow-forward"
        size={24}
        color={colors[genderColor[baby.gender]][400]}
      />
    </Card.Container>
  </PressableWithScaleEffect>
);
