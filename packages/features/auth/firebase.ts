import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

// Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { auth, googleProvider, microsoftProvider };

export async function signInWithGoogle() {
  try {
    await auth.signInWithPopup(googleProvider);
    alert('Signed in as ' + (auth.currentUser?.displayName || auth.currentUser?.email));
  } catch (e) {
    console.error(e);
    alert('Google sign-in failed');
  }
}

export async function signInWithMicrosoft() {
  try {
    await auth.signInWithPopup(microsoftProvider);
    alert('Signed in as ' + (auth.currentUser?.displayName || auth.currentUser?.email));
  } catch (e) {
    console.error(e);
    alert('Microsoft sign-in failed');
  }
}

export function signInWithApple() {
  // Placeholder: Apple Sign-In requires server-side JWT nonce handling.
  alert('Apple sign-in flow should redirect to your backend to handle the OAuth exchange.');
}
