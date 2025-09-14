# Overview

This is a full-stack portfolio web application built with React, Express, and PostgreSQL. The application showcases a developer's portfolio with sections for personal information, skills, projects, and contact details. It features a modern, responsive design using shadcn/ui components and Tailwind CSS, with a dark theme aesthetic. The backend provides a REST API foundation with user management capabilities, while the frontend displays a comprehensive portfolio landing page.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state management and data fetching
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Component Structure**: Modular components organized by feature (Hero, About, Skills, Projects, Contact, Navigation)

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Storage Layer**: Abstract storage interface with in-memory implementation (MemStorage) as default
- **Database Integration**: Drizzle ORM configured for PostgreSQL with migration support
- **Development Server**: Custom Vite integration for hot module replacement in development

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Management**: Centralized schema definitions in `shared/schema.ts` with Zod validation
- **Migrations**: Drizzle Kit for database schema migrations in `./migrations` directory
- **Connection**: Neon Database serverless driver for PostgreSQL connectivity

## Authentication & User Management
- **User Schema**: Basic user model with username/password fields and UUID primary keys
- **Validation**: Zod schemas for input validation and type safety
- **Storage Interface**: Abstracted user CRUD operations supporting future database implementations

## Development & Build Process
- **Development**: Vite dev server with HMR, TypeScript checking, and Replit-specific plugins
- **Production Build**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Shared TypeScript configuration across frontend, backend, and shared modules
- **Path Aliases**: Configured aliases for clean imports (`@/`, `@shared/`, `@assets/`)

## External Dependencies

- **Database**: PostgreSQL (via Neon Database serverless)
- **UI Components**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Inter, JetBrains Mono) for typography
- **Development**: Replit-specific plugins for cartographer and dev banner
- **Build Tools**: Vite, esbuild, TypeScript compiler, and PostCSS for processing
- **Form Handling**: React Hook Form with Hookform resolvers for validation
- **Date Utilities**: date-fns for date manipulation and formatting