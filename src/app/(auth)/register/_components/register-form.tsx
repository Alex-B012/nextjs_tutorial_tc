import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/tools/auth-client";
import { useRouter } from "next/navigation";
import z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const registerSchema = z.object({
  username: z.string().min(2, "Minimum 2 characters"),
  email: z.string().email("Incorrect email format"),
  password: z.string().min(6, "Minimum 5 characters"),
});

const callbackURL = "/";
const loginURL = "/login";

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signUp.email({
        name: value.username,
        username: value.username,
        email: value.email,
        password: value.password,
        callbackURL: callbackURL,
      });
      if (error) alert(error.message);
      else router.push(callbackURL);
    },
    validators: {
      onSubmit: registerSchema,
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
        <h1 className="text-2xl font-medium text-white"> Start your story </h1>
        <p className="text-muted-foreground text-sm">
          Tell about movies with us
        </p>
      </div>

      <form.Field
        name="username"
        validators={{ onChange: registerSchema.shape.username }}
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                placeholder="vito_corleone"
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
        name="email"
        validators={{ onChange: registerSchema.shape.email }}
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={Field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                type="email"
                placeholder="vito.corleone@email.com"
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
        validators={{ onChange: registerSchema.shape.password }}
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={Field.name}>Password</FieldLabel>
              <Input
                id={field.name}
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
            {isSubmitting ? "Loading..." : "Continue"}
          </Button>
        )}
      />

      <p className="mt-1 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={loginURL} className="text-foreground hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};
