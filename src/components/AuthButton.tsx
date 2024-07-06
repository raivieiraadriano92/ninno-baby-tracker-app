import { FunctionComponent } from "react";

import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";

import { supabase } from "src/services/supabase";

export const AuthButton: FunctionComponent = () => {
  if (Platform.OS === "ios")
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={16}
        style={{ height: 64 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL
              ]
            });

            // Sign in via Supabase Auth.
            if (credential.identityToken) {
              const {
                error,
                data: { user }
              } = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken
              });

              console.log(JSON.stringify({ error, user }, null, 2));

              if (!error) {
                // User is signed in.
              }
            } else {
              throw new Error("No identityToken.");
            }
          } catch (e) {
            if (e.code === "ERR_REQUEST_CANCELED") {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    );

  return <>{/* Implement Android Auth options. */}</>;
};
