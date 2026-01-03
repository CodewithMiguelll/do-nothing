"use client";

import Link from "next/link";
import { useState } from "react";
import { signUpWithGoogle, logout } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/">
          <span className="font-bold text-xl">Do Nothing</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <button
              onClick={signUpWithGoogle}
              className="bg-white font-medium text-black px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Sign in with Google
            </button>
          ) : (
            <>
              <span className="text-sm opacity-60">{user.displayName}</span>
              <button
                onClick={logout}
                className="bg-red-500 font-medium  px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Log out
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
          {!user ? (
            <button
              onClick={() => {
                signUpWithGoogle();
                setMenuOpen(false);
              }}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Sign in with Google
            </button>
          ) : (
            <>
              <span className="text-sm opacity-60">{user.displayName}</span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 px-3 py-2 rounded hover:bg-red-600 transition"
              >
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
