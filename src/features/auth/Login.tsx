import { theme } from "@/styles/theme";
import { useAnimated } from "./hooks/useAnimated";
import { useLoginForm } from "./hooks/useLoginForm";
import { loginStyles } from "./lib/styles";
import { LoginLeftPanel } from "./components/LoginLeftPanel";
import { LoginForm } from "./components/LoginForm";

const COLORS = theme;

export function Login() {
  const visible = useAnimated();
  const formState = useLoginForm();

  return (
    <>
      <style>{loginStyles}</style>

      <div
        style={{
          // Alto fijo al viewport (no mínimo): así el contenedor nunca crece más allá de la
          // pantalla y no aparece scroll en la vista, aunque el contenido de la tarjeta sea
          // más alto -- el `overflow: hidden` de aquí es el que lo recorta, no el formulario.
          height: "100dvh",
          background: "linear-gradient(180deg, #ffffff 0%, #F3F8F1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", width: 350, height: 350, borderRadius: "50%",
            background: "rgba(57, 169, 0, 0.1)", top: -100, right: -100, filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute", width: 280, height: 280, borderRadius: "50%",
            background: "rgba(57, 169, 0, 0.08)", bottom: -80, left: -80, filter: "blur(60px)",
          }}
        />

        <div
          className={`fade ${visible ? "active" : ""} login-grid`}
          style={{
            width: "100%",
            maxWidth: 820,
            // Alto FIJO (no máximo) al espacio disponible: le da a la fila del grid un alto
            // definido, para que la columna del formulario pueda resolver su `height: 100%` y
            // scrollear internamente cuando su contenido no quepa -- con `maxHeight` a secas el
            // navegador no tiene un alto de fila concreto contra el cual calcular ese 100%.
            height: "calc(100dvh - 2.4rem)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            overflow: "hidden",
            borderRadius: 24,
            background: "#fff",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 20px 55px rgba(15, 23, 42, 0.08)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <LoginLeftPanel />

          <div
            style={{
              height: "100%",
              // Único elemento con scroll de las pantallas de auth: la vista (el contenedor de
              // arriba) nunca se mueve, solo esta columna cuando el formulario no cabe entero.
              overflowY: "auto",
              padding: "2rem clamp(1.5rem, 3vw, 2.5rem)",
              display: "flex",
              // "safe center": centra si cabe, pero si el formulario es más alto que la
              // columna, se alinea arriba en vez del bug clásico de flexbox donde el inicio
              // del contenido queda inalcanzable al hacer scroll con `center` a secas.
              alignItems: "safe center",
              justifyContent: "center",
            }}
          >
            <LoginForm formState={formState} />
          </div>
        </div>
      </div>
    </>
  );
}
