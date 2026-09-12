const NOMBRE_CACHE = "contactos-pwa-v1";

const RECURSOS_INICIALES = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/images/contactos.png",
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => {
      return cache.addAll(RECURSOS_INICIALES);
    })
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nombresCache) => {
      return Promise.all(
        nombresCache
          .filter((nombre) => nombre !== NOMBRE_CACHE)
          .map((nombre) => caches.delete(nombre))
      );
    })
  );
});

self.addEventListener("fetch", (evento) => {
  const solicitud = evento.request;
  const url = new URL(solicitud.url);

  if (solicitud.method !== "GET") {
    return;
  }

  // API → Network First
  if (url.pathname.startsWith("/api/")) {
    evento.respondWith(redPrimero(solicitud));
    return;
  }

  // HTML → Network First
  if (solicitud.mode === "navigate") {
    evento.respondWith(redPrimero(solicitud, true));
    return;
  }

  // JS y CSS → Cache First
  if (
    solicitud.destination === "script" ||
    solicitud.destination === "style"
  ) {
    evento.respondWith(cachePrimero(solicitud));
    return;
  }

  // Imágenes → Stale While Revalidate
  if (solicitud.destination === "image") {
    evento.respondWith(
      staleWhileRevalidate(solicitud, evento)
    );
    return;
  }

  // Otros recursos → Network First
  evento.respondWith(redPrimero(solicitud));
});


async function redPrimero(solicitud, esPagina = false) {
  const cache = await caches.open(NOMBRE_CACHE);

  try {
    const respuestaRed = await fetch(solicitud);

    if (respuestaRed.ok) {
      await cache.put(
        solicitud,
        respuestaRed.clone()
      );
    }

    return respuestaRed;
  } catch {
    const respuestaCache =
      await cache.match(solicitud);

    if (respuestaCache) {
      return respuestaCache;
    }

    if (esPagina) {
      const paginaInicio =
        await cache.match("/");

      if (paginaInicio) {
        return paginaInicio;
      }
    }

    return new Response(
      "No hay conexión a Internet",
      {
        status: 503,
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8",
        },
      }
    );
  }
}


async function cachePrimero(solicitud) {
  const cache = await caches.open(NOMBRE_CACHE);

  const respuestaCache =
    await cache.match(solicitud);

  if (respuestaCache) {
    return respuestaCache;
  }

  const respuestaRed = await fetch(solicitud);

  if (respuestaRed.ok) {
    await cache.put(
      solicitud,
      respuestaRed.clone()
    );
  }

  return respuestaRed;
}


async function staleWhileRevalidate(
  solicitud,
  evento
) {
  const cache = await caches.open(NOMBRE_CACHE);

  const respuestaCache =
    await cache.match(solicitud);

  const actualizacion = fetch(solicitud)
    .then(async (respuestaRed) => {
      if (respuestaRed.ok) {
        await cache.put(
          solicitud,
          respuestaRed.clone()
        );
      }

      return respuestaRed;
    })
    .catch(() => null);

  evento.waitUntil(actualizacion);

  if (respuestaCache) {
    return respuestaCache;
  }

  const respuestaRed = await actualizacion;

  if (respuestaRed) {
    return respuestaRed;
  }

  return new Response(
    "Imagen no disponible",
    {
      status: 503,
    }
  );
}