# Quick Reference Guide - ResumeBuilderFe

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development
npm start

# 3. Run on device
npm run android  # or npm run ios
```

## 📂 File Organization Quick Tips

| Need | Location |
|------|----------|
| UI Component | `src/components/common/` or category folder |
| New Screen | `src/screens/<category>/` |
| API Call | `src/services/` |
| State Logic | `src/redux/<feature>/` |
| Helper Function | `src/utils/` |
| Custom Hook | `src/hooks/` |
| Colors/Theme | `src/theme/` |
| Constants | `src/constants/` |
| Types | `src/types/` |

## 💻 Code Snippets

### Create a New Component
```tsx
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-lg font-bold">{title}</Text>
    </View>
  );
};

export default MyComponent;
```

### Create a New Redux Slice
```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  data: any[];
  loading: boolean;
  error: null | string;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

const mySlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = mySlice.actions;
export default mySlice.reducer;
```

### Create a New Service
```tsx
import apiClient from './api';

export const myService = {
  getAll: async () => {
    const response = await apiClient.get('/endpoint');
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/endpoint', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/endpoint/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/endpoint/${id}`);
    return response.data;
  },
};
```

### Use Redux in Component
```tsx
import { useAppSelector, useAppDispatch } from '../hooks';
import { setUser } from '../redux/auth/authSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogin = () => {
    dispatch(setUser({ id: '1', name: 'John' }));
  };

  return <Text>{user?.name}</Text>;
};
```

### Use Custom Hook
```tsx
import { useForm } from '../hooks/useForm';

const LoginScreen = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (values) => {
      // Handle login
    }
  );

  return (
    <>
      <AppInput
        value={values.email}
        onChangeText={(text) => handleChange('email', text)}
        error={errors.email}
      />
    </>
  );
};
```

### Add Styling with Tailwind
```tsx
<View className="flex-1 bg-blue-600 px-4 py-6 rounded-lg items-center justify-center">
  <Text className="text-white text-2xl font-bold mb-4">Welcome</Text>
  <Text className="text-gray-200 text-base">Get started today</Text>
</View>
```

## 🔑 Key Import Paths

```tsx
// Components
import { AppButton, AppInput, Header, Loader } from '@/components/common';

// Screens
import LoginScreen from '@/screens/auth/LoginScreen';

// Redux
import { store, RootState, AppDispatch } from '@/redux/store';
import { setUser } from '@/redux/auth/authSlice';

// Hooks
import { useAppDispatch, useAppSelector, useForm } from '@/hooks';

// Services
import { authService, resumeService } from '@/services';

// Utils
import { Logger, ValidationRules, delay } from '@/utils';

// Theme
import { appColors } from '@/theme/colors';

// Constants
import { APP_CONSTANTS, API_ENDPOINTS } from '@/constants';

// Types
import type { User, Resume, AuthResponse } from '@/types';
```

## 🎯 Navigation Quick Reference

### Navigate to Screen
```tsx
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Home')}>
      <Text>Go Home</Text>
    </Pressable>
  );
};
```

### Add Screen to Navigator
```tsx
// In navigation/AppNavigator.tsx
<Stack.Screen 
  name="MyScreen" 
  component={MyScreenComponent}
  options={{ title: 'My Screen' }}
/>
```

## 📋 Common Patterns

### Form with Validation
```tsx
const [formData, setFormData] = useState({ email: '', password: '' });
const [errors, setErrors] = useState({});

const handleSubmit = () => {
  const newErrors = validateForm(formData);
  if (Object.keys(newErrors).length === 0) {
    // Submit form
  } else {
    setErrors(newErrors);
  }
};
```

### API Call with Loading
```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await myService.getAll();
    setData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Conditional Rendering
```tsx
{loading && <Loader />}
{error && <ErrorView message={error} onRetry={fetchData} />}
{data.length === 0 && <EmptyState message="No data" />}
{data && (
  <ScrollView>
    {data.map((item) => (
      <ItemComponent key={item.id} item={item} />
    ))}
  </ScrollView>
)}
```

## 🛠️ Useful Commands

```bash
# Development
npm start                 # Start Metro
npm run android          # Run on Android
npm run ios              # Run on iOS

# Code Quality
npm run lint             # Run ESLint
npm test                 # Run tests

# Debugging
npm start -- --reset-cache    # Clear Metro cache
adb logcat               # Android logs
xcrun simctl list        # iOS devices
```

## 🔍 Debugging Tips

### React DevTools
```bash
# Install React DevTools
npm install -g react-devtools
react-devtools
```

### Redux DevTools
- Install Redux DevTools extension for Chrome
- Check `src/redux/store.ts` for middleware setup

### Native Debugging
```tsx
// Log Redux state
import { useAppSelector } from '@/hooks';
console.log(useAppSelector(state => state));

// Log in any component
console.log('Debug:', variableName);
```

## 📚 File Templates

### Component Template
```tsx
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title?: string;
}

const ComponentName: React.FC<Props> = ({ title = 'Default' }) => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold">{title}</Text>
    </View>
  );
};

export default ComponentName;
```

### Screen Template
```tsx
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useAppDispatch } from '@/hooks';

const ScreenName: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Screen content */}
      </View>
    </ScrollView>
  );
};

export default ScreenName;
```

## ⚡ Performance Tips

1. **Use React.memo for components**
```tsx
export default React.memo(MyComponent);
```

2. **Optimize lists**
```tsx
<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Item {...item} />}
/>
```

3. **Lazy load screens**
```tsx
const Screen = React.lazy(() => import('./Screen'));
```

4. **Debounce expensive operations**
```tsx
const debouncedSearch = debounce((query) => {
  // Search logic
}, 300);
```

## 🔐 Environment Variables

Add to `.env.local`:
```env
REACT_APP_API_URL=http://api.example.com
REACT_APP_ENV=development
```

Access in code:
```tsx
const API_URL = process.env.REACT_APP_API_URL;
```

## 📞 Need Help?

- Check documentation in `PROJECT_STRUCTURE.md`
- Review example files in `src/screens/`
- See `README_SETUP.md` for detailed setup

## 📝 Naming Conventions

- **Files**: `PascalCase.tsx` for components, `camelCase.ts` for utils
- **Functions**: `camelCase` (e.g., `handleClick`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_URL`)
- **Interfaces**: `PascalCase` with `I` prefix or just `Props` suffix
- **Classes**: `PascalCase` (e.g., `StorageService`)

## ✨ Happy Coding!

You're all set. Start building amazing features! 🚀
