import { FunctionComponent, useEffect } from "react";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, View } from "react-native";

import { supabase } from "src/services/supabase";

export const AuthButton: FunctionComponent = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
      });
    }
  }, []);

  if (Platform.OS === "ios") {
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
                error
                // data: { user }
              } = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken
              });

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
  }

  return (
    <View className="items-center">
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();

            if (userInfo.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: userInfo.idToken
              });

              console.log(error, data);
            } else {
              throw new Error("no ID token present!");
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        }}
      />
    </View>
  );
};
