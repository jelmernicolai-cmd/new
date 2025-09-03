// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">PharmGTN</Link>
          <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
          <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900">Templates</Link>
          <Link href="/portal" className="text-sm text-gray-600 hover:text-gray-900">Portal</Link>
        </div>
        <div className="flex items-center gap-3">
          {!session ? (
            <>
              <Link href="/login" className="text-sm">Inloggen</Link>
              <Link href="/register" className="rounded-lg bg-black text-white text-sm px-3 py-1.5 hover:opacity-90">
                Probeer gratis
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">{session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border text-sm px-3 py-1.5 hover:bg-gray-50"
              >
                Uitloggen
              </button>
              <Link href="/app" className="rounded-lg bg-black text-white text-sm px-3 py-1.5 hover:opacity-90">
                Naar Portal
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
