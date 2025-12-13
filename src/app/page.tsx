"use client";

import { useEffect, useState } from "react";

const ROASTS = [
  "You moved. Weak.",
  "Stillness broken.",
  "The monks are disappointed.",
  "You twitched. Shame.",
  "Multitasking is a sin.",
];

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");
  const [best, setBest] = useState(0);

  // Load best time
  useEffect(() => {
    const stored = localStorage.getItem("do-nothing-best");
    if (stored) setBest(Number(stored));
  }, []);

  // Timer
  useEffect(() => {
    if (lost) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [lost]);

  // Failure logic
  useEffect(() => {
    const fail = (reason: string) => {
      setLost(true);

      if (seconds > best) {
        setBest(seconds);
        localStorage.setItem("do-nothing-best", String(seconds));
      }

      setSeconds(0);
      setMessage(
        `${ROASTS[Math.floor(Math.random() * ROASTS.length)]} (${reason})`
      );
    };

    const onMouseMove = () => fail("Mouse moved");
    const onKeyDown = () => fail("Key pressed");
    const onClick = () => fail("Click detected");
    const onVisibilityChange = () => {
      if (document.hidden) fail("Tab switch");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onClick);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClick);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [seconds, best]);

  // Auto reset after loss
  useEffect(() => {
    if (!lost) return;

    const timeout = setTimeout(() => {
      setLost(false);
      setMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [lost]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 select-none">
      <h1 className="text-4xl font-bold tracking-wide">Do Nothing</h1>

      <p className="text-7xl tabular-nums">{seconds}s</p>

      <p className="text-sm opacity-60">Best: {best}s</p>

      {lost && <p className="text-red-500 animate-pulse">{message}</p>}

      <p className="text-xs opacity-40 text-center">
        Move nothing. Touch nothing. Remain still.<br/> I dare you.
      </p>
    </main>
  );
}
