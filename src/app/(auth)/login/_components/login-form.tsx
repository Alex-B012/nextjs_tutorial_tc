"use client";

import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/tools/auth-client";
import { useRouter } from "next/navigation";
import z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const loginSchema = z.object({
  identifier: z.string().min(2, "Enter email or username"),
  password: z.string().min(6, "Minimum 6 characters"),
});

const callbackURL = "/";
const registerURL = "/register";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      const isEmail = value.identifier.includes("@");
      const authenticate = isEmail
        ? authClient.signIn.email({
            email: value.identifier,
            password: value.password,
            callbackURL: callbackURL,
          })
        : authClient.signIn.username({
            username: value.identifier,
            password: value.password,
            callbackURL: callbackURL,
          });

      const { error } = await authenticate;

      if (error) {
        alert(error.message || "Authentication error");
      } else {
        router.push(callbackURL);
        router.refresh();
      }
    },
    validators: {
      onSubmit: loginSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4 p-8 bg-surface backdrop-blur-xl rounded-2xl w-full max-w-105 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-medium text-white">Welcome back!</h1>
        <p className="text-muted-foreground text-sm">Enter your credentials</p>
      </div>

      <form.Field
        name="identifier"
        validators={{ onChange: loginSchema.shape.identifier }}
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Email or username</FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                placeholder="tyler_jones"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
              />

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />
      <form.Field
        name="password"
        validators={{ onChange: loginSchema.shape.password }}
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="******"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
              />

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Loading..." : "Sign In"}
          </Button>
        )}
      />

      <p className="mt-1 text-center text-sm text-muted-foreground">
        Do not have an account?{" "}
        <Link href={registerURL} className="text-foreground hover:underline">
          Create account
        </Link>
      </p>
    </form>
  );
};
