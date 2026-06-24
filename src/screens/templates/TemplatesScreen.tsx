import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ScreenLayout from '../../components/common/ScreenLayout';
import { RESUME_TEMPLATES } from '../../constants/templates.constants';
import type { AppStackParamList, MainTabParamList } from '../../navigation/types';

type TemplatesNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'TemplatesTab'>,
  NativeStackNavigationProp<AppStackParamList>
>;

const TemplatesScreen: React.FC = () => {
  const navigation = useNavigation<TemplatesNav>();

  return (
    <ScreenLayout
      title="Templates"
      subtitle="Choose a layout optimized for your career stage."
    >
      <View style={styles.grid}>
        {RESUME_TEMPLATES.map(template => (
          <TouchableOpacity
            key={template.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ResumeEditor', { template: template.id })}
          >
            <View style={[styles.iconWrap, { backgroundColor: `${template.accent}18` }]}>
              <Icon name={template.icon} size={24} color={template.accent} />
            </View>
            <Text style={styles.name}>{template.name}</Text>
            <Text style={styles.description}>{template.description}</Text>
            <View style={styles.useRow}>
              <Text style={[styles.useText, { color: template.accent }]}>Use template</Text>
              <Icon name="arrow-forward" size={16} color={template.accent} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenLayout>
  );
};

export default TemplatesScreen;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  description: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748B',
    minHeight: 36,
  },
  useRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  useText: {
    fontSize: 13,
    fontWeight: '800',
    marginRight: 4,
  },
});
