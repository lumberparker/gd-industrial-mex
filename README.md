# G&D

Static website built with HTML, CSS (BEM), and vanilla JavaScript.

## Structure

```
G&D/
├── index.html
├── styles.css              # Single CSS entry point — imports all blocks
├── README.md
├── assets/
│   ├── fonts/
│   │   └── fonts.css       # @font-face declarations
│   ├── images/
│   ├── jsons/
│   └── videos/
├── blocks/                 # One CSS file per section (BEM blocks)
│   ├── loader.css
│   ├── page.css
│   ├── header.css
│   ├── hero.css
│   ├── marquee.css
│   ├── conoce.css
│   ├── propiedades.css
│   ├── presentaciones.css
│   ├── showcase.css
│   ├── productos.css
│   ├── encuentra.css
│   └── footer.css
└── scripts/                # One JS file per section
    ├── loader.js
    ├── header.js
    ├── hero.js
    ├── marquee.js
    ├── conoce.js
    ├── propiedades.js
    ├── presentaciones.js
    ├── showcase.js
    ├── productos.js
    ├── encuentra.js
    └── footer.js
```

## CSS conventions

Follows [BEM](https://getbem.com/) naming: `block__element--modifier`.

- Global resets and base styles live in `blocks/page.css`.
- Font-face declarations live in `assets/fonts/fonts.css`.
- `styles.css` is the only stylesheet linked in `index.html`.
