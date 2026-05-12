function getPublicEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  apiBaseUrl: getPublicEnv("NEXT_PUBLIC_API_BASE_URL"),
} as const;
