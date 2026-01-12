# How I Learned to Be Human

A personal storytelling photo essay website for Brighton Ng's AP English Culminating Project.

## 🎯 Project Overview

This website tells the story of Brighton Ng's journey from childhood in Hong Kong through immigration to Canada, burnout, breaking down, and finding healing through connection.

- **Grandfather Teaching:** Love
- **Daniel Heath Justice Question:** "How do we learn to be human?"
- **Course Text Connection:** *Portraits from a Fire* (2021 Tsilhqot'in film by Trevor Mack)
- **Thesis:** "I lost myself in building. I found myself in sharing. Learning to be human means learning to love again—others, and myself."

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📸 Adding Your Photos

The website is structured with 11 phases, each containing specific images. Replace the placeholder SVG files with your actual photos.

### Image Locations

```
public/images/
├── phase1/   (Images 1-6: Love Received)
├── phase2/   (Images 7-9: Belonging)
├── phase3/   (Image 10: Uprooting)
├── phase4/   (Images 11-17: Replanting)
├── phase5/   (Images 18-20: The First Fade)
├── phase6/   (Images 21-23: The Reset)
├── phase7/   (Images 24-25: The Building)
├── phase8/   (Images 26-29: The Burning)
├── phase9/   (Images 30-33: The Breaking)
├── phase10/  (No images - text only)
├── phase11/  (Images 34-36: The Mending)
```

### Image Requirements

1. **Format:** JPG recommended (PNG also works)
2. **Naming:** Use the image number (e.g., `1.jpg`, `2.jpg`, etc.)
3. **Aspect Ratio:** 4:3 recommended for best display
4. **Resolution:** 1200-1600px width recommended
5. **Delete the `.svg` placeholder** and add your `.jpg` photo with the same number

### Example

To add your first photo:
1. Go to `public/images/phase1/`
2. Delete `1.svg`
3. Add your photo as `1.jpg`

## 🎨 Site Structure

### Sections

1. **Hero** - Landing page with title and thesis quote
2. **Phase 1-11** - Photo essay phases with images and captions
3. **Reflection** - Final reflection on the journey
4. **Footer** - Attribution and project details

### Design Features

- Warm, muted color palette
- Serif headings (Cormorant Garamond) for emotional weight
- Sans-serif body text (DM Sans) for readability
- Smooth scroll animations powered by Framer Motion
- Responsive design for desktop and mobile

## 🛠 Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Google Fonts (Cormorant Garamond, DM Sans)

## 📝 Customization

### Changing Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #0f0e0c;
  --foreground: #f5f0e8;
  --accent-warm: #d4a574;
  --accent-copper: #b87333;
  --text-muted: #a39e94;
}
```

### Editing Content

All phase data is in `src/app/page.tsx`. You can modify:
- Phase titles and subtitles
- Image captions
- Reflection content

## 📄 License

This project is for educational purposes as part of an AP English Culminating Project.

---

*Brighton Ng, 2025*
