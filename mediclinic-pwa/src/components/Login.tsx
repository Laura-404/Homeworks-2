import { useState } from "react";

type PropiedadesLogin = {
  iniciarSesion: (
    correo: string,
    contrasena: string
  ) => boolean;
};

function Login({
  iniciarSesion,
}: PropiedadesLogin) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] =
    useState("");
  const [mensaje, setMensaje] =
    useState("");

  function validarLogin() {
    const acceso = iniciarSesion(
      correo,
      contrasena
    );

    if (!acceso) {
      setMensaje(
        "Correo o contraseña incorrectos"
      );
    }
  }

  return (
    <div className="login">
      <h1>MediClinic</h1>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(evento) =>
          setCorreo(evento.target.value)
        }
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(evento) =>
          setContrasena(evento.target.value)
        }
      />

      <button onClick={validarLogin}>
        Ingresar
      </button>

      {mensaje !== "" && (
        <p className="error">{mensaje}</p>
      )}
    </div>
  );
}

export default Login;