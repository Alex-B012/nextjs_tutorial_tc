import { cn } from "@/lib/utils/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-md border border-none bg-input px-2.5 py-2 text-base transition-colors outline-none placeholder:text-input-foreground/65 text-input-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive md:text-sm resize-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
