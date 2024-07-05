import type { FunctionComponent } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Upgrade: undefined;
  //   Tabs: undefined | NavigatorScreenParams<TabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootStackScreen<RouteName extends keyof RootStackParamList> =
  FunctionComponent<RootStackScreenProps<RouteName>>;

// export type TabParamList = {
//   BabyProfiles: undefined;
//   Home: undefined;
//   Records: undefined;
//   Settings: undefined;
// };

// export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
//   BottomTabScreenProps<TabParamList, T>,
//   RootStackScreenProps<keyof RootStackParamList>
// >;

// export type TabScreen<RouteName extends keyof TabParamList> = FunctionComponent<
//   TabScreenProps<RouteName>
// >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
