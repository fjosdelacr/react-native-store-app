import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

import {
  // @ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirebaseConfig } from "./config";

// Initialize Firebase app — singleton a nivel de aplicación
export const app = initializeApp(getFirebaseConfig());

/**
 * initializeAuth en lugar de getAuth para configurar la persistencia
 * con AsyncStorage. En React Native, Firebase no puede usar localStorage
 * (web), por lo que se necesita getReactNativePersistence para que la
 * sesión del usuario sobreviva entre reinicios de la app.
 *
 * En runtime Metro resuelve la versión react-native de firebase/auth
 * que contiene getReactNativePersistence.
 */
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firebaseDB = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
export const storage = getStorage(app);
