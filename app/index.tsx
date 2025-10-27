import { Redirect } from 'expo-router';

export default function StartScreen() {
  // Redirecciona inmediatamente a la pantalla de login, que es el inicio del Stack de autenticación.
  return <Redirect href="/src/login" />;
}