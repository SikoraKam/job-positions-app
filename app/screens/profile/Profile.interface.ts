export interface ProfileScreenProps {
  onUpload: VoidFunction;
  onDeleteResume: VoidFunction;
  resumeUri: string | undefined;
  onLogout: VoidFunction;
}
