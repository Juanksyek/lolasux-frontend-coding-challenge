import { useFormContext, FieldErrors } from "react-hook-form";

export default function ExperienceForm() {
  const { register, formState: { errors } } = useFormContext();

  const experienceErrors = errors.experience as FieldErrors<{
    currentRole: string;
    yearsOfExperience: number;
    skills: string[];
    company: string;
  }>;

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="currentRole" className="block text-sm font-medium text-white">
          Rol Actual
        </label>
        <input
          id="currentRole"
          type="text"
          {...register("experience.currentRole", { required: "El rol actual es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {experienceErrors?.currentRole && (
          <p className="text-red-500 text-sm mt-1">
            {experienceErrors.currentRole.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-white">
          Años de Experiencia
        </label>
        <input
          id="yearsOfExperience"
          type="number"
          {...register("experience.yearsOfExperience", {
            required: "Los años de experiencia son obligatorios",
            min: { value: 1, message: "Debe tener al menos 1 año de experiencia" },
          })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {experienceErrors?.yearsOfExperience && (
          <p className="text-red-500 text-sm mt-1">
            {experienceErrors.yearsOfExperience.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="skills" className="block text-sm font-medium text-white">
          Habilidades
        </label>
        <input
          id="skills"
          type="text"
          placeholder="Ejemplo: React, TypeScript"
          {...register("experience.skills.0", { required: "Debe ingresar al menos una habilidad" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {experienceErrors?.skills && (
          <p className="text-red-500 text-sm mt-1">
            {experienceErrors.skills[0]?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="company" className="block text-sm font-medium text-white">
          Compañía
        </label>
        <input
          id="company"
          type="text"
          {...register("experience.company", { required: "El nombre de la compañía es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {experienceErrors?.company && (
          <p className="text-red-500 text-sm mt-1">
            {experienceErrors.company.message}
          </p>
        )}
      </div>
    </div>
  );
}
