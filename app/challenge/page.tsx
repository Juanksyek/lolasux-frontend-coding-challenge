"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast, useToast } from "@/hooks/use-toast";
import type { ApplicationForm } from "@/types/form";
import PersonalInfoForm from "@/components/ui/personalInfoForm";
import ExperienceForm from "@/components/ui/experienceForm";
import ReviewForm from "@/components/ui/reviewForm";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Información Personal", "Experiencia", "Revisión"]; //pasos para la navegacion
const ERROR_LIMIT = 3; //errores permitidos

export default function ChallengePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0); //contador de errores
  const [isBlocked, setIsBlocked] = useState(false); //estado de bloqueo del formulario
  const methods = useForm<ApplicationForm>();
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, [methods]);

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
      setErrorCount(0); //aqui se reinicia el contador de errores si el paso es valido
      setCurrentStep((prev) => prev + 1);
    } else {
      setErrorCount((prev) => prev + 1);
      if (errorCount + 1 >= ERROR_LIMIT) {
        setIsBlocked(true); //formulario bloqueado por exceso de errores
        toast({
          title: "Formulario bloqueado",
          description:
            "Has alcanzado el límite de intentos fallidos. Intenta nuevamente en unos segundos.",
          open: true,
        });

        //desbloqueo deformulario después de 30 segundos
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
    setIsLoading(true);
    try {
      console.log("Formulario enviado:", data);
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
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {/* intentos fallidos */}
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

        <h1 className="text-2xl font-bold text-center mb-4">
          {steps[currentStep]}
        </h1>

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

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
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
              className={`px-6 py-2 rounded ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500 text-white"
              }`}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
