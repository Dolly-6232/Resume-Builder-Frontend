import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList, MainTabParamList } from '../../navigation/types';

type HomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'HomeTab'>,
  NativeStackNavigationProp<AppStackParamList>
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNav>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { resumes } = useAppSelector(state => state.resume);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  const avgAts =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((sum, resume) => sum + (resume.atsScore || 0), 0) / resumes.length,
        )
      : 0;

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <ScreenLayout
      title={`Hi, ${firstName}`}
      subtitle="Build ATS-friendly resumes and land your next role faster."
    >
      <View style={styles.statsRow}>
        <StatCard label="Resumes" value={resumes.length} icon="document-text-outline" accent="#2563EB" />
        <View style={styles.gap} />
        <StatCard label="Avg ATS" value={avgAts ? `${avgAts}%` : '--'} icon="analytics-outline" accent="#059669" />
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>

      <QuickActionCard
        title="Create new resume"
        subtitle="Start from scratch with a professional template"
        icon="add-circle-outline"
        accent="#2563EB"
        onPress={() => navigation.navigate('ResumeEditor', { template: 'modern' })}
      />
      <QuickActionCard
        title="Browse templates"
        subtitle="Pick a design that matches your industry"
        icon="albums-outline"
        accent="#9333EA"
        onPress={() => navigation.navigate('TemplatesTab')}
      />
      <QuickActionCard
        title="My resumes"
        subtitle="Edit, preview, or export your saved resumes"
        icon="folder-open-outline"
        accent="#0F766E"
        onPress={() => navigation.navigate('ResumesTab')}
      />

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Pro tip</Text>
        <Text style={styles.tipText}>
          Keep your summary under 3 lines and use action verbs in experience bullets to boost ATS scores.
        </Text>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  gap: {
    width: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  tipCard: {
    marginTop: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D4ED8',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
});
