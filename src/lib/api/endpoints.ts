import { apiClient } from "@/lib/api/client";

export type HealthcheckDto = {
  status: "ok" | "degraded" | "down";
  timestamp: string;
};

export async function getHealthcheck(): Promise<HealthcheckDto> {
  return apiClient<HealthcheckDto>({
    path: "/health",
    method: "GET",
    cache: "no-store",
  });
}
