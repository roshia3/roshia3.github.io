# Roshia Dutta — Homepage Specification

## 1. Project Overview

Build the homepage for a personal research portfolio belonging to Roshia Dutta, a Computer Science and Software Engineering undergraduate and aspiring PhD researcher.

The website will showcase machine learning research, AI research contributions, robotics interests, and selected technical projects.

The homepage should be visually immersive, minimalistic, futuristic, and atmospheric. It should resemble a contemporary digital art gallery combined with a sophisticated research publication.

**Important:** This is not a conventional corporate portfolio, resume template, or dashboard. Avoid generic card-heavy layouts, bright neon colors, and excessive decorative elements.

## 2. Design System

### Colors

Use the following consistent palette:

| Color | Hex | Purpose |
|---|---|---|
| Obsidian | #101715 | Main background |
| Deep Forest | #1D302A | Secondary background |
| Forest Charcoal | #17221F | Transitional sections |
| Porcelain | #F2F3EF | Main text |
| Sage Mist | #B3C6B5 | Primary accent |
| Steel Blue | #8295A5 | Secondary accent |
| Dusty Plum | #766A82 | Occasional accent |
| Silver Fog | #C8CCCA | Secondary text and borders |

The overall site should remain dark.

Green is the primary accent, followed by blue and plum. Avoid bright, saturated colors.

Use subtle gradients between dark green, charcoal, and nearly black. Do not introduce large light-colored sections.

### Typography

- Headings: Space Grotesk
- Body: Inter
- Large geometric headings with clean letterforms
- Small uppercase editorial labels with increased letter spacing
- Generous negative space and consistent typography hierarchy
- Thin divider lines and understated interactive elements

### Visual Style

Combine:
- Atmospheric futurism
- Surreal scientific imagery
- Translucent glass and metallic structures
- Abstract computational geometry
- Soft haze and cinematic lighting
- Subtle grain and noise textures
- Minimal editorial layouts

Use green-gray, blue-gray, and muted plum lighting in the artwork.

Avoid heavy botanical themes, generic AI brains, circuit-board imagery, and excessive glowing neon effects.

## 3. Global Navigation

Create a slim, fixed or sticky navigation bar.

