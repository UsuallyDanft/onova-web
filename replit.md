# Overview

Onova Web is a modern Next.js web application for Onovatech, a technology company that connects professionals and businesses with the best software and AI tools. The application serves as a marketplace platform featuring a home page, shop, community section, and various services. It's built with React 19 and Next.js 15, emphasizing modern web standards and performance optimization with Turbopack.

## Recent Changes (September 2025)
- **Color System Implementation**: Established a comprehensive CSS variables system for the Onovatech color palette in globals.css, replacing all hardcoded hex values across the codebase with semantic variable names for consistent theming and easier maintenance.
- **Project Structure Reorganization**: Completely restructured the project following Next.js best practices with proper component organization, route-based architecture, and clear separation between global components and page-specific components.
- **Navigation Enhancement**: Implemented dropdown menus for Tienda and Comunidad sections with smooth animations and proper mobile support in the sliding menu.
- **New Store Module**: Created complete store infrastructure with routes for products (/shop), categories (/shop/categories), product details (/shop/product/[slug]), and checkout (/checkout).
- **English Directory Structure**: Converted all Spanish directory names to English for better developer experience and international standards (/tienda → /shop, /categorias → /categories, /producto → /product).
- **ProductCard Component**: Created sophisticated product card component with image rotation, hover effects, interactive action buttons (cart/favorites), image indicators, and responsive design following the 4-section layout specification.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15 with App Router for modern React server components and client-side routing
- **Styling**: Tailwind CSS 4 for utility-first styling with custom CSS modules for component-specific styles
- **Fonts**: Google Fonts integration (Montserrat for headings, Lato for body text) with Next.js font optimization
- **Icons**: Lucide React and React Icons for consistent iconography
- **Animations**: GSAP (GreenSock) with React integration for smooth animations and interactions

## Component Structure
- **Layout Pattern**: Root layout component with global Header and Footer components
- **Page-based Routing**: File-based routing using Next.js App Router with pages for home, shop, and other sections
- **Component Organization**: Components organized in a principal folder structure with separate CSS files for styling
- **Responsive Design**: Mobile-first approach with responsive navigation and layout components

## Styling Strategy
- **CSS Variables**: Custom CSS properties for consistent theming (background, foreground colors)
- **Component-level CSS**: Separate CSS files for each major component to maintain modularity
- **Tailwind Integration**: PostCSS setup with Tailwind CSS for utility classes
- **Custom Styling**: Mix of Tailwind utilities and custom CSS for specific design requirements

## Development Environment
- **Build Tool**: Turbopack for faster development and build times
- **Linting**: ESLint with Next.js configuration for code quality
- **Path Aliases**: JSConfig setup with @ alias pointing to src directory for cleaner imports
- **Hot Reload**: Next.js dev server with Turbopack for instant updates during development

# External Dependencies

## Core Framework Dependencies
- **Next.js 15.5.2**: Main React framework with App Router and server components
- **React 19.1.0**: Latest React with concurrent features and improved hydration
- **React DOM 19.1.0**: React rendering library for web applications

## UI and Animation Libraries
- **GSAP 3.13.0**: Professional animation library for complex animations and interactions
- **@gsap/react 2.1.2**: React hooks and components for GSAP integration
- **Lucide React 0.542.0**: Modern icon library with React components
- **React Icons 5.5.0**: Popular icon library with multiple icon sets

## Styling and Development Tools
- **Tailwind CSS 4**: Utility-first CSS framework with PostCSS integration
- **@tailwindcss/postcss 4**: PostCSS plugin for Tailwind CSS processing
- **ESLint 9**: Code linting with Next.js specific rules and configurations

## Font Integration
- **Google Fonts**: Montserrat and Lato font families loaded through Next.js font optimization system for improved performance and reduced layout shift