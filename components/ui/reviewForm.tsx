import { useFormContext } from "react-hook-form";

export default function ReviewForm() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">Revisión</h2>
      <div className="mb-4">
        <h3 className="font-medium">Información Personal</h3>
        <p>Nombre: {values.personalInfo?.name || "No ingresado"}</p>
        <p>Email: {values.personalInfo?.email || "No ingresado"}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-medium">Experiencia</h3>
        <p>Años de Experiencia: {values.experience?.years || "No ingresado"}</p>
        <p>Habilidades: {values.experience?.skills?.join(", ") || "No ingresado"}</p>
      </div>
    </div>
  );
}
