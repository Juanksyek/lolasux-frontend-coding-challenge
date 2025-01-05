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
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {/* Campo: Rol Actual */}
      <div className="mb-6">
        <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700">
          Rol Actual
        </label>
        <input
          id="currentRole"
          type="text"
          aria-required="true"
          aria-describedby="currentRoleError"
          {...register("experience.currentRole", { required: "El rol actual es obligatorio" })}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        {experienceErrors?.currentRole && (
          <p
            id="currentRoleError"
            className="text-red-500 text-sm mt-1"
            aria-live="assertive"
          >
            {experienceErrors.currentRole.message}
          </p>
        )}
      </div>

      {/* Campo: Años de Experiencia */}
      <div className="mb-6">
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
          Años de Experiencia
        </label>
        <input
          id="yearsOfExperience"
          type="number"
          aria-required="true"
          aria-describedby="yearsOfExperienceError"
          {...register("experience.yearsOfExperience", {
            required: "Los años de experiencia son obligatorios",
            min: { value: 1, message: "Debe tener al menos 1 año de experiencia" },
          })}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        {experienceErrors?.yearsOfExperience && (
          <p
            id="yearsOfExperienceError"
            className="text-red-500 text-sm mt-1"
            aria-live="assertive"
          >
            {experienceErrors.yearsOfExperience.message}
          </p>
        )}
      </div>

      {/* Campo: Habilidades */}
      <div className="mb-6">
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Habilidades
        </label>
        <input
          id="skills"
          type="text"
          aria-required="true"
          aria-describedby="skillsError"
          placeholder="Ejemplo: React, TypeScript"
          {...register("experience.skills.0", { required: "Debe ingresar al menos una habilidad" })}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        {experienceErrors?.skills && (
          <p
            id="skillsError"
            className="text-red-500 text-sm mt-1"
            aria-live="assertive"
          >
            {experienceErrors.skills[0]?.message}
          </p>
        )}
      </div>

      {/* Campo: Compañía */}
      <div className="mb-6">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Compañía
        </label>
        <input
          id="company"
          type="text"
          aria-required="true"
          aria-describedby="companyError"
          {...register("experience.company", { required: "El nombre de la compañía es obligatorio" })}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        {experienceErrors?.company && (
          <p
            id="companyError"
            className="text-red-500 text-sm mt-1"
            aria-live="assertive"
          >
            {experienceErrors.company.message}
          </p>
        )}
      </div>
    </div>
  );
}
