"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const loggedUser = result.user;

    // Ensure Firestore record exists
    const userRef = doc(db, "users", loggedUser.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        createdAt: new Date(),
        best: 0,
      });
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="border-b border-gray-800 bg-black text-white p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <span className="font-bold text-xl cursor-pointer">Do Nothing</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {!user ? (
          <>
            <button
              onClick={handleGoogleLogin}
              className="text-[#121212] rounded-md p-2 bg-[#f9faf9] hover:text-gray-300"
            >
              Log In
            </button>
            <button
              onClick={handleGoogleLogin}
              className="text-[#121212] rounded-md p-2 bg-[#f9faf9] hover:text-gray-300"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <span>Signed in as {user.displayName}</span>
            <button
              onClick={handleSignOut}
              className="text-[#121212] rounded-md p-2 bg-[#f9faf9] hover:text-gray-300"
            >
              Sign Out
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col space-y-2 mt-2 md:hidden">
          {!user ? (
            <>
              <button
                onClick={handleGoogleLogin}
                className="text-[#121212] rounded-md p-2 bg-[#f9faf9] hover:text-gray-300"
              >
                Log In
              </button>
              <button
                onClick={handleGoogleLogin}
                className="text-[#121212] rounded-md p-2 bg-[#f9faf9] hover:text-gray-300"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span>Signed in as {user.displayName}</span>
              <button
                onClick={handleSignOut}
                className="text-[#121212] rounded-md p-2 bg-[#f9faf9] hover:text-gray-300"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
