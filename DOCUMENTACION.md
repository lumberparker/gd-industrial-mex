# GD Industrial México — Documentación del Sitio

## Resumen del Proyecto

Sitio web estático para **GD Industrial México**, una empresa distribuidora de equipo industrial (acoples, embragues, rotosellos, productos de perforación, balatas). El sitio está construido con HTML, CSS y JavaScript vanilla, sin frameworks ni backend. Se despliega automáticamente en Netlify desde el repositorio GitHub `lumberparker/gd-industrial-mex`.

**URL de producción:** https://gdindustrialmex.netlify.app

---

## Estructura de Archivos

```
G&D/
├── index.html                    # Página principal (única página)
├── catalogo.html                 # Página de catálogo
├── assets/
│   ├── jsons/
│   │   └── productos.json        # Fuente de verdad del catálogo
│   ├── images/
│   │   ├── hero__slide-1.jpg     # Slides del carrusel (1–11)
│   │   ├── hero__slide-*.jpg
│   │   └── catalogo/             # Imágenes de productos
│   │       ├── marca__producto-id.jpg
│   │       └── ...
│   └── pdfs/                     # Catálogos en PDF por producto
│       ├── catalogo acople dentado.pdf
│       └── ...
├── blocks/                       # CSS por bloque/componente
│   ├── hero.css
│   ├── catalogo.css
│   ├── encuentra.css
│   └── ...
├── scripts/
│   └── catalogo.js               # Lógica del catálogo (renderizado dinámico)
└── .claude/
    └── launch.json               # Config del servidor de preview local
```

---

## Cómo Funciona el Catálogo

### `productos.json`

Es la **única fuente de verdad** del catálogo. Agregar o eliminar una categoría o producto aquí se refleja automáticamente en el sitio sin tocar HTML. Se decidió así para que el cliente pueda mantener el catálogo actualizado sin necesidad de editar código.

**Estructura:**

```json
{
  "categorias": [
    {
      "id": "acoples-flexibles",
      "nombre": "Acoples Flexibles",
      "descripcion": "...",
      "productos": [
        {
          "id": "acople-elastico-x",
          "nombre": "Acople Elástico Tipo X",
          "descripcion": "...",
          "imagen": "assets/images/catalogo/acople-elastico-x.jpg",
          "catalogoPdf": "assets/pdfs/catalogo acople flexible tipo X.pdf"
        }
      ]
    }
  ]
}
```

**Campos por producto:**

| Campo | Requerido | Descripción |
|---|---|---|
| `id` | ✅ | Slug único, sin espacios ni acentos |
| `nombre` | ✅ | Nombre visible en el sitio |
| `descripcion` | ✅ | Texto descriptivo de la tarjeta |
| `imagen` | Opcional | Ruta relativa a la imagen. Si no hay imagen, la tarjeta muestra placeholder |
| `catalogoPdf` | Opcional | Ruta al PDF. Si existe → botón "Ver Catálogo →". Si no → botón WhatsApp |

---

## Agregar un Nuevo Producto

1. Subir la imagen a `assets/images/catalogo/` con el nombre `marca__producto-id.jpg`
2. (Opcional) Subir el PDF a `assets/pdfs/`
3. Agregar el objeto al array `productos` de la categoría correspondiente en `productos.json`
4. Hacer commit y push — Netlify despliega automáticamente

---

## Agregar una Nueva Categoría

Agregar un objeto al array `categorias` en `productos.json`. La categoría aparecerá automáticamente en el menú lateral del catálogo y en la página principal.

---

## Imágenes

### Naming Convention

```
marca__producto-id.jpg      → para productos con marca específica
producto-id.jpg             → para productos sin marca
```

Ejemplos:
- `mecanotecnica__empaques-bop.jpg`
- `indubal__taco-tejido-petrolero.jpg`
- `acople-elastico-x.jpg`

### Requisitos

- Formato preferido: **JPG**
- Tamaño máximo recomendado: **1920px** en el lado más largo
- Las imágenes se muestran en modo `contain` (imagen completa, sin recorte) — para que el producto se vea completo y no aparezca cortado en la tarjeta
- Click en la imagen abre un lightbox a pantalla completa — se eligió click en lugar de hover para evitar que la imagen se abriera accidentalmente al pasar el cursor

---

## Hero Carrusel

