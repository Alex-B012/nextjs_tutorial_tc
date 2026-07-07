import { Metadata } from "next";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Registration",
  description: "Create an account on our website",
};

export default async function RegisterPage() {
  return <RegisterForm />;
}
