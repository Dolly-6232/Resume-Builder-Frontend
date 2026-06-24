# ResumeBuilderFe - React Native Resume Builder

A comprehensive React Native application for building professional resumes with multiple templates, ATS optimization, and advanced features.

## 🚀 Features

- **User Authentication**: Secure login and registration
- **Resume Creation**: Create and edit multiple resumes
- **10+ Templates**: Choose from various professionally designed templates
- **ATS Optimization**: Built-in ATS compatibility checker
- **User Profile**: Manage user profile and settings
- **Subscription Management**: Premium features and subscription plans
- **Ad Integration**: Banner and rewarded ad support
- **Offline Support**: Work on resumes offline
- **Export Options**: Download resumes in various formats

## 📋 Tech Stack

- **Framework**: React Native 0.81.4
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **API Client**: Axios
- **Build Tools**: Metro, Babel

## 📁 Project Structure

```
ResumeBuilderFe/
├── src/
│   ├── assets/           # Images, icons, fonts, templates
│   ├── components/       # Reusable components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── redux/           # Redux state management
│   ├── services/        # API services
│   ├── templates/       # Resume templates
│   ├── hooks/           # Custom React hooks
│   ├── theme/           # Theme and colors
│   ├── utils/           # Utility functions
│   ├── constants/       # App constants
│   └── types/           # TypeScript types
├── android/             # Android native code
├── ios/                 # iOS native code
├── babel.config.js      # Babel configuration
├── metro.config.js      # Metro configuration
├── tailwind.config.js   # Tailwind configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Installation

### Prerequisites
- Node.js >= 20
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ResumeBuilderFe
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS pods (macOS only):
```bash
cd ios
pod install
cd ..
```

4. Create environment file:
```bash
cp .env.example .env.local
```

5. Update `.env.local` with your configuration

## ▶️ Running the App

### Development Server
```bash
npm start
```

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## 📦 Dependencies

### Core
- `react`: UI library
- `react-native`: Mobile framework
- `react-native-safe-area-context`: Safe area handling

### Navigation
- `@react-navigation/native`: Navigation core
- `@react-navigation/native-stack`: Stack navigator
- `react-native-gesture-handler`: Gesture support

### State Management
- `@reduxjs/toolkit`: Redux utilities
- `react-redux`: React Redux bindings

### Styling
- `nativewind`: Tailwind CSS for React Native
- `tailwindcss`: Tailwind CSS framework

### API
- `axios`: HTTP client

## 🎨 Components

### Common Components
- **AppButton**: Reusable button with loading states
- **AppInput**: Text input with validation
- **Header**: Navigation header
- **Loader**: Loading indicator
- **EmptyState**: Empty state view
- **ErrorView**: Error display

### Screens
- **Auth**: Login, Register, Forgot Password, Verify Email
- **Home**: Main dashboard
- **Resume**: Resume list and creation
- **Templates**: Template selection
- **ATS**: ATS compatibility checker
- **Profile**: User profile management
- **Subscription**: Subscription management

## 🔗 API Integration

All API calls are handled through services in `src/services/`:
- `api.ts`: Axios configuration
- `auth.service.ts`: Authentication endpoints
- `resume.service.ts`: Resume endpoints

Environment variables can be configured in `.env.local`:
```
REACT_APP_API_URL=http://your-api-url
```

## 🔒 Redux State

### Stores
- **Auth**: User authentication state
- **Resume**: Resume data and list
- **Profile**: User profile information
- **Subscription**: Subscription status and plans

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development
REACT_APP_LOG_LEVEL=debug
REACT_APP_ENABLE_ANALYTICS=false
```

## 🐛 Troubleshooting

### Metro Cache Issues
```bash
npm start -- --reset-cache
```

### iOS Pod Issues
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android Build Issues
```bash
cd android
./gradlew clean
./gradlew build
cd ..
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Development Team

## 🤝 Support

For issues and questions, please create an issue in the repository.

## 🚀 Future Enhancements

- [ ] Cloud sync for resumes
- [ ] Real-time collaboration
- [ ] PDF export with formatting
- [ ] Mobile app notifications
- [ ] AI-powered suggestions
- [ ] Multiple language support
- [ ] Dark mode support
- [ ] Offline-first architecture

---

Built with ❤️ using React Native and TypeScript
