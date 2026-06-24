import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import ScreenLayout from '../../components/common/ScreenLayout';
import GradientButton from '../../components/auth/GradientButton';
import { createEmptyResumeContent, getTemplateById } from '../../constants/templates.constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  createResume,
  fetchResumes,
  setCurrentResume,
  updateResume,
} from '../../redux/slices/resumeSlice';
import type { AppStackParamList } from '../../navigation/types';
import type { ResumeContent, ResumePayload } from '../../types';

type EditorNav = NativeStackNavigationProp<AppStackParamList, 'ResumeEditor'>;
type EditorRoute = RouteProp<AppStackParamList, 'ResumeEditor'>;

const ResumeEditorScreen: React.FC = () => {
  const navigation = useNavigation<EditorNav>();
  const route = useRoute<EditorRoute>();
  const dispatch = useAppDispatch();
  const { resumes, currentResume, saving } = useAppSelector(state => state.resume);

  const resumeId = route.params?.resumeId;
  const templateId = route.params?.template || 'modern';
  const template = getTemplateById(templateId);

  const existingResume = useMemo(
    () => (resumeId ? resumes.find(resume => resume.id === resumeId) || currentResume : null),
    [resumeId, resumes, currentResume],
  );

  const [title, setTitle] = useState(existingResume?.title || 'My Resume');
  const [content, setContent] = useState<ResumeContent>(
    existingResume?.content || createEmptyResumeContent(),
  );
  const [skillsInput, setSkillsInput] = useState(
    (existingResume?.content.skills || []).join(', '),
  );

  useEffect(() => {
    if (resumes.length === 0) {
      dispatch(fetchResumes());
    }
  }, [dispatch, resumes.length]);

  useEffect(() => {
    if (existingResume) {
      setTitle(existingResume.title);
      setContent(existingResume.content);
      setSkillsInput((existingResume.content.skills || []).join(', '));
    }
  }, [existingResume]);

  const updatePersonal = (field: keyof NonNullable<ResumeContent['personal']>, value: string) => {
    setContent(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const payload: ResumePayload = {
      id: existingResume?.id,
      title: title.trim() || 'My Resume',
      template: existingResume?.template || templateId,
      content: {
        ...content,
        skills: skillsInput
          .split(',')
          .map(skill => skill.trim())
          .filter(Boolean),
      },
    };

    const action = existingResume?.id
      ? await dispatch(updateResume({ ...payload, id: existingResume.id }))
      : await dispatch(createResume(payload));

    if (createResume.rejected.match(action) || updateResume.rejected.match(action)) {
      Alert.alert('Save failed', String(action.payload || 'Unable to save resume'));
      return;
    }

    if (action.payload) {
      dispatch(setCurrentResume(action.payload));
      navigation.navigate('ResumePreview', { resumeId: action.payload.id });
    }
  };

  return (
    <ScreenLayout
      showBack
      scrollable={false}
      title={existingResume ? 'Edit Resume' : 'New Resume'}
      subtitle={`${template?.name || 'Modern'} template · fill in your details below.`}
    >
      <ScrollView
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Field label="Resume title" value={title} onChangeText={setTitle} placeholder="Software Engineer Resume" />
        <Field
          label="Full name"
          value={content.personal?.fullName || ''}
          onChangeText={value => updatePersonal('fullName', value)}
          placeholder="Alex Johnson"
        />
        <Field
          label="Job title"
          value={content.personal?.role || ''}
          onChangeText={value => updatePersonal('role', value)}
          placeholder="Frontend Developer"
        />
        <Field
          label="Email"
          value={content.personal?.email || ''}
          onChangeText={value => updatePersonal('email', value)}
          placeholder="alex@example.com"
          keyboardType="email-address"
        />
        <Field
          label="Phone"
          value={content.personal?.phone || ''}
          onChangeText={value => updatePersonal('phone', value)}
          placeholder="+1 555 0100"
          keyboardType="phone-pad"
        />
        <Field
          label="Location"
          value={content.personal?.location || ''}
          onChangeText={value => updatePersonal('location', value)}
          placeholder="San Francisco, CA"
        />
        <Field
          label="Professional summary"
          value={content.summary || ''}
          onChangeText={value => setContent(prev => ({ ...prev, summary: value }))}
          placeholder="Brief overview of your experience and strengths"
          multiline
        />
        <Field
          label="Skills (comma separated)"
          value={skillsInput}
          onChangeText={setSkillsInput}
          placeholder="React Native, TypeScript, Node.js"
        />

        <View style={styles.saveWrap}>
          <GradientButton
            title={saving ? 'Saving...' : 'Save & Preview'}
            disabled={saving}
            onPress={handleSave}
          />
          {saving ? <ActivityIndicator style={styles.loader} color="#2563EB" /> : null}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const Field: React.FC<{
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}> = ({ label, value, onChangeText, placeholder, multiline, keyboardType = 'default' }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.inputMultiline]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#94A3B8"
      multiline={multiline}
      keyboardType={keyboardType}
      autoCapitalize={multiline ? 'sentences' : 'words'}
    />
  </View>
);

export default ResumeEditorScreen;

const styles = StyleSheet.create({
  formScroll: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 32,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  inputMultiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  saveWrap: {
    marginTop: 8,
  },
  loader: {
    marginTop: 12,
  },
});
