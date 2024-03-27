const getAppInfo = () => {
  switch (process.env.APP_VARIANT) {
    case 'production':
      return { name: 'Ninno', bundleIdentifier: 'app.ninno' }

    case 'preview':
      return { name: 'Ninno (Preview)', bundleIdentifier: 'app.ninno.preview' }

    default:
      return { name: 'Ninno (Dev)', bundleIdentifier: 'app.ninno.dev' }
  }
}

const { bundleIdentifier, name } = getAppInfo()

export default {
  expo: {
    name,
    slug: 'ninno-baby-tracker-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#B5E1FF'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier,
      config: {
        usesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#B5E1FF'
      },
      package: bundleIdentifier
    },
    web: {
      favicon: './assets/favicon.png'
    },
    experiments: {
      tsconfigPaths: true
    },
    plugins: ['expo-secure-store'],
    extra: {
      eas: {
        projectId: '1aa0a0c8-48d3-4f27-af8d-4f38a3306f98'
      }
    }
  }
}
