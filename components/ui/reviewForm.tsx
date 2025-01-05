import { useFormContext } from "react-hook-form";

export default function ReviewForm() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Revisión</h2>

      {/* Información Personal */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Información Personal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Nombre:</span>{" "}
              {values.personalInfo?.fullName || "No ingresado"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {values.personalInfo?.email || "No ingresado"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Teléfono:</span>{" "}
              {values.personalInfo?.phone || "No ingresado"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Portafolio:</span>{" "}
              {values.personalInfo?.portfolioUrl || "No proporcionado"}
            </p>
          </div>
        </div>
      </div>

      {/* Experiencia */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Experiencia</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Rol Actual:</span>{" "}
              {values.experience?.currentRole || "No ingresado"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Años de Experiencia:</span>{" "}
              {values.experience?.yearsOfExperience || "No ingresado"}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Habilidades:</span>{" "}
              {values.experience?.skills?.join(", ") || "No ingresado"}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Compañía:</span>{" "}
              {values.experience?.company || "No ingresado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
