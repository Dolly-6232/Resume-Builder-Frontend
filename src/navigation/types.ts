export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyEmail: { email?: string } | undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ResumesTab: undefined;
  TemplatesTab: undefined;
  ProfileTab: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  ResumeEditor: { resumeId?: string; template?: string } | undefined;
  ResumePreview: { resumeId: string };
};
