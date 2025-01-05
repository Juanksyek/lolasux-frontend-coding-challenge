import { z } from "zod";

export const PersonalInfoSchema = z.object({
  fullName: z.string(),  // What's a reasonable minimum length for a full name?
  email: z.string().email(),
  phone: z.string()
    // Should we allow international phone numbers? What format makes sense?
    .regex(/^\+?[1-9]\d{1,14}$/),
  location: z.string(),  // Should this be free text or structured (city, country)?
  portfolioUrl: z.string().url().optional(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;