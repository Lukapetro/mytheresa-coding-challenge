module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          components: './src/components',
          hooks: './src/hooks',
          navigation: './src/navigation',
          screens: './src/screens',
          theme: './src/theme',
          types: './src/types',
        },
      },
    ],
  ],
};
