import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  contentStyle?: ViewStyle;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  subtitle,
  children,
  scrollable = true,
  showBack = false,
  rightAction,
  contentStyle,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const body = (
    <View style={[styles.content, contentStyle, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      {children}
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1D4ED8" />
      <LinearGradient colors={['#1D4ED8', '#2563EB', '#3B82F6']} style={styles.header}>
        <View style={[styles.headerInner, { paddingTop: insets.top + 12 }]}>
          <View style={styles.headerRow}>
            {showBack && navigation.canGoBack() ? (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon name="chevron-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <View style={styles.backPlaceholder} />
            )}

            {rightAction ? <View>{rightAction}</View> : <View style={styles.backPlaceholder} />}
          </View>

          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </LinearGradient>

      {scrollable ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {body}
        </ScrollView>
      ) : (
        <View style={styles.scroll}>{body}</View>
      )}
    </View>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerInner: {
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.88)',
  },
  scroll: {
    flex: 1,
    marginTop: -18,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
