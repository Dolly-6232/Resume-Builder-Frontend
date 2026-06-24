import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ScreenLayout from '../../components/common/ScreenLayout';
import EmptyState from '../../components/common/EmptyState';
import { getTemplateById } from '../../constants/templates.constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteResume, fetchResumes, setCurrentResume } from '../../redux/slices/resumeSlice';
import type { AppStackParamList, MainTabParamList } from '../../navigation/types';
import type { Resume } from '../../types';

type ResumeNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'ResumesTab'>,
  NativeStackNavigationProp<AppStackParamList>
>;

const ResumeCard: React.FC<{
  resume: Resume;
  onEdit: () => void;
  onPreview: () => void;
  onDelete: () => void;
}> = ({ resume, onEdit, onPreview, onDelete }) => {
  const template = getTemplateById(resume.template);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.templateBadge, { backgroundColor: `${template?.accent || '#2563EB'}18` }]}>
          <Icon name={template?.icon || 'document-outline'} size={20} color={template?.accent || '#2563EB'} />
        </View>
        <View style={styles.cardMeta}>
          <Text style={styles.cardTitle}>{resume.title}</Text>
          <Text style={styles.cardSubtitle}>
            {template?.name || resume.template} · Updated{' '}
            {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : 'recently'}
          </Text>
        </View>
        {typeof resume.atsScore === 'number' ? (
          <View style={styles.atsBadge}>
            <Text style={styles.atsText}>{resume.atsScore}%</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Icon name="create-outline" size={18} color="#2563EB" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onPreview}>
          <Icon name="eye-outline" size={18} color="#0F766E" />
          <Text style={[styles.actionText, { color: '#0F766E' }]}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Icon name="trash-outline" size={18} color="#DC2626" />
          <Text style={[styles.actionText, { color: '#DC2626' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ResumeScreen: React.FC = () => {
  const navigation = useNavigation<ResumeNav>();
  const dispatch = useAppDispatch();
  const { resumes, loading, saving } = useAppSelector(state => state.resume);

  const loadResumes = useCallback(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const handleEdit = (resume: Resume) => {
    dispatch(setCurrentResume(resume));
    navigation.navigate('ResumeEditor', { resumeId: resume.id });
  };

  const handlePreview = (resume: Resume) => {
    dispatch(setCurrentResume(resume));
    navigation.navigate('ResumePreview', { resumeId: resume.id });
  };

  const handleDelete = (resume: Resume) => {
    Alert.alert('Delete resume', `Remove "${resume.title}" permanently?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await dispatch(deleteResume(resume.id));
        },
      },
    ]);
  };

  return (
    <ScreenLayout
      title="My Resumes"
      subtitle="Manage and improve your saved resumes."
      rightAction={
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('ResumeEditor', { template: 'modern' })}
        >
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      }
    >
      {loading && resumes.length === 0 ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : resumes.length === 0 ? (
        <EmptyState
          message="No resumes yet. Create your first one from the home screen or tap + above."
          icon="📄"
        />
      ) : (
        <View>
          {resumes.map(resume => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onEdit={() => handleEdit(resume)}
              onPreview={() => handlePreview(resume)}
              onDelete={() => handleDelete(resume)}
            />
          ))}
        </View>
      )}

      {saving ? (
        <View style={styles.savingBanner}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.savingText}>Saving changes...</Text>
        </View>
      ) : null}
    </ScreenLayout>
  );
};

export default ResumeScreen;

const styles = StyleSheet.create({
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderWrap: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardMeta: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748B',
  },
  atsBadge: {
    backgroundColor: '#ECFDF5',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  atsText: {
    color: '#059669',
    fontWeight: '800',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  savingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  savingText: {
    marginLeft: 8,
    color: '#64748B',
    fontWeight: '600',
  },
});
