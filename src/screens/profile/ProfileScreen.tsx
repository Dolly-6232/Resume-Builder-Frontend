import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ScreenLayout from '../../components/common/ScreenLayout';
import GradientButton from '../../components/auth/GradientButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutUser } from '../../redux/slices/authSlice';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert('Sign out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  const initials = user?.name
    ?.split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <ScreenLayout title="Profile" subtitle="Manage your account and subscription.">
      <View style={styles.profileCard}>
        {user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{initials || 'RB'}</Text>
          </View>
        )}

        <Text style={styles.name}>{user?.name || 'Resume Builder User'}</Text>
        <Text style={styles.email}>{user?.email || 'No email on file'}</Text>

        <View style={styles.planBadge}>
          <Icon name="star-outline" size={16} color="#2563EB" />
          <Text style={styles.planText}>
            {user?.isPremium ? 'Premium plan' : 'Free plan'}
          </Text>
        </View>
      </View>

      <View style={styles.menuCard}>
        <MenuRow icon="mail-outline" label="Email" value={user?.email || '--'} />
        <MenuRow
          icon="shield-checkmark-outline"
          label="Subscription"
          value={user?.subscriptionType || 'free'}
        />
        <MenuRow icon="sparkles-outline" label="Premium" value={user?.isPremium ? 'Active' : 'Inactive'} />
      </View>

      <GradientButton
        title={loading ? 'Signing out...' : 'Sign out'}
        disabled={loading}
        onPress={handleLogout}
      />
    </ScreenLayout>
  );
};

const MenuRow: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <View style={styles.menuRow}>
    <View style={styles.menuLeft}>
      <Icon name={icon} size={18} color="#64748B" />
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Text style={styles.menuValue}>{value}</Text>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 14,
  },
  avatarFallback: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  email: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
  },
  planBadge: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  planText: {
    marginLeft: 6,
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 13,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
  },
  menuValue: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
