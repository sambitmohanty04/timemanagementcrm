import axios from "axios";

type ErrorBody = {
  message?: unknown;
  error?: unknown;
  errors?: unknown;
};

const toText = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value.trim() || undefined;

  if (typeof value === "object") {
    const v = value as { message?: unknown; msg?: unknown };
    if (typeof v.message === "string") return v.message;
    if (typeof v.msg === "string") return v.msg;
  }

  return undefined;
};

export const getErrorMessage = (err: unknown, fallback: string): string => {
  if (axios.isAxiosError(err)) {
    // No response at all: server down, CORS, or network failure
    if (!err.response) {
      return "Can't reach the server. Check your connection and try again.";
    }

    const body = err.response.data as ErrorBody | string | undefined;

    // Plain-text body
    if (typeof body === "string") {
      return body.trim() || fallback;
    }

    if (body && typeof body === "object") {
      // { message } or { error }
      const direct = toText(body.message) ?? toText(body.error);
      if (direct) return direct;

      // { errors: [...] } from Joi, Zod, express-validator, etc.
      if (Array.isArray(body.errors) && body.errors.length > 0) {
        const messages = body.errors
          .map(toText)
          .filter((m): m is string => Boolean(m));

        if (messages.length > 0) return messages.join("\n");
      }

      // Last resort: show the raw body so you can see what the server sent
      if (Object.keys(body).length > 0) return JSON.stringify(body);
    }

    return fallback;
  }

  return err instanceof Error ? err.message : fallback;
};