import { z } from "zod";

export const ExperienceSchema = z.object({
  currentRole: z.string().nonempty("El rol actual es obligatorio"),
  yearsOfExperience: z.number().min(1, "Debe tener al menos 1 año de experiencia"),
  skills: z.array(z.string().nonempty()).nonempty("Debe agregar al menos una habilidad"),
  company: z.string().nonempty("El nombre de la compañía es obligatorio"),
});

export type Experience = z.infer<typeof ExperienceSchema>;