Left:
**RD /** or **Roshia Dutta**

Right:
- About
- Research
- Projects
- CV

Navigation behavior:
- About scrolls to the homepage About section.
- Research scrolls to the Selected Research section.
- Projects scrolls to the Other Projects preview.
- CV links to the future CV page.

The navigation should remain accessible while scrolling.

Use subtle hover effects, thin borders, and a translucent dark background when necessary.

On mobile, use a compact accessible navigation menu.

## 4. Hero Section — Opening Scene

Create a full-viewport hero with an almost-black, green-tinted background.

### Exact Text

Small upper label:

PORTFOLIO / RESEARCH ARCHIVE

Main heading:

Roshia Dutta

Subtitle:

Machine Learning · AI Research · Robotics

Introduction:

Exploring intelligent systems through research, experimentation, and a curiosity for the unknown.

Bottom label:

SELECTED WORKS / 2024—PRESENT

Include a small animated scroll indicator.

### Layout

Use an asymmetrical editorial composition.

The name should be prominent and readable, positioned toward the left or upper-left area.

Place an abstract rotating sculpture toward the center or right side.

The sculpture should be visually substantial without obscuring the text.

Avoid enclosing the entire hero in a conventional card or bordered container.

### Sculpture

The ideal sculpture is an abstract three-dimensional object featuring:

- Translucent or metallic material
- Organic mathematical geometry
- Soft sage-green reflections
- Subtle silver and steel-blue highlights
- Cinematic lighting
- Slow continuous rotation
- Gentle floating movement

Do not use a floral object as the main sculpture.

Support three interchangeable asset types:

1. A local GLB/GLTF model
2. A looping WebM/MP4 animation
3. A transparent static image

If no external asset is available, create a simple procedural 3D sculpture using Three.js or React Three Fiber, such as an abstract torus knot with a restrained glass-like or metallic material.

Keep the sculpture implementation modular so it can be replaced later.

Do not download arbitrary copyrighted assets or introduce paid dependencies.

### Motion

On initial page load:
- Reveal the heading and subtitle with subtle fade and upward movement.
- Introduce the sculpture with a gentle fade.
- Begin slow continuous rotation.

On scroll:
- Shift the sculpture slightly toward the edge of the viewport.
- Adjust its scale subtly.
- Fade the hero text as the About section enters.
- Transition the background gradually into a slightly lighter forest-charcoal gradient.

Motion should be smooth, understated, and responsive to scrolling.

Respect prefers-reduced-motion.

## 5. About Section — Second Scene

### Background

Use a dark gradient transitioning between:

- #17221F
- #1D302A
- #293A34

The background must remain dark and atmospheric. Do not use white, ivory, or pale green as the section background.

Use subtle grain, soft gradient lighting, and generous negative space.

### Layout

Create a large two-column editorial composition.

Left:
- Personal portrait photograph
- Tall rectangular crop
- Minimal border or frame
- Soft, subtle entrance animation

Right:
- Small editorial label: 01 / ABOUT
- Large heading: About
- Three paragraphs of biography

On smaller screens, stack the portrait and text vertically.

### Exact About Text

Hello! I'm Roshia, a Computer Science and Software Engineering undergraduate at the University of Washington, with a minor in Data Science. My interests lie in machine learning, artificial intelligence, and exploring how intelligent systems can be developed to solve complex problems.

I have been working as an AI Research Assistant at the DAIS Lab, contributing to DeepTracer 3.0, a deep learning framework for protein structure prediction. More recently, I have been exploring quantitative finance through an independent research project investigating whether machine learning models can predict NVIDIA's next-day stock price direction.

Beyond my current research, I am particularly fascinated by robotics, especially humanoid robots and their potential to learn, reason, and interact autonomously with the physical world. Looking ahead, I hope to pursue a PhD in Computer Science, focusing on machine learning systems and their applications, particularly in robotics.

### Interaction

- Portrait fades in gently as the section enters the viewport.
- Biography appears with a subtle staggered reveal.
- Background gradient shifts gradually with scrolling.
- Avoid dramatic zooms or excessive animation.

Use a replaceable portrait asset at `/public/images/portrait.jpg`.

If the portrait is missing, display a tasteful placeholder.

## 6. Selected Works — Third Scene

### Introduction

Small label:

02 / SELECTED WORKS

Main heading:

Research & Projects

Supporting text:

A collection of research, experiments, and projects exploring machine learning, intelligent systems, and software development.

### Layout

Create a vertical, scrollable editorial gallery.

Do not use a conventional grid of identical cards.

Each featured project should occupy a large section with:
- Oversized project number
- Large cinematic visual
- Project title
- Short description
- Small category labels
- Subtle link to the full project page

Alternate the alignment of imagery and text between projects.

Use large negative space and thin editorial divider lines.

### Featured Work 01 — Quantitative Research

Category:

INDEPENDENT RESEARCH / MACHINE LEARNING

Title:

Can Machine Learning Predict the Stock Market?

Description:

An independent research project investigating NVIDIA's next-day stock direction through a comparison of Logistic Regression and Random Forest.

Visual direction:
- Abstract computational waves
- Fine particle structures
- Steel-blue and muted sage lighting
- Subtle data-inspired geometry
- Dark cinematic background

This should be the most prominent project preview.

Link destination:

`/research/quant`

### Featured Work 02 — DeepTracer 3.0

Category:

AI RESEARCH / GENERATIVE MODELS

Title:

DeepTracer 3.0

Description:

My research contributions to a deep learning framework for protein structure prediction at the DAIS Lab.

Visual direction:
- Abstract scientific structures
- Translucent molecular-inspired geometry
- Sage green and silver-gray lighting
- Minimal atmospheric composition

Link destination:

`/research/deeptracer`

### Featured Work 03 — Other Projects

Category:

ROBOTICS / SOFTWARE DEVELOPMENT

Title:

Other Projects

Description:

A collection of projects exploring robotics, game development, and AI-powered software.

Visual direction:
- Minimal mechanical forms
- Abstract metallic geometry
- Dark charcoal and muted green
- Technical and architectural imagery

Link destination:

`/projects`

The Other Projects page will eventually showcase projects in this order:
1. Robotics project
2. Video game
3. Finance AI software

### Gallery Interactions

- Reveal each project section as it enters the viewport.
- Use subtle image scaling or parallax.
- Animate arrows or fine divider lines on hover.
- Make project sections clearly clickable.
- Maintain accessible keyboard navigation.

Do not introduce unnecessary carousel controls.

## 7. Footer

Create a minimal dark footer.

Include:
- Roshia Dutta
- Machine Learning · AI Research · Robotics
- LinkedIn link
- GitHub link
- CV link
- Copyright notice with the current year

Use small editorial typography and subtle borders.

Keep the footer visually consistent with the homepage.

## 8. Technical Requirements

Use a modern, maintainable React-based architecture.

If the project is not initialized, use Vite, React, and TypeScript.

Recommended tools:
- Tailwind CSS for styling
- Framer Motion / Motion for animations
- Three.js or React Three Fiber only if needed for the sculpture
- Lucide icons

Use reusable components such as:

- Navbar
- Hero
- HeroSculpture
- About
- SelectedWorks
- ProjectFeature
- Footer

Keep colors, fonts, and animation settings centralized.

Ensure:
- Responsive desktop, tablet, and mobile layouts
- Accessible text contrast
- Semantic HTML
- Keyboard-accessible navigation
- Reduced-motion support
- Lazy-loaded media where appropriate
- Optimized image formats
- Good performance on ordinary laptops and phones

Avoid large animation dependencies unless necessary.

## 9. Asset Organization

Use the following structure:

`public/images/portrait.jpg`

`public/images/quant-preview.webp`

`public/images/deeptracer-preview.webp`

`public/images/projects-preview.webp`

`public/models/hero-sculpture.glb`

Only reference assets that actually exist.

If assets are missing, create visually appropriate placeholders and document what needs replacing.

Do not use random external images in the final implementation.

## 10. Scope of This Build

Implement only:

1. Global navigation
2. Hero section
3. About section
4. Selected Works gallery
5. Footer
6. Responsive styling and scroll animations

Create placeholder routes for the future Quant Research, DeepTracer, Other Projects, and CV pages if needed.

Do not build those individual pages yet.

## 11. Success Criteria

The homepage should:

- Feel cinematic, immersive, and futuristic
- Maintain a consistent dark green-black atmosphere
- Use minimal, sophisticated typography
- Feature an elegant moving sculpture
- Transition naturally between sections
- Present research as an editorial experience
- Remain readable and professional for PhD admissions
- Avoid looking like a PowerPoint presentation or generic portfolio template

The final result should feel like a personal research archive that can grow over many years.