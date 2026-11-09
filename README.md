# DevShelf

Biblioteca personal para guardar y organizar recursos de aprendizaje de programación.
Permite gestionar videos, artículos, documentación, cursos y herramientas en un solo lugar.

## Funcionalidades

- Página de bienvenida con estadísticas (total de recursos, favoritos y temas).
- Registro de recursos con validación de formulario.
- Listado de recursos en tarjetas con badges por tipo.
- Edición de recursos.
- Persistencia en localStorage.

## Tecnologías

- **Vite** (`^8.3.5`): entorno de desarrollo y empaquetado.
- **JavaScript vanilla (módulos ES)**: desarrollo sin frameworks.
- **CSS con variables**: hojas de estilo basadas en variables personalizadas.
- **uuid** (`^14.0.3`): generación de identificadores únicos.

## Requisitos

- Node.js
- pnpm

## Estructura del proyecto

```text
src/
├── components/          # Piezas reutilizables (navbar, toast)
├── data/
│   └── options.js       # Opciones de tipo, tema y nivel
├── services/
│   └── storage.js       # Acceso a localStorage
├── views/               # Una vista por página
├── main.js              # Punto de entrada
├── router.js            # Router por hash
└── style.css            # Solo importa los archivos de src/styles/
```

## Modelo de datos

Ejemplo del objeto recurso almacenado en la aplicación:

```json
{
  "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "titulo": "Documentación oficial de JavaScript en MDN",
  "url": "https://developer.mozilla.org/es/docs/Web/JavaScript",
  "tipo": "docs",
  "tema": "javascript",
  "nivel": "intermedio",
  "favorito": true,
  "fechaCreacion": "2026-11-09T20:49:12.000Z"
}
```

## Autor

- Kenia Yaneth Paiz Chacon
- Proyecto del bootcamp Web Developer Frontend
