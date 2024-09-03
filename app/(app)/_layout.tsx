import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../components/context/AuthContext";

export default function AppLayout() {
  const { authState } = useAuth();
  if (!authState.authenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/sign-up" />
      <Stack.Screen name="(app)/home" options={{ headerShown: true }} />
    </Stack>
  );
}
