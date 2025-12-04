# Civil CI — Civil Citizens Intelligence

## Overview

Civil CI is a civil-rights intelligence platform designed to help individuals targeted by systemic abuse. The application serves as a forensic case reconstruction and misconduct analysis hub, providing a professional interface for case review submissions and information presentation.

This is a full-stack application with a dark, forensic-themed aesthetic built using React, TypeScript, and Express. The site features multiple sections including hero, services, process explanation, about, and contact forms. It includes a full admin portal for content management (blog posts, case reviews, services, settings). The application uses a modern stack with Vite for building, Tailwind CSS for styling, shadcn/ui for components, and includes a backend API for handling case review submissions and admin operations.

## Admin Portal

The admin portal is accessible at `/admin` and requires an admin role. Features include:
- **Dashboard**: Overview of pending cases, activity, and quick actions
- **Case Reviews**: View, update status, and manage case review submissions
- **Blog Posts**: Create, edit, publish/unpublish intelligence briefings
- **Services**: View and edit service information (local session only)
- **Settings**: Site configuration, notifications, and email settings

## Email System

The email system uses Resend for transactional emails. To enable:
1. Add `RESEND_API_KEY` secret in the Secrets panel
2. Optionally set `FROM_EMAIL` and `ADMIN_EMAIL` environment variables

Emails sent:
- New case review notification to admin
- Case confirmation to submitter
- Status update notifications to clients

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Single Page Application (SPA) using Wouter for client-side routing
- Component-based architecture with reusable UI components from shadcn/ui

**Styling Approach**
- Tailwind CSS for utility-first styling with custom configuration
- Dark theme as primary design (specified in HTML and CSS)
- Custom color system using CSS variables for primary (dark red), accent (warm gold), and various background shades
- Custom fonts: Cormorant Garamond (serif) for headings, Montserrat (sans-serif) for body text
- shadcn/ui component library (New York style) for pre-built, accessible UI components

**Component Structure**
- Page components in `client/src/pages/` (home.tsx, not-found.tsx)
- Feature components in `client/src/components/` (hero-section, services-section, contact-section, etc.)
- Reusable UI components in `client/src/components/ui/` (from shadcn/ui)
- Custom hooks in `client/src/hooks/` for mobile detection and toast notifications

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and API calls
- React Hook Form with Zod validation for form handling
- Local state with React hooks (useState, useRef) for UI interactions and scroll navigation

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routes
- Node.js HTTP server wrapping Express
- TypeScript for type-safe server code

**API Design**
- RESTful API endpoints under `/api` prefix
- POST `/api/case-reviews` - Submit new case review request
- GET `/api/case-reviews` - Retrieve all case reviews
- GET `/api/case-reviews/:id` - Retrieve specific case review
- Request validation using Zod schemas with detailed error messages
- Standardized JSON responses with consistent error handling

**Development vs Production**
- Development: Vite middleware integrated with Express for HMR and fast refresh
- Production: Static file serving from pre-built `dist/public` directory
- Environment-based configuration (NODE_ENV)

### Data Storage Solutions

**Current Implementation**
- In-memory storage using Map data structures (MemStorage class)
- Implements IStorage interface for future database integration
- UUID-based ID generation for records

**Planned Database Integration**
- PostgreSQL configured via Drizzle ORM
- Neon serverless database connection ready (`@neondatabase/serverless`)
- Schema defined in `shared/schema.ts` with Drizzle table definitions
- Migration system set up with `drizzle-kit` (migrations folder, push command)

**Schema Design**
- `users` table: id, username, password
- `case_reviews` table: id, name, email, phone (optional), caseSummary, urgency, createdAt
- Zod schemas for runtime validation aligned with database schemas
- Type inference from Drizzle schemas for TypeScript safety

### External Dependencies

**UI Component Library**
- shadcn/ui with extensive Radix UI primitives (@radix-ui/* packages)
- Components include: accordion, alert-dialog, avatar, button, card, checkbox, dialog, dropdown-menu, form, input, select, tabs, toast, and many more
- All components customizable via Tailwind classes

**Form Management**
- React Hook Form (@hookform/resolvers) for form state
- Zod for schema validation with drizzle-zod for database schema integration
- Custom error formatting with zod-validation-error

**Database & ORM**
- Drizzle ORM (drizzle-orm) for type-safe database queries
- PostgreSQL support with Neon serverless adapter
- Database credentials managed via DATABASE_URL environment variable

**Development Tools**
- Replit-specific plugins for development experience (@replit/vite-plugin-*)
- TypeScript compiler for type checking
- PostCSS with Tailwind and Autoprefixer
- ESBuild for production server bundling

**Session & Security**
- express-session with connect-pg-simple for PostgreSQL session store
- Session configuration ready but not currently implemented in routes

**Utilities**
- date-fns for date manipulation
- nanoid for unique ID generation
- clsx and tailwind-merge (via cn utility) for conditional class management
- class-variance-authority for component variant handling