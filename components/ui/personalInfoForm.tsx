import { useFormContext } from "react-hook-form";

type PersonalInfoErrors = {
  personalInfo?: {
    fullName?: { message: string };
    email?: { message: string };
    phone?: { message: string };
    portfolioUrl?: { message: string };
  };
};

export default function PersonalInfoForm() {
  const { register, formState: { errors } } = useFormContext<PersonalInfoErrors>();

  return (
    <div>
      {/* campo: Nombre Completo */}
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-white">
          Nombre Completo
        </label>
        <input
          id="fullName"
          type="text"
          aria-required="true"
          aria-describedby="fullNameHelp fullNameError"
          {...register("personalInfo.fullName", { required: "El nombre completo es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p id="fullNameHelp" className="text-gray-400 text-sm">
          Introduce tu nombre completo tal como aparece en tus documentos.
        </p>
        {errors["personalInfo"]?.fullName && (
          <p
            id="fullNameError"
            className="text-red-500 text-sm mt-1"
            aria-live="assertive"
          >
            {(errors["personalInfo"] as { fullName?: { message: string } }).fullName?.message}
          </p>
        )}
      </div>

      {/* campo: Correo Electronico */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          aria-required="true"
          aria-describedby="emailError"
          {...register("personalInfo.email", { required: "El correo electrónico es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors["personalInfo"]?.email && (
          <p
            id="emailError"
            className="text-red-500 text-sm mt-1"
            aria-live="assertive"
          >
            {(errors["personalInfo"] as { email?: { message: string } }).email?.message}
          </p>
        )}
      </div>

      {/* Ccampo: Telefono */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-white">
          Teléfono
        </label>
        <input
          id="phone"
          type="text"
          aria-required="true"
          aria-describedby="phoneError"
          {...register("personalInfo.phone", { required: "El teléfono es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors["personalInfo"]?.["phone"] && (
          <p
            id="phoneError"
            className="text-red-500 text-sm mt-1"
            aria-live="assertive"
          >
            {(errors["personalInfo"] as any)?.["phone"]?.message}
          </p>
        )}
      </div>

      {/* Campo: url del Portafolio */}
      <div className="mb-4">
        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-white">
          URL del Portafolio (Opcional)
        </label>
        <input
          id="portfolioUrl"
          type="url"
          aria-describedby="portfolioHelp"
          {...register("personalInfo.portfolioUrl")}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p id="portfolioHelp" className="text-gray-400 text-sm">
          Proporciona un enlace a tu portafolio en línea si tienes uno.
        </p>
      </div>
    </div>
  );
}
