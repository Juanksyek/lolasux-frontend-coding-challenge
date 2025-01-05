import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 text-white space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Desafío Frontend</h1>
          <p className="text-zinc-300 text-lg">
            ¡Bienvenidx al desafío de ingeniería frontend! Tu tarea es construir un formulario de solicitud de empleo de múltiples pasos con los siguientes requisitos:
          </p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Requisitos:</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li>Implementar un formulario de múltiples pasos: Información Personal, Experiencia y Revisión o</li>
              <li>Usar React Hook Form para la gestión del formulario o</li>
              <li>Implementar validación usando Zod o</li>
              <li>Crear un indicador de progreso o</li>
              <li>Permitir navegación entre pasos o</li>
              <li>Agregar validación apropiada antes de proceder al siguiente paso o</li>
              <li>Crear un paso de revisión mostrando toda la información ingresada o</li>
              <li>Estilizar usando Tailwind CSS (puedes o ser creative, o solo usar colores parecidos a los de <a href="https://www.lolasux.com" className="text-green-400 underline">https://www.lolasux.com</a>) o</li>
              <li>Implementar tipos apropiados de TypeScript o</li>
              <li>Manejar el envío del formulario o</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Puntos Extra:</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li>Agregar persistencia del formulario usando localStorage o</li>
              <li>Implementar estados de carga</li>
              <li>Agregar animaciones entre pasos o</li>
              <li>Hacerlo responsivo o</li>
              <li>Agregar manejo de errores</li>
            </ul>
          </div>
                    <div className="space-y-4">
            <h2 className="text-2xl font-semibold">OJO PIOJO:</h2>
              <h1 className="text-zinc-300">
              Aunque el desafio te reta a utilizar react-hook-form, hay un punto <strong className="italic">secreto</strong>, dentro de lola tenemos un cuestionario multi-step como el que te estamos solicitando, para ese caso en especifico no utilizamos react-hook-form (realmente es el unico caso en el que no usamos react-hook-form, por eso si optas hacerlo con eso no hay problema)
              </h1>

                      <h1>
                      la vdd no te wa decir cual es el secreto, peeero... le puedes ir a preguntar a Edward Forrest Moore 👀
                      </h1>
          </div>


          <Link 
            href="/challenge"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors mt-4 group"
          >
            Comenzar Desafío
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}