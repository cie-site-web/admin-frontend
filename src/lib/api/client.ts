import { env } from "@/config/env";
import type { ApiClientRequest, ApiError, ApiErrorCode } from "@/types/api";

function mapStatusToCode(status: number): ApiErrorCode {
  if (status === 400) return "BAD_REQUEST";
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  if (status === 422) return "UNPROCESSABLE_ENTITY";
  if (status === 429) return "RATE_LIMITED";
  if (status >= 500) return "SERVER_ERROR";
  return "UNKNOWN_ERROR";
}

function normalizeApiError(params: {
  status: number;
  code?: ApiErrorCode;
  message: string;
  details?: unknown;
}): ApiError {
  return {
    status: params.status,
    code: params.code ?? mapStatusToCode(params.status),
    message: params.message,
    details: params.details,
  };
}

export async function apiClient<TResponse>(
  request: ApiClientRequest
): Promise<TResponse> {
  const url = new URL(request.path, env.apiBaseUrl);

  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        ...request.headers,
      },
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
      signal: request.signal,
      cache: request.cache,
      next: request.next,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await response.json() : null;

    if (!response.ok) {
      throw normalizeApiError({
        status: response.status,
        message:
          (payload as { message?: string } | null)?.message ??
          `Request failed with status ${response.status}`,
        details: payload,
      });
    }

    return payload as TResponse;
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }

    throw normalizeApiError({
      status: 0,
      code: "NETWORK_ERROR",
      message: "Network error while calling API",
      details: error,
    });
  }
}

function isApiError(error: unknown): error is ApiError {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as Partial<ApiError>;
  return (
    typeof candidate.status === "number" &&
    typeof candidate.code === "string" &&
    typeof candidate.message === "string"
  );
}
