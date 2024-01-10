module.exports = function (api) {
  api.cache(true)

  return {
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin' // the Reanimated plugin has to be the last item in the plugins array
    ],
    presets: ['babel-preset-expo']
  }
}
