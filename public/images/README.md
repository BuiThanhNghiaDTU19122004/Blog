# Asset Storage & Image Conventions

This directory contains static visual assets (icons, post illustrations, logos, and badges) served directly by Next.js from `/public/images/`.

## Folder Structure

```
public/images/
├── icons/      # Vector icons, retro UI badges, favicons, status graphics
├── posts/      # Article hero images, code diagrams, technical screenshots
└── README.md   # Asset guidelines and conventions
```

## Naming & Formatting Guidelines

1. **File Naming**:
   - Use `kebab-case` with lowercase letters, numbers, and hyphens only.
   - Examples: `win98-floppy.svg`, `nextjs-architecture-diagram.webp`, `avatar-retro.webp`.
   - Avoid spaces, special characters, uppercase letters, or ambiguous filenames like `IMG_001.png`.

2. **Preferred File Formats**:
   - **Icons & Graphics**: Use `.svg` vector format for clean pixel scaling and minimal filesize.
   - **Photos & Screenshots**: Use `.webp` format (or optimized `.png` for crisp pixel-art graphics).
   - Maximum recommended image width for inline article images: `1200px`.

3. **Usage in Next.js**:
   - Reference files directly using root relative paths:
     ```tsx
     <img src="/images/icons/win98-floppy.svg" alt="Floppy Icon" />
     <img src="/images/posts/architecture-diagram.webp" alt="Architecture" />
     ```
