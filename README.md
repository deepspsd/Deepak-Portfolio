# AI Engineer Portfolio - Deepak Prasad S

A modern, professional portfolio website for an AI Engineer, featuring smooth animations, dark/light theme toggle, and comprehensive sections showcasing skills, projects, and experience.

## Features

### Sections
- **Hero/Landing**: Animated name display with blur-in effects and profile image
- **About**: Personal introduction, philosophy, and tech stack
- **Projects**: Showcase of 6 AI/ML projects with tech stacks and links
- **Skills & Tools**: Categorized display of technical and professional skills
- **Experience**: Timeline view of work history with achievements
- **Education**: Academic background, certifications, and publications
- **Contact**: Contact form and social media links
- **Footer**: Quick links and social connections

### Animations
- Scroll-triggered animations using Framer Motion
- Blur-in text effects on hero section
- Fade-in and slide-up transitions for cards and sections
- Smooth scroll navigation between sections
- Hover effects on interactive elements

### Design
- Dark/light theme toggle
- Fully responsive (mobile, tablet, desktop)
- Professional color scheme with accent color (#C3E41D)
- Custom fonts (Fira Code, Antic)
- Consistent design language throughout

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── portfolio-hero.tsx    # Hero section with navigation
│   │       ├── about.tsx             # About section
│   │       ├── projects.tsx          # Projects showcase
│   │       ├── skills.tsx            # Skills & tools
│   │       ├── experience.tsx        # Work experience timeline
│   │       ├── education.tsx         # Education & certifications
│   │       ├── contact.tsx           # Contact form
│   │       └── footer.tsx            # Footer with links
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Global styles
├── index.html                        # HTML template
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite configuration
└── package.json                      # Dependencies
```

## Customization

### Personal Information
Update the following files with your information:
- `src/components/ui/portfolio-hero.tsx` - Name and tagline
- `src/components/ui/about.tsx` - Bio and tech stack
- `src/components/ui/projects.tsx` - Your projects
- `src/components/ui/experience.tsx` - Work history
- `src/components/ui/education.tsx` - Academic background
- `src/components/ui/contact.tsx` - Contact details and social links

### Styling
- Colors: Edit `tailwind.config.js` to change accent color
- Fonts: Modify `src/index.css` to use different fonts
- Theme: Adjust dark/light mode colors in component files

### Profile Image
Replace the Unsplash URL in `portfolio-hero.tsx` with your own image

## Technologies

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Fonts**: Google Fonts (Fira Code, Antic)

## Navigation

The menu in the header provides smooth scroll navigation to all sections:
- HOME → Hero section
- ABOUT → About section
- PROJECTS → Projects showcase
- SKILLS → Skills & tools
- EXPERIENCE → Work timeline
- EDUCATION → Academic background
- CONTACT → Contact form

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Deepak Prasad S. All rights reserved.
