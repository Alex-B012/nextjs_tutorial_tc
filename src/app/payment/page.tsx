"use client";

export default function PaymentPage() {
  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("STRIPE URL:", process.env.STRIPE_SECRET_KEY);

  return <div className="p-10">Payment Form</div>;
}
