import { FunctionComponent } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const App: FunctionComponent = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
