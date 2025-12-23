import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { User } from "firebase/auth";

// Create user doc if it doesn't exist
export const ensureUserDoc = async (user: User) => {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email,
      displayName: user.displayName,
      bestScore: 0,
      createdAt: serverTimestamp(),
    });
  }
};

// Fetch user score
export const getUserScore = async (uid: string) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data().bestScore as number;
  }

  return 0;
};

// Update best score
export const updateBestScore = async (uid: string, score: number) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    bestScore: score,
  });
};
