# MyTheresa Movie App

A React Native mobile application for browsing movies, with features like wishlisting, categorized views, and detailed movie information.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Xcode (for iOS development, Mac only)
- Android Studio (for Android development)
- iOS Simulator or Android Emulator
- [React Native development environment](https://reactnative.dev/docs/environment-setup)

## Environment Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd mytheresa
```

2. Install dependencies using pnpm:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
TMDB_API_KEY=your_tmdb_api_key
API_BASE_URL=https://api.themoviedb.org/3
```

> Note: You'll need to obtain an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

## Running the App

### iOS

1. Install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

2. Start the Metro bundler:

```bash
pnpm start
```

3. Run the iOS app:

```bash
# For iPhone simulator
pnpm ios

# For specific iPhone simulator
pnpm ios --simulator="iPhone 14 Pro"
```

### Android

1. Start an Android emulator from Android Studio or connect a physical device

2. Start the Metro bundler:

```bash
pnpm start
```

3. Run the Android app:

```bash
pnpm android
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── screens/       # Screen components
├── services/      # API services
├── theme/         # Theme configuration
└── types/         # TypeScript type definitions
```

## Features

- Browse movies by categories (Now Playing, Popular, Top Rated)
- View detailed movie information
- Add/remove movies to/from wishlist
- Persistent wishlist storage
- Category-specific styling
- Smooth animations and transitions
- Responsive design

## Development

### Code Style

The project uses ESLint and Prettier for code formatting. Run the following commands:

```bash
# Lint check
pnpm lint

# Format code
pnpm format
```

### Type Checking

```bash
pnpm typecheck
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**

   - Clear Metro cache:

     ```bash
     pnpm start --reset-cache
     ```

2. **iOS build fails**

   - Clean iOS build:

     ```bash
     cd ios
     xcodebuild clean
     pod install
     cd ..
     ```

3. **Android build fails**

   - Clean Android build:

     ```bash
     cd android
     ./gradlew clean
     cd ..
     ```

4. **Environment variables not working**
   - Ensure `.env` file exists
   - Rebuild the app after modifying `.env`

### Still Having Issues?

1. Make sure all dependencies are correctly installed:

```bash
pnpm install
```

2. Reset all caches:

```bash
# Remove node_modules
rm -rf node_modules
# Remove pnpm store
pnpm store prune
# Reinstall dependencies
pnpm install
```

3. For iOS specific issues:

```bash
cd ios
pod deintegrate
pod install
cd ..
```
