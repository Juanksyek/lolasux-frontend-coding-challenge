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
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-white">
          Nombre Completo
        </label>
        <input
          id="fullName"
          type="text"
          {...register("personalInfo.fullName", { required: "El nombre completo es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors["personalInfo"]?.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {(errors["personalInfo"] as { fullName?: { message: string } }).fullName?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          {...register("personalInfo.email", { required: "El correo electrónico es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors["personalInfo"]?.email && (
          <p className="text-red-500 text-sm mt-1">
            {(errors["personalInfo"] as { email?: { message: string } }).email?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-white">
          Teléfono
        </label>
        <input
          id="phone"
          type="text"
          {...register("personalInfo.phone", { required: "El teléfono es obligatorio" })}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors["personalInfo"]?.["phone"] && (
          <p className="text-red-500 text-sm mt-1">
            {(errors["personalInfo"] as any)?.["phone"]?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-white">
          URL del Portafolio (Opcional)
        </label>
        <input
          id="portfolioUrl"
          type="url"
          {...register("personalInfo.portfolioUrl")}
          className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
