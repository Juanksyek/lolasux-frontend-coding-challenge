"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast, useToast } from "@/hooks/use-toast";
import type { ApplicationForm } from "@/types/form";
import PersonalInfoForm from "@/components/ui/personalInfoForm";
import ExperienceForm from "@/components/ui/experienceForm";
import ReviewForm from "@/components/ui/reviewForm";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Información Personal", "Experiencia", "Revisión"];
const ERROR_LIMIT = 3;

export default function ChallengePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
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
      setErrorCount(0);
      setCurrentStep((prev) => prev + 1);
    } else {
      setErrorCount((prev) => prev + 1);
      if (errorCount + 1 >= ERROR_LIMIT) {
        setIsBlocked(true);
        toast({
          title: "Formulario bloqueado",
          description: "Has alcanzado el límite de intentos fallidos. Intenta nuevamente en unos segundos.",
          open: true,
        });

        //desbloqueo del formulario después de 30 segundos
        setTimeout(() => {
          setIsBlocked(false);
          setErrorCount(0);
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
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center bg-gray-100">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={`max-w-2xl mx-auto p-8 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-300 ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {/* mensajes de intentos fallidos */}
          {errorCount > 0 && !isBlocked && (
            <p className="text-yellow-600 text-center mb-4">
              {`Intentos fallidos: ${errorCount}/${ERROR_LIMIT}`}
            </p>
          )}

          {/* indicador de progreso */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`cursor-pointer h-2 flex-1 rounded-full ${
                  index <= currentStep ? "bg-green-500" : "bg-gray-300"
                } mx-1`}
              ></div>
            ))}
          </div>

          <h1 className="text-2xl font-extrabold text-center w-4/12 mb-4">
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
                className={`px-6 py-2 text-white rounded ${
                  isBlocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600"
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
                className={`px-6 py-2 text-white rounded ${
                  isBlocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-400"
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
                    : "bg-blue-600 hover:bg-blue-500 text-white"
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
    </div>
  );
}
