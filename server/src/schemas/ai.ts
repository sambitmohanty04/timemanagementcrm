import { z } from "zod";

export const ChatBodySchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, { message: "Message cannot be empty" })
    .max(20000, { message: "Message exceeds maximum length" }),
  
  pageContext: z
    .string()
    .trim()
    .optional(),

  conversationId: z
    .string()
    .trim()
    .optional(),
});


export const SettingsBodySchema = z.object({
  autoReorganize: z.boolean({
    message: "autoReorganize boolean flag is required",
  }),
});

export type ChatBody = z.infer<typeof ChatBodySchema>;
export type SettingsBody = z.infer<typeof SettingsBodySchema>;