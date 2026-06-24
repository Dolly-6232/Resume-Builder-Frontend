import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from './Header';
import { authStyles as styles } from '../../theme/authStyles';

interface AuthScreenLayoutProps {
  headerTitle: string;
  headerSubtitle: string;
  cardTitle: string;
  cardSubtitle: string;
  children: React.ReactNode;
  showBack?: boolean;
  headerHeight?: number;
}

const AuthScreenLayout: React.FC<AuthScreenLayoutProps> = ({
  headerTitle,
  headerSubtitle,
  cardTitle,
  cardSubtitle,
  children,
  showBack = true,
  headerHeight = 280,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        height={headerHeight}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 24) },
          ]}
        >
          <View style={styles.card}>
            {showBack && navigation.canGoBack() && (
              <TouchableOpacity
                style={styles.backBtnInline}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon name="chevron-back" size={22} color="#334155" />
              </TouchableOpacity>
            )}

            <Text style={styles.cardTitle}>{cardTitle}</Text>
            <Text style={styles.cardSubtitle}>{cardSubtitle}</Text>

            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthScreenLayout;