- **11 slides** (`hero__slide-1.jpg` a `hero__slide-11.jpg`)
- Slides 1–3 también existen en `.avif` para navegadores modernos
- Todas las slides están comprimidas a JPG, máx 1920px (~500–950 KB cada una) — las imágenes originales llegaron como PNG de hasta 9 MB cada una (~60 MB en total), lo que hacía que el sitio tardara demasiado en cargar. La compresión redujo el peso total a ~5.8 MB
- Para agregar más slides: subir imagen comprimida y agregar el `<div class="hero__slide">` en `index.html`

---

## Sección de Contacto

La sección "Encuéntranos" no tiene formulario — se eliminó porque no era funcional (no tenía backend que procesara los envíos). Se reemplazó con un botón de WhatsApp como CTA principal, que es más directo y no requiere infraestructura adicional.

El botón abre una conversación con el mensaje genérico:

> *"Hola, me gustaría recibir información sobre sus productos y disponibilidad."*

El mensaje es genérico a propósito — no incluye nombre de producto ni liga al sitio para que la conversación se sienta natural y no automatizada.

Teléfono configurado: `+52 333 955 5895`

Para cambiar el número, editar `scripts/catalogo.js` (función `buildWhatsAppUrl`) y `index.html` (botón WhatsApp de la sección encuentra).

---

## PDFs en el Catálogo

Cuando un producto tiene catálogo disponible, se muestra el botón "Ver Catálogo →" que abre el PDF directamente. Si no hay PDF, se muestra el botón de WhatsApp. Esto permite dar acceso inmediato a la ficha técnica sin necesidad de contactar al equipo, agilizando la decisión de compra.

| Producto | Archivo |
|---|---|
| Acople Elástico Tipo X | `catalogo acople flexible tipo X.pdf` |
| Acople Reforzado | `catalogo acople reforzado.pdf` |
| Acople Dentado | `catalogo acople dentado.pdf` |
| Embrague Neumático CB | `catalogo embrague CB.pdf` |
| Embrague Neumático VC | `catalogo embrague vc.pdf` |
| Embrague EB y ER | `catalogo embrague EB y ER.pdf` |
| Embrague Split | `catalogo embrague split.pdf` |
| Unión Giratoria Ruadigon | `catalogo union giratoria.pdf` |
| Pescadores de Varilla | `catalogo pescadores de varilla.pdf` |
| Balata/Cinta Tejida (Indubal) | links externos |

---

## Despliegue

- **Repositorio:** `https://github.com/lumberparker/gd-industrial-mex`
- **Hosting:** Netlify (deploy automático en cada push a `main`)
- **Rama principal:** `main`

Para hacer cambios:
```bash
git add <archivos>
git commit -m "descripción"
git push
```

---

## Preview Local

```bash
python3 -m http.server 8771 --directory "/Users/rodneyparker/G&D"
```

O usar el servidor configurado en `.claude/launch.json` con la herramienta de preview de Claude Code.

---

## Estado Actual (julio 2026)

### ✅ Completado

- Estructura del catálogo completamente dinámica desde `productos.json`
- 10 categorías, 36 productos
- Lightbox de imágenes al hacer click
- Botón "Ver Catálogo →" para productos con PDF, WhatsApp para el resto
- Sección de contacto rediseñada (sin formulario, CTA WhatsApp + info de contacto)
- Hero carrusel con 11 slides (todas comprimidas, carga rápida)
- Imágenes de productos en modo `contain` (sin recorte)
- 9 catálogos PDF subidos y vinculados

### ⏳ Pendiente

- **Catálogos PDF faltantes** — a la espera de recibir los archivos para los productos restantes
- **Imágenes de Mecanotécnica** — en proceso; los siguientes nombres de archivo están esperando sus imágenes:
  - `mecanotecnica__empaques-bop.jpg`
  - `mecanotecnica__limpiador-cable-espiral.jpg`
  - `mecanotecnica__copas-pistones-bomba.jpg`
  - `mecanotecnica__copas-zapato-anclaje.jpg`
  - `mecanotecnica__insertos-valvulas-bomba.jpg`
  - `mecanotecnica__uniones-acoples-rapidos.jpg`
  - `mecanotecnica__empaquetaduras-t-prensa.jpg`
  - `mecanotecnica__valvulas-integrales-bomba.jpg`
  - `mecanotecnica__copas-pistoneo.jpg`
  - `mecanotecnica__centralizador-varilla.jpg`
  - `mecanotecnica__hule-economizador-h.jpg`
  - `mecanotecnica__partes-acumulador-amortiguador.jpg`
  - `mecanotecnica__tapones-cementacion.jpg`
