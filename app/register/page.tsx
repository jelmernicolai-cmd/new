// app/register/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Registratie mislukt");
      return;
    }
    // redirect to login
    window.location.href = "/login";
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Account aanmaken</h1>
        <p className="text-sm text-gray-600 mt-1">Start met een gratis account.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium">Naam</label>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
              placeholder="Voornaam Achternaam"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">E-mail</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
              placeholder="jij@bedrijf.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Wachtwoord</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
              placeholder="Minimaal 8 tekens"
            />
          </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black text-white py-2.5 font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Bezig..." : "Account maken"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Al een account? <Link href="/login" className="underline">Inloggen</Link>
        </p>
      </div>
    </div>
  );
}
