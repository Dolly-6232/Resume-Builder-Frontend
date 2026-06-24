# ResumeBuilderFe Project Structure

This is a React Native Resume Builder application built with TypeScript and styled with Tailwind CSS (NativeWind).

## Project Structure

```
src/
├── assets/              # Images, icons, fonts, and templates
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, Loader, etc.)
│   ├── ads/            # Ad-related components
│   ├── resume/         # Resume building components
│   ├── templates/      # Template components
│   └── ats/            # ATS (Applicant Tracking System) components
├── screens/            # Screen components for navigation
│   ├── auth/          # Authentication screens
│   ├── home/          # Home screen
│   ├── resume/        # Resume screens
│   ├── templates/     # Template selection screens
│   ├── ats/           # ATS checking screens
│   ├── profile/       # User profile screens
│   └── subscription/  # Subscription screens
├── navigation/         # Navigation configuration
├── redux/             # State management
│   ├── store.ts       # Redux store configuration
│   ├── auth/          # Auth state slices
│   ├── resume/        # Resume state slices
│   ├── profile/       # Profile state slices
│   └── subscription/  # Subscription state slices
├── services/          # API services
├── templates/         # Resume template definitions
├── hooks/             # Custom React hooks
├── theme/             # Theme configuration and colors
├── utils/             # Utility functions
├── constants/         # App constants
└── types/             # TypeScript type definitions
```

## Setup Instructions

### Prerequisites
- Node.js >= 20
- npm or yarn
- React Native CLI

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install pods for iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

3. Start the development server:
```bash
npm start
```

### Running the App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

## Key Technologies

- **React Native 0.81.4** - Mobile app framework
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Navigation** - Screen navigation
- **NativeWind (Tailwind CSS)** - Styling
- **Axios** - HTTP client

## Configuration Files

- `babel.config.js` - Babel configuration with NativeWind preset
- `metro.config.js` - Metro bundler configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `global.css` - Global styles
- `nativewind.config.js` - NativeWind preset configuration
- `tsconfig.json` - TypeScript configuration

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Lint code
- `npm test` - Run tests

## Features

- User authentication (Login/Register)
- Resume creation and editing
- Multiple resume templates
- ATS (Applicant Tracking System) compatibility check
- User profile management
- Subscription management
- Ad integration

## Component Guidelines

### Common Components
- `AppButton` - Reusable button component
- `AppInput` - Reusable input component
- `Header` - Navigation header
- `Loader` - Loading indicator
- `EmptyState` - Empty state view
- `ErrorView` - Error display component

### Services
API services are organized by feature:
- `auth.service.ts` - Authentication APIs
- `resume.service.ts` - Resume APIs
- `api.ts` - Shared API client configuration

### Redux
Each feature has its own state slice:
- Auth slice for authentication state
- Resume slice for resume data
- Profile slice for user profile
- Subscription slice for subscription data

## Styling

This project uses NativeWind for styling, which provides Tailwind CSS utility classes for React Native.

### Example Usage:
```tsx
<View className="bg-blue-600 px-4 py-3 rounded-lg">
  <Text className="text-white font-bold text-base">Button</Text>
</View>
```

## Development Tips

1. Keep components small and reusable
2. Use TypeScript for type safety
3. Store API endpoints in constants
4. Use Redux for global state management
5. Follow the folder structure for better code organization
6. Use custom hooks for reusable logic

## Contributing

Please follow the existing code structure and naming conventions when adding new features.
