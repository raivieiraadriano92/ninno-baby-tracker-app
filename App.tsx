import { FunctionComponent } from "react";

import { AppState } from "react-native";

import { RootNavigator } from "src/navigation/RootNavigator";
import { supabase } from "src/services/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const App: FunctionComponent = () => <RootNavigator />;

export default App;
