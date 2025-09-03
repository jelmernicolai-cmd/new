// app/api/portal/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" } as any);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";

  const customers = await stripe.customers.list({ email: session.user.email, limit: 1 });
  const customer = customers.data[0] || (await stripe.customers.create({ email: session.user.email }));

  const portal = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${origin}/app`,
  });

  return NextResponse.json({ url: portal.url });
}
