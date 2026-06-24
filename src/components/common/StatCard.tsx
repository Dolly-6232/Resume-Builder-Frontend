import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  accent: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, accent }) => (
  <View style={styles.card}>
    <View style={[styles.iconWrap, { backgroundColor: `${accent}18` }]}>
      <Icon name={icon} size={22} color={accent} />
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default StatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  label: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
});

interface QuickActionProps {
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionProps> = ({
  title,
  subtitle,
  icon,
  accent,
  onPress,
}) => (
  <TouchableOpacity style={actionStyles.card} activeOpacity={0.85} onPress={onPress}>
    <View style={[actionStyles.iconWrap, { backgroundColor: accent }]}>
      <Icon name={icon} size={22} color="#FFFFFF" />
    </View>
    <View style={actionStyles.textWrap}>
      <Text style={actionStyles.title}>{title}</Text>
      <Text style={actionStyles.subtitle}>{subtitle}</Text>
    </View>
    <Icon name="chevron-forward" size={20} color="#94A3B8" />
  </TouchableOpacity>
);

const actionStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },
});
