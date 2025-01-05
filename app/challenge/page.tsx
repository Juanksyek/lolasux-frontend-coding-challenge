"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast, useToast } from "@/hooks/use-toast";
import type { ApplicationForm } from "@/types/form";
import PersonalInfoForm from "@/components/ui/personalInfoForm";
import ExperienceForm from "@/components/ui/experienceForm";
import ReviewForm from "@/components/ui/reviewForm";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Información Personal", "Experiencia", "Revisión"]; //pasos para la navegación
const ERROR_LIMIT = 3; //errores permitidos

export default function ChallengePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false); //estado de carga
  const [errorCount, setErrorCount] = useState(0); //contador de errores
  const [isBlocked, setIsBlocked] = useState(false); //estado de bloqueo del formulario
  const methods = useForm<ApplicationForm>();
  const { toast } = useToast();

  //restaura los datos guardados en localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, [methods]);

  //aqui se guardan los datos automáticamente en localStorage
  useEffect(() => {
    const subscription = methods.watch((data) => {
      localStorage.setItem("formData", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const nextStep = async () => {
    if (isBlocked) {
      toast({
        title: "Formulario bloqueado",
        description: "Por favor, espera unos segundos antes de intentarlo nuevamente.",
        open: true,
      });
      return;
    }

    const isValid = await methods.trigger();
    if (isValid) {
      setErrorCount(0); //reinicia el contador de errores si el paso es válido
      setCurrentStep((prev) => prev + 1);
    } else {
      setErrorCount((prev) => prev + 1);
      if (errorCount + 1 >= ERROR_LIMIT) {
        setIsBlocked(true); //formulario bloqueado por exceso de errores
        toast({
          title: "Formulario bloqueado",
          description: "Has alcanzado el límite de intentos fallidos. Intenta nuevamente en unos segundos.",
          open: true,
        });

        //desbloqueo del formulario después de 30 segundos
        setTimeout(() => {
          setIsBlocked(false);
          setErrorCount(0); //reiniciar los errores
        }, 30000);
      } else {
        toast({
          title: "Error",
          description: `Intentos fallidos: ${errorCount + 1}/${ERROR_LIMIT}`,
          open: true,
        });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async (data: ApplicationForm) => {
    console.log("Envío iniciado");
    setIsLoading(true); // Activa el estado de carga
    console.log("Estado de carga activado:", isLoading);
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Éxito",
        description: "El formulario se envió correctamente.",
        open: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el formulario.",
        open: true,
      });
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };  

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={`max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`} //deshabilita la interacción durante la carga
      >
        {/* mensajes de intentos fallidos */}
        {errorCount > 0 && !isBlocked && (
          <p className="text-yellow-500 text-center mb-4">
            {`Intentos fallidos: ${errorCount}/${ERROR_LIMIT}`}
          </p>
        )}

        {/* indicador de progreso */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`cursor-pointer h-2 flex-1 rounded ${
                index <= currentStep ? "bg-blue-500" : "bg-gray-700"
              } mx-1`}
            ></div>
          ))}
        </div>

        {/* titulo del paso actual */}
        <h1 className="text-2xl font-bold text-center mb-4">
          {steps[currentStep]}
        </h1>

        {/* animación entre pasos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="my-6"
          >
            {currentStep === 0 && <PersonalInfoForm />}
            {currentStep === 1 && <ExperienceForm />}
            {currentStep === 2 && <ReviewForm />}
          </motion.div>
        </AnimatePresence>

        {/* botones de navegación */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              disabled={isBlocked}
              className={`px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 ${
                isBlocked ? "cursor-not-allowed" : ""
              }`}
            >
              Anterior
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isBlocked}
              className={`px-6 py-2 rounded ${
                isBlocked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {isBlocked ? "Bloqueado" : "Siguiente"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 flex items-center justify-center rounded ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
