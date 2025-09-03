// components/CheckoutButtons.tsx
"use client";

export function CheckoutButton() {
  const onClick = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert(data?.error || "Kon checkout niet starten");
  };
  return (
    <button onClick={onClick} className="rounded-xl bg-black text-white px-4 py-2 hover:opacity-90">
      Upgrade naar Pro
    </button>
  );
}

export function BillingPortalButton() {
  const onClick = async () => {
    const res = await fetch("/api/portal", { method: "POST" });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert(data?.error || "Kon portal niet openen");
  };
  return (
    <button onClick={onClick} className="rounded-xl border px-4 py-2 hover:bg-gray-50">
      Facturatie beheren
    </button>
  );
}
