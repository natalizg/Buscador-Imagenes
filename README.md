# App Buscador de Imágenes JS Vanilla


En este proyecto, he desarrollado una aplicación que te permite buscar imágenes utilizando JavaScript vanilla. Consta de conexión a una API utilizando fetch(). Tiene dos funciones principales:

- Generador de páginas: muestra los resultados de la búsqueda y crea los botones para avanzar y retroceder entre las páginas. Estos botones están conectados a la función generarPag(), que es recursiva y se activa cada vez que se hace clic en los botones de navegación. Esto hace que no se cargue una nueva página para cada conjunto de resultados.

- Validación para evitar que los usuarios realicen búsquedas con términos vacíos, que he optado por un mensaje en la app y no una alerta.

Para los estilos, he utilizado Tailwind CSS.

