import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import ScreenLayout from '../../components/common/ScreenLayout';
import { getTemplateById } from '../../constants/templates.constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchResumes, setCurrentResume } from '../../redux/slices/resumeSlice';
import type { AppStackParamList } from '../../navigation/types';

type PreviewRoute = RouteProp<AppStackParamList, 'ResumePreview'>;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ResumePreviewScreen: React.FC = () => {
  const route = useRoute<PreviewRoute>();
  const dispatch = useAppDispatch();
  const { resumes, currentResume, loading } = useAppSelector(state => state.resume);

  const resume = useMemo(
    () => resumes.find(item => item.id === route.params.resumeId) || currentResume,
    [resumes, route.params.resumeId, currentResume],
  );

  useEffect(() => {
    if (resumes.length === 0) {
      dispatch(fetchResumes());
    }
  }, [dispatch, resumes.length]);

  useEffect(() => {
    if (resume) {
      dispatch(setCurrentResume(resume));
    }
  }, [dispatch, resume]);

  if (loading && !resume) {
    return (
      <ScreenLayout showBack title="Preview" subtitle="Loading resume...">
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </ScreenLayout>
    );
  }

  if (!resume) {
    return (
      <ScreenLayout showBack title="Preview" subtitle="Resume not found.">
        <Text style={styles.emptyText}>This resume could not be loaded.</Text>
      </ScreenLayout>
    );
  }

  const template = getTemplateById(resume.template);
  const personal = resume.content.personal;

  return (
    <ScreenLayout
      showBack
      title="Preview"
      subtitle={`${template?.name || resume.template} template`}
    >
      <View style={styles.previewCard}>
        <View style={styles.headerBlock}>
          <View style={[styles.templateIcon, { backgroundColor: `${template?.accent || '#2563EB'}18` }]}>
            <Icon name={template?.icon || 'document-text-outline'} size={24} color={template?.accent || '#2563EB'} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{personal?.fullName || resume.title}</Text>
            <Text style={styles.role}>{personal?.role || 'Professional'}</Text>
          </View>
          {typeof resume.atsScore === 'number' ? (
            <View style={styles.atsBadge}>
              <Text style={styles.atsLabel}>ATS</Text>
              <Text style={styles.atsValue}>{resume.atsScore}%</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.contactRow}>
          {personal?.email ? <Text style={styles.contactItem}>{personal.email}</Text> : null}
          {personal?.phone ? <Text style={styles.contactItem}>{personal.phone}</Text> : null}
          {personal?.location ? <Text style={styles.contactItem}>{personal.location}</Text> : null}
        </View>

        {resume.content.summary ? (
          <Section title="Summary">
            <Text style={styles.bodyText}>{resume.content.summary}</Text>
          </Section>
        ) : null}

        {(resume.content.skills || []).length > 0 ? (
          <Section title="Skills">
            <View style={styles.skillsWrap}>
              {resume.content.skills?.map(skill => (
                <View key={skill} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </Section>
        ) : null}

        {(resume.content.experience || []).length > 0 ? (
          <Section title="Experience">
            {resume.content.experience?.map(item => (
              <View key={`${item.company}-${item.role}`} style={styles.listItem}>
                <Text style={styles.itemTitle}>{item.role}</Text>
                <Text style={styles.itemSubtitle}>
                  {item.company} · {item.duration}
                </Text>
                {item.description ? <Text style={styles.bodyText}>{item.description}</Text> : null}
              </View>
            ))}
          </Section>
        ) : null}

        {(resume.content.education || []).length > 0 ? (
          <Section title="Education">
            {resume.content.education?.map(item => (
              <View key={`${item.school}-${item.degree}`} style={styles.listItem}>
                <Text style={styles.itemTitle}>{item.degree}</Text>
                <Text style={styles.itemSubtitle}>
                  {item.school} · {item.year}
                </Text>
              </View>
            ))}
          </Section>
        ) : null}
      </View>
    </ScreenLayout>
  );
};

export default ResumePreviewScreen;

const styles = StyleSheet.create({
  loaderWrap: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 15,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  role: {
    marginTop: 4,
    fontSize: 15,
    color: '#2563EB',
    fontWeight: '700',
  },
  atsBadge: {
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  atsLabel: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '700',
  },
  atsValue: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '800',
  },
  contactRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  contactItem: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    backgroundColor: '#EFF6FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#1D4ED8',
    fontWeight: '700',
    fontSize: 12,
  },
  listItem: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  itemSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6,
  },
});
