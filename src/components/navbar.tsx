"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Helper function to fetch the user's name from the public table
    const fetchUserProfile = async (userId: string) => {
      const { data, error } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setProfileName(data.full_name);
      }
    };

    // 1. Fetch the user session on initial load
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    };
    getUser();

    // 2. Set up a listener for auth state changes (login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfileName(null); // Clear profile name on logout
      }
    });

    // Cleanup the listener when the component unmounts
    return () => subscription.unsubscribe();
  }, [supabase]);

  const signUpWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

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
              Sign in
            </button>
          ) : (
            <>
              {/* Display fetched profile name, fallback to email if empty */}
              <span className="text-sm opacity-60">
                {profileName || user.email}
              </span>
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
              <span className="text-sm opacity-60">
                {profileName || user.email}
              </span>
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
