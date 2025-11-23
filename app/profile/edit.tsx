import { EditProfileScreen } from '@/components/screens/Profile/EditProfile/EditProfileScreen';
import { Stack } from 'expo-router';

export default function EditProfilePage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditProfileScreen />
    </>
  );
}