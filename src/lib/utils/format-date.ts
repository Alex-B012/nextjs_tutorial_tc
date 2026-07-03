export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
