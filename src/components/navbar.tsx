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
    <nav className="bg-[#121212] text-white border-b border-gray-800 p-4.5 flex items-center justify-between relative">
      {/* Logo */}
      <Link href="/">
        <span className="font-bold text-xl cursor-pointer">Do Nothing</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {!user ? (
          <>
            <button
              onClick={handleGoogleLogin}
              className="text-black rounded-md p-2 bg-white"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <span>Signed in as {user.displayName}</span>
            <button
              onClick={handleSignOut}
              className="text-black rounded-md p-2 bg-white hover:text-gray-300 transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 relative"
        >
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white my-1 transition duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full right-0 w-48 bg-black border border-gray-700 rounded-md shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {!user ? (
          <>
            <button
              onClick={handleGoogleLogin}
              className="text-black bg-white p-3"
            >
              Log In
            </button>
          </>
        ) : (
          <>
            <span className="px-3 py-3 text-white">
              Signed in as {user.displayName}
            </span>
            <button
              onClick={handleSignOut}
              className="text-black bg-white p-3 hover:bg-gray-200 transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
