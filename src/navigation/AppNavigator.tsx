import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import ResumeScreen from '../screens/resume/ResumeScreen';
import ResumeEditorScreen from '../screens/resume/ResumeEditorScreen';
import ResumePreviewScreen from '../screens/resume/ResumePreviewScreen';
import TemplatesScreen from '../screens/templates/TemplatesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import type { AppStackParamList, MainTabParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#2563EB',
      tabBarInactiveTintColor: '#64748B',
      tabBarStyle: {
        height: 68,
        paddingBottom: 10,
        paddingTop: 8,
        borderTopColor: '#E2E8F0',
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '700',
      },
      tabBarIcon: ({ color, size }) => {
        const icons: Record<keyof MainTabParamList, string> = {
          HomeTab: 'home-outline',
          ResumesTab: 'document-text-outline',
          TemplatesTab: 'albums-outline',
          ProfileTab: 'person-circle-outline',
        };

        return <Icon name={icons[route.name]} color={color} size={size} />;
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="ResumesTab" component={ResumeScreen} options={{ title: 'Resumes' }} />
    <Tab.Screen name="TemplatesTab" component={TemplatesScreen} options={{ title: 'Templates' }} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ResumeEditor" component={ResumeEditorScreen} />
      <Stack.Screen name="ResumePreview" component={ResumePreviewScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
