const NOMBRE_CACHE =
  "mediclinic-pwa-v1";

const RECURSOS_INICIALES = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener(
  "install",
  (evento) => {
    evento.waitUntil(
      caches
        .open(NOMBRE_CACHE)
        .then((cache) => {
          return cache.addAll(
            RECURSOS_INICIALES
          );
        })
    );
  }
);

self.addEventListener(
  "activate",
  (evento) => {
    evento.waitUntil(
      caches
        .keys()
        .then((nombres) => {
          return Promise.all(
            nombres
              .filter(
                (nombre) =>
                  nombre !==
                  NOMBRE_CACHE
              )
              .map((nombre) =>
                caches.delete(nombre)
              )
          );
        })
    );
  }
);

self.addEventListener(
  "fetch",
  (evento) => {
    const solicitud =
      evento.request;

    if (
      solicitud.method !== "GET"
    ) {
      return;
    }

    if (
      solicitud.mode === "navigate"
    ) {
      evento.respondWith(
        redPrimero(solicitud)
      );

      return;
    }

    if (
      solicitud.destination ===
        "script" ||
      solicitud.destination ===
        "style"
    ) {
      evento.respondWith(
        cachePrimero(solicitud)
      );

      return;
    }

    if (
      solicitud.destination ===
      "image"
    ) {
      evento.respondWith(
        staleWhileRevalidate(
          solicitud,
          evento
        )
      );

      return;
    }

    evento.respondWith(
      redPrimero(solicitud)
    );
  }
);

async function redPrimero(
  solicitud
) {
  const cache =
    await caches.open(
      NOMBRE_CACHE
    );

  try {
    const respuesta =
      await fetch(solicitud);

    if (respuesta.ok) {
      await cache.put(
        solicitud,
        respuesta.clone()
      );
    }

    return respuesta;
  } catch {
    const respuestaCache =
      await cache.match(solicitud);

    if (respuestaCache) {
      return respuestaCache;
    }

    const inicio =
      await cache.match("/");

    if (inicio) {
      return inicio;
    }

    return new Response(
      "No hay conexión",
      {
        status: 503,
      }
    );
  }
}

async function cachePrimero(
  solicitud
) {
  const cache =
    await caches.open(
      NOMBRE_CACHE
    );

  const respuestaCache =
    await cache.match(solicitud);

  if (respuestaCache) {
    return respuestaCache;
  }

  const respuesta =
    await fetch(solicitud);

  if (respuesta.ok) {
    await cache.put(
      solicitud,
      respuesta.clone()
    );
  }

  return respuesta;
}

async function staleWhileRevalidate(
  solicitud,
  evento
) {
  const cache =
    await caches.open(
      NOMBRE_CACHE
    );

  const respuestaCache =
    await cache.match(solicitud);

  const actualizacion =
    fetch(solicitud).then(
      async (respuesta) => {
        if (respuesta.ok) {
          await cache.put(
            solicitud,
            respuesta.clone()
          );
        }

        return respuesta;
      }
    );

  evento.waitUntil(
    actualizacion
  );

  return (
    respuestaCache ||
    actualizacion
  );
}