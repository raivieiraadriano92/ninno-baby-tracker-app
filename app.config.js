const getAppInfo = () => {
  switch (process.env.APP_VARIANT) {
    case "production":
      return { name: "Ninno", bundleIdentifier: "app.ninno" };

    case "preview":
      return { name: "Ninno (Preview)", bundleIdentifier: "app.ninno.preview" };

    default:
      return { name: "Ninno (Dev)", bundleIdentifier: "app.ninno.dev" };
  }
};

const { bundleIdentifier, name } = getAppInfo();

export default {
  expo: {
    name,
    slug: "ninno-baby-tracker-app",
    version: "2.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#bae6fd"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier,
      config: {
        usesNonExemptEncryption: false
      },
      usesAppleSignIn: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#bae6fd"
      },
      package: bundleIdentifier
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    experiments: {
      tsconfigPaths: true
    },
    plugins: [
      "expo-apple-authentication",
      "@react-native-google-signin/google-signin",
      /**
       * @todo
       * Android - SDK 51 - 'getJSIModulePackage' overrides nothing #45
       * https://github.com/morrowdigital/watermelondb-expo-plugin/issues/45
       *
       * WORKAROUND: disableJsi: true
       */
      ["@morrowdigital/watermelondb-expo-plugin", { disableJsi: true }],
      [
        "expo-build-properties",
        {
          android: {
            kotlinVersion: "1.6.10",
            packagingOptions: {
              pickFirst: ["**/libc++_shared.so"]
            }
          }
        }
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos."
        }
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone.",
          recordAudioAndroid: true
        }
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
          savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
          isAccessMediaLocationEnabled: true
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "1aa0a0c8-48d3-4f27-af8d-4f38a3306f98"
      }
    }
  }
};
