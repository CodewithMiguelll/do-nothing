// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  // Grab the URL and the search parameters (like ?code=...)
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // 'next' is an optional param to redirect the user to a specific page after login
  // If it's not there, we default to the homepage ('/')
  const next = searchParams.get("next") ?? "/";

  if (code) {
    // Initialize our secure server-side Supabase client
    const supabase = await createClient();

    // Securely exchange the code for a session cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Success! Send them to the app
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error("Auth callback error:", error.message);
    }
  }

  // If there's no code or an error occurred, send them to an error page or back to the homepage
  return NextResponse.redirect(`${origin}/?error=auth-failed`);
}
