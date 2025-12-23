"use client";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ensureUserDoc } from "@/lib/firestore";

const provider = new GoogleAuthProvider();

export const signUpWithGoogle = async () => {
  if (!auth) return;

  const result = await signInWithPopup(auth, provider);
  await ensureUserDoc(result.user);
};

export const logout = async () => {
  if (!auth) return;
  await signOut(auth);
};
