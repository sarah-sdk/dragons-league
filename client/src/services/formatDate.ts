export default function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
