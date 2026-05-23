import { redirect } from "next/navigation";

/**
 * Racine du site — redirige systématiquement vers le dashboard.
 * La redirection s'effectue côté serveur (HTTP 307), donc instantanée
 * et sans flash de contenu côté client.
 */
export default function RootPage() {
  redirect("/dashboard");
}