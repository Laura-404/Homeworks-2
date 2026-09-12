# MediClinic

Actividad desarrollada con React, PWA e Ionic React para la gestión de pacientes y visitas médicas.

El proyecto contiene dos aplicaciones independientes:

* `mediclinic-pwa`: aplicación web para administración de pacientes.
* `mediclinic-ionic`: aplicación Ionic para consulta y gestión de visitas médicas.

## Ejercicio 1 - PWA React

La aplicación permite:

* Iniciar sesión utilizando un usuario fijo.
* Mantener la sesión utilizando localStorage.
* Cerrar sesión.
* Mostrar mensajes cuando las credenciales son incorrectas.
* Consultar una lista de pacientes.
* Agregar nuevos pacientes.
* Validar nombre, apellido y CC.
* Guardar los pacientes utilizando localStorage.
* Buscar pacientes por nombre, apellido o CC.
* Utilizar funcionalidades PWA mediante Manifest y Service Worker.

### Credenciales PWA

Correo:

`admin@mediclinic.com`

Contraseña:

`1234`

## Ejercicio 2 - Ionic React

La aplicación permite:

* Iniciar sesión utilizando componentes de Ionic.
* Mostrar un IonToast cuando las credenciales son incorrectas.
* Mantener la sesión utilizando localStorage.
* Navegar mediante tres tabs:

  * Visitas
  * Pacientes
  * Perfil
* Consultar las visitas del día.
* Consultar el detalle de una visita.
* Cambiar el estado de una visita siguiendo el orden:

  * pendiente
  * en_camino
  * finalizada
* Guardar los cambios utilizando localStorage.
* Cerrar sesión desde el perfil.

### Credenciales Ionic

Correo:

`medico@mediclinic.com`

Contraseña:

`123`

## Persistencia

Las dos aplicaciones utilizan localStorage y no utilizan ningún backend.

La información de los pacientes de la PWA y la información utilizada por la aplicación Ionic son independientes y no se comparten entre las aplicaciones.

## Ejecución de la PWA

Entrar al proyecto:

`cd mediclinic-pwa`

Instalar dependencias:

`npm install`

Ejecutar durante desarrollo:

`npm run dev`

Crear la versión de producción:

`npm run build`

Probar la versión de producción:

`npm run preview`

## Ejecución de Ionic

Entrar al proyecto:

`cd mediclinic-ionic`

Ejecutar:

`ionic serve`

Crear la versión de producción:

`ionic build`

## Capturas

Las capturas de pantalla de ambas aplicaciones se encuentran en la carpeta:

`capturas`

# Challenge 2 - PWA Contacts App

Aplicación de contactos desarrollada con React y TypeScript.

La aplicación permite:

* Ver una lista inicial de contactos.
* Agregar contactos.
* Eliminar contactos.
* Mostrar un loader durante la carga inicial.
* Instalar la aplicación como PWA.
* Utilizar recursos almacenados en caché cuando no hay conexión.

## PWA

La aplicación utiliza diferentes estrategias de caché:

* HTML: Network First.
* JavaScript y CSS: Cache First.
* Imágenes: Stale While Revalidate.
* API: Network First.

## Netlify

La aplicación se encuentra publicada en:

https://challenge2pwa.netlify.app

## Instalación en celular

### Android

1. Abrir el enlace de Netlify en Google Chrome.
2. Abrir el menú de Chrome.
3. Seleccionar "Instalar aplicación" o "Añadir a pantalla principal".
4. Confirmar la instalación.
5. Abrir la aplicación desde el icono agregado al teléfono.

### iPhone

1. Abrir el enlace de Netlify en Safari.
2. Presionar el botón Compartir.
3. Seleccionar "Añadir a pantalla de inicio".
4. Confirmar.
5. Abrir la aplicación desde el nuevo icono.
