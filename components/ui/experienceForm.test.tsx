import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import ExperienceForm from "@/components/ui/experienceForm";

//integrar React Hook Form con el componente
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("ExperienceForm Component", () => {
  test("renderiza todos los campos correctamente", () => {
    render(
      <Wrapper>
        <ExperienceForm />
      </Wrapper>
    );

    //verifica que los campos existan en el DOM
    expect(screen.getByLabelText(/rol actual/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/años de experiencia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/compañía/i)).toBeInTheDocument();
  });

  test("muestra mensajes de error cuando los campos están vacíos", async () => {
    render(
      <Wrapper>
        <ExperienceForm />
      </Wrapper>
    );

    //aqui dispara el evento de blur para simular que el usuario sale del campo sin llenarlo
    fireEvent.blur(screen.getByLabelText(/rol actual/i));
    fireEvent.blur(screen.getByLabelText(/años de experiencia/i));
    fireEvent.blur(screen.getByLabelText(/habilidades/i));
    fireEvent.blur(screen.getByLabelText(/compañía/i));

    //sev erifica que se muestren los mensajes de error
    expect(await screen.findByText(/el rol actual es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/los años de experiencia son obligatorios/i)).toBeInTheDocument();
    expect(await screen.findByText(/debe ingresar al menos una habilidad/i)).toBeInTheDocument();
    expect(await screen.findByText(/el nombre de la compañía es obligatorio/i)).toBeInTheDocument();
  });

  test("muestra mensajes de error para datos no válidos", async () => {
    render(
      <Wrapper>
        <ExperienceForm />
      </Wrapper>
    );

    //se ingresa datos no validos en los campos
    fireEvent.change(screen.getByLabelText(/años de experiencia/i), {
      target: { value: "0" },
    });

    //dispara el evento de blur para validar
    fireEvent.blur(screen.getByLabelText(/años de experiencia/i));

    //verifica que se muestre el mensaje de error correspondiente
    expect(await screen.findByText(/debe tener al menos 1 año de experiencia/i)).toBeInTheDocument();
  });

  test("no muestra mensajes de error para datos válidos", async () => {
    render(
      <Wrapper>
        <ExperienceForm />
      </Wrapper>
    );

    //ingresa datos válidos en los campos
    fireEvent.change(screen.getByLabelText(/rol actual/i), {
      target: { value: "Desarrollador" },
    });
    fireEvent.change(screen.getByLabelText(/años de experiencia/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/habilidades/i), {
      target: { value: "React" },
    });
    fireEvent.change(screen.getByLabelText(/compañía/i), {
      target: { value: "Mi Empresa" },
    });

    //dispara el evento de blur para simular la validación
    fireEvent.blur(screen.getByLabelText(/rol actual/i));
    fireEvent.blur(screen.getByLabelText(/años de experiencia/i));
    fireEvent.blur(screen.getByLabelText(/habilidades/i));
    fireEvent.blur(screen.getByLabelText(/compañía/i));

    //verifica que no existan mensajes de error
    expect(screen.queryByText(/es obligatorio/i)).toBeNull();
  });
});
