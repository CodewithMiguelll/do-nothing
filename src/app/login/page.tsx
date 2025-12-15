import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // you’ll need to export Firestore too

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Check if user record exists
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // Create a new record
    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: new Date(),
      best: 0, // for your Do Nothing timer
    });
    console.log("Created new user record");
  } else {
    console.log("User already exists");
  }
};
