# Civil CI Design Guidelines

## Design Approach
**Reference-Based + Brand-Specific**: This is a unique brand with strong forensic/investigative aesthetic. Draw inspiration from dark, professional intelligence/investigation interfaces while maintaining the fierce citizen-movement energy.

## Core Visual Identity

### Color Palette
- **Background**: Deep charcoal to almost black (#0a0a0a to #1a1a1a)
- **Primary Accent**: Dark, powerful red (#8b1a1a to #a31f1f) for headings and critical emphasis
- **Secondary Accent**: Warm gold (#d4af37 to #f4c430) for underlines, highlights, buttons, and CTAs
- **Text**: Off-white (#f5f5f5 to #e8e8e8) for optimal readability on dark background
- **Subtle Elements**: Dark gray (#2a2a2a to #3a3a3a) for cards, borders, dividers

### Typography
- **Headings**: Elegant serif (Cormorant Garamond or similar via Google Fonts)
  - Hero: 3.5rem to 4.5rem, bold weight
  - Section headers: 2.5rem to 3rem, semibold
  - Subsections: 1.75rem to 2rem
- **Body Text**: Clean modern sans-serif (Montserrat or similar)
  - Primary body: 1rem to 1.125rem, regular weight
  - Supporting text: 0.875rem to 1rem
  - Bold emphasis for key points

### Layout System
- **Spacing**: Use Tailwind units of 4, 8, 12, 16, 20 (p-4, m-8, gap-12, py-16, py-20)
- **Container**: max-w-7xl for main content, full-width dark backgrounds
- **Vertical Rhythm**: py-20 to py-32 for desktop sections, py-12 to py-16 for mobile

## Page Structure (One-Page Scrollable Site)

### 1. Hero Section
- **Layout**: Full viewport height (min-h-screen), split layout on desktop
- **Left Side** (60%): 
  - Brand name in elegant serif with gold underline accent
  - Tagline "For the people. Be the people." in smaller gold text
  - Mission statement (3-4 lines) in off-white
  - Two CTAs: Primary gold button "Book a Case Review", secondary outlined button "Explore Services"
  - Buttons should have backdrop blur when over imagery
- **Right Side** (40%): Strong portrait or forensic-themed dark image
- **Background**: Subtle smoke/light streak overlays, deep black base

### 2. What We Do Section
- **Layout**: 3-column grid on desktop (stack on mobile)
- **Cards**: Dark gray background (#2a2a2a), subtle red accent top border
- Each card: Icon/visual element, red heading, white body text
- Emphasize "intelligence unit for citizens" messaging

### 3. Services Section
- **Layout**: 2-column grid on large screens, single column on mobile
- **Service Cards**: 
  - Dark background with gold accent corner or border detail
  - Service name in red serif heading
  - Description in white sans-serif
  - "Contact for pricing" or price in gold
- 5 services total as specified in requirements

### 4. How It Works Section
- **Layout**: 4-step horizontal timeline on desktop, vertical on mobile
- **Visual Style**: Evidence board aesthetic - connecting lines between steps in gold
- Step numbers in large gold serif, step titles in red, descriptions in white
- Forensic markers/indicators between steps

### 5. About Section
- **Layout**: Single column, max-w-4xl centered
- **Typography**: Larger body text for readability, pull quote in 2rem gold serif italic
- **Quote**: Displayed prominently with gold left border accent
- Background could have subtle document/timeline imagery overlay at low opacity

### 6. Contact/Case Review Section
- **Layout**: 2-column on desktop - form on left, context/info on right
- **Form Fields**: 
  - Styled inputs with dark background, gold focus states
  - Name, Email, Phone (optional), Case Summary textarea, Urgency dropdown
  - Submit button: "Send Case Review" in gold with hover state
- **Right Column**: Reassuring copy about confidentiality, what to include, who should reach out

## Component Specifications

### Navigation (Sticky Header)
- Fixed/sticky top navigation, dark background with subtle transparency/blur
- Logo/brand name left, smooth-scroll section links right
- Links in off-white, gold underline on hover
- "Book Case Review" CTA button in gold on far right

### Buttons
- **Primary**: Gold background, dark text, subtle shadow, hover: darker gold
- **Secondary**: Gold border, gold text, transparent background, hover: gold background
- **Backdrop Blur**: Apply to buttons over hero images (backdrop-blur-sm bg-black/30)

### Cards
- Dark gray background (#2a2a2a)
- Subtle border or accent (red or gold depending on context)
- Padding: p-8 on desktop, p-6 on mobile
- Hover state: subtle lift (transform) and glow effect

### Typography Hierarchy
- **H1**: 3.5rem+ serif, red or gold
- **H2**: 2.5rem-3rem serif, red
- **H3**: 1.75rem-2rem serif, red or gold
- **Body**: 1rem-1.125rem sans-serif, off-white
- **Emphasis**: Gold color or bold weight, never both simultaneously

## Imagery

### Required Images
1. **Hero Image**: Strong, dark-toned portrait or forensic-themed image (evidence board, investigative workspace) - right side of hero, 40% width on desktop
2. **Section Backgrounds**: Subtle overlays of smoke, light streaks, document textures at 10-20% opacity
3. **About Section**: Optional timeline/document overlay for visual interest

### Image Treatment
- Dark, moody processing - increase contrast, reduce saturation slightly
- Never use bright, cheerful stock photos
- Forensic aesthetic: evidence boards, timelines, maps, string connections, documents
- All images should reinforce the investigative, war-room intelligence feel

### Image Sources
Use placeholder services (Unsplash with keywords: "investigation", "forensic", "dark portrait", "evidence board", "timeline") or placeholder comments for client-provided imagery

## Animations & Interactions
- **Minimal**: This is a serious, professional site
- Smooth scroll between sections
- Subtle fade-in on scroll for section content
- Button hover states with transform/shadow changes
- Card hover: subtle lift (translateY(-4px))
- NO distracting animations, carousels, or gimmicks

## Responsive Behavior
- **Desktop**: Multi-column grids, split hero, horizontal timeline
- **Tablet**: 2-column grids, stacked hero maintains impact
- **Mobile**: Single column throughout, maintain hierarchy and spacing
- Buttons stack vertically on mobile, full-width with spacing

## Footer
- Dark background, 3-column layout on desktop
- Column 1: Brand tagline and mission snippet
- Column 2: Quick links to sections
- Column 3: Contact info placeholder
- Bottom: Copyright, subtle gold accent line above
- Social proof element: "Exposing abuse. Defending citizens. Documenting truth."

## Tone Consistency
Every text element should feel: fierce yet controlled, intelligent, trauma-aware, anti-corruption, movement energy. Poetic in places, sharp warnings in others. Professional enough for lawyers, passionate enough for activists.