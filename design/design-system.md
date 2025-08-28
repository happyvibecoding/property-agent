# Tenant Management Platform - Design System

**Version:** 1.0-MVP  
**Target:** 6-Day Sprint Implementation  
**Updated:** 2025-08-28

---

## Design Philosophy

### Core Principles
1. **Trust First**: Professional aesthetic that builds landlord confidence
2. **Speed to Value**: Interface optimized for quick task completion
3. **Cognitive Ease**: Minimal mental overhead for repetitive workflows
4. **Implementation Ready**: All specifications include Tailwind CSS classes
5. **Mobile Aware**: Responsive by default, desktop optimized

### Design Approach
- **Clean Professionalism**: Inspired by business tools like Linear, Notion
- **Information Density**: Maximize useful information per screen
- **Action Clarity**: Clear primary/secondary action hierarchy
- **Status Communication**: Rich visual feedback for system states

---

## Color Palette

### Primary Colors
```css
/* Blue - Trust & Professionalism */
--primary-50:  #eff6ff;   /* bg-blue-50 - Light backgrounds */
--primary-100: #dbeafe;   /* bg-blue-100 - Hover states */
--primary-500: #3b82f6;   /* bg-blue-500 - Primary actions */
--primary-600: #2563eb;   /* bg-blue-600 - Hover primary */
--primary-700: #1d4ed8;   /* bg-blue-700 - Active states */
--primary-900: #1e3a8a;   /* text-blue-900 - Dark text */

/* Usage Guidelines */
Primary-500: Main CTAs, active navigation, progress indicators
Primary-100: Backgrounds for cards, subtle highlights
Primary-600: Hover states for primary buttons
Primary-900: Important text, headings requiring emphasis
```

### Secondary Colors
```css
/* Green - Success & Positive States */
--success-50:  #f0fdf4;   /* bg-green-50 - Success backgrounds */
--success-100: #dcfce7;   /* bg-green-100 - Success highlights */
--success-500: #22c55e;   /* bg-green-500 - Success buttons */
--success-600: #16a34a;   /* bg-green-600 - Success hover */
--success-700: #15803d;   /* bg-green-700 - Success active */

/* Usage Guidelines */
Success-500: Approved status, send buttons, positive actions
Success-100: Success message backgrounds
Success-700: Success button active states
```

### Neutral Palette
```css
/* Gray Scale - UI Foundation */
--neutral-50:  #f9fafb;   /* bg-gray-50 - Page backgrounds */
--neutral-100: #f3f4f6;   /* bg-gray-100 - Card backgrounds */
--neutral-200: #e5e7eb;   /* bg-gray-200 - Borders, dividers */
--neutral-300: #d1d5db;   /* bg-gray-300 - Disabled states */
--neutral-400: #9ca3af;   /* text-gray-400 - Placeholder text */
--neutral-500: #6b7280;   /* text-gray-500 - Secondary text */
--neutral-600: #4b5563;   /* text-gray-600 - Body text */
--neutral-700: #374151;   /* text-gray-700 - Headings */
--neutral-800: #1f2937;   /* text-gray-800 - Primary text */
--neutral-900: #111827;   /* text-gray-900 - High emphasis */

/* Usage Guidelines */
Neutral-50: Main page background
Neutral-100: Card and panel backgrounds
Neutral-200: Input borders, subtle dividers
Neutral-600: Primary body text
Neutral-800: Headings and labels
```

### Semantic Colors
```css
/* Error States */
--error-50:  #fef2f2;     /* bg-red-50 - Error backgrounds */
--error-100: #fee2e2;     /* bg-red-100 - Error highlights */
--error-500: #ef4444;     /* bg-red-500 - Error buttons */
--error-600: #dc2626;     /* bg-red-600 - Error hover */
--error-700: #b91c1c;     /* text-red-700 - Error text */

/* Warning States */
--warning-50:  #fffbeb;   /* bg-amber-50 - Warning backgrounds */
--warning-100: #fef3c7;   /* bg-amber-100 - Warning highlights */
--warning-500: #f59e0b;   /* bg-amber-500 - Warning buttons */
--warning-600: #d97706;   /* bg-amber-600 - Warning hover */
--warning-700: #b45309;   /* text-amber-700 - Warning text */

/* Info States */
--info-50:  #f0f9ff;      /* bg-sky-50 - Info backgrounds */
--info-100: #e0f2fe;      /* bg-sky-100 - Info highlights */
--info-500: #0ea5e9;      /* bg-sky-500 - Info buttons */
--info-600: #0284c7;      /* bg-sky-600 - Info hover */
--info-700: #0369a1;      /* text-sky-700 - Info text */
```

---

## Typography Scale

### Font Families
```css
/* Primary Font Stack */
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Tailwind Class: font-sans (default) */
```

### Type Scale (Mobile-First)
```css
/* Display - Hero Headlines */
.text-display {
  font-size: 2.25rem;    /* 36px - text-4xl */
  line-height: 2.5rem;   /* 40px - leading-10 */
  font-weight: 800;      /* font-extrabold */
  letter-spacing: -0.025em; /* tracking-tight */
}

/* H1 - Page Titles */
.text-h1 {
  font-size: 1.875rem;   /* 30px - text-3xl */
  line-height: 2.25rem;  /* 36px - leading-9 */
  font-weight: 700;      /* font-bold */
  letter-spacing: -0.025em; /* tracking-tight */
}

/* H2 - Section Headers */
.text-h2 {
  font-size: 1.5rem;     /* 24px - text-2xl */
  line-height: 2rem;     /* 32px - leading-8 */
  font-weight: 600;      /* font-semibold */
  letter-spacing: -0.025em; /* tracking-tight */
}

/* H3 - Card Titles */
.text-h3 {
  font-size: 1.25rem;    /* 20px - text-xl */
  line-height: 1.75rem;  /* 28px - leading-7 */
  font-weight: 600;      /* font-semibold */
}

/* Body - Default Text */
.text-body {
  font-size: 1rem;       /* 16px - text-base */
  line-height: 1.5rem;   /* 24px - leading-6 */
  font-weight: 400;      /* font-normal */
}

/* Small - Secondary Text */
.text-small {
  font-size: 0.875rem;   /* 14px - text-sm */
  line-height: 1.25rem;  /* 20px - leading-5 */
  font-weight: 400;      /* font-normal */
}

/* Tiny - Captions & Labels */
.text-tiny {
  font-size: 0.75rem;    /* 12px - text-xs */
  line-height: 1rem;     /* 16px - leading-4 */
  font-weight: 500;      /* font-medium */
  text-transform: uppercase; /* uppercase */
  letter-spacing: 0.05em; /* tracking-wider */
}
```

### Typography Usage Guidelines
- **Display**: Dashboard headlines, empty state messages
- **H1**: Page titles (Dashboard, Inbox, Property Details)
- **H2**: Section headers (Recent Activity, Email Threads)
- **H3**: Card titles (Property names, Email subjects)
- **Body**: Email content, descriptions, form labels
- **Small**: Timestamps, metadata, helper text
- **Tiny**: Status badges, category labels, navigation labels

---

## Spacing System

### Base Unit: 4px (0.25rem)
All spacing follows an 8px grid system with 4px increments.

```css
/* Spacing Scale */
--space-1:  0.25rem;  /* 4px  - space-1  */
--space-2:  0.5rem;   /* 8px  - space-2  */
--space-3:  0.75rem;  /* 12px - space-3  */
--space-4:  1rem;     /* 16px - space-4  */
--space-5:  1.25rem;  /* 20px - space-5  */
--space-6:  1.5rem;   /* 24px - space-6  */
--space-8:  2rem;     /* 32px - space-8  */
--space-10: 2.5rem;   /* 40px - space-10 */
--space-12: 3rem;     /* 48px - space-12 */
--space-16: 4rem;     /* 64px - space-16 */
--space-20: 5rem;     /* 80px - space-20 */
--space-24: 6rem;     /* 96px - space-24 */

/* Usage Guidelines */
space-1, space-2: Icon spacing, tight layouts
space-4: Default element spacing, form fields
space-6: Card padding, section spacing
space-8: Component separation, page margins
space-12: Section separation, modal spacing
space-16+: Hero spacing, major page divisions
```

### Layout Containers
```css
/* Container Widths */
.container-sm  { max-width: 640px;  } /* sm container */
.container-md  { max-width: 768px;  } /* md container */
.container-lg  { max-width: 1024px; } /* lg container */
.container-xl  { max-width: 1280px; } /* xl container */
.container-2xl { max-width: 1536px; } /* 2xl container */

/* Breakpoints */
sm:  640px  - Small tablets, large phones
md:  768px  - Tablets
lg:  1024px - Small laptops
xl:  1280px - Laptops, desktops
2xl: 1536px - Large desktops
```

### Grid System
```css
/* Standard Grid - 12 Column */
.grid-cols-12    /* grid-cols-12 - 12 column grid */
.col-span-6      /* col-span-6 - Half width */
.col-span-4      /* col-span-4 - Third width */
.col-span-3      /* col-span-3 - Quarter width */
.gap-4           /* gap-4 - Standard grid gap */
.gap-6           /* gap-6 - Larger grid gap */

/* Common Layout Patterns */
.dashboard-grid  { grid-template-columns: 1fr 2fr 1fr; }
.inbox-layout    { grid-template-columns: 320px 1fr; }
.property-cards  { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
```

---

## Component Variants

### Button System

#### Primary Buttons
```css
/* Primary Button - Main Actions */
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 active:bg-blue-700
         text-white font-medium rounded-lg px-4 py-2.5
         transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

/* Usage: Send Email, Create Property, Save Changes */
```

#### Secondary Buttons
```css
/* Secondary Button - Supporting Actions */
.btn-secondary {
  @apply bg-white hover:bg-gray-50 active:bg-gray-100
         text-gray-700 font-medium rounded-lg px-4 py-2.5
         border border-gray-300 transition-colors duration-200
         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

/* Usage: Cancel, Edit, View Details */
```

#### Success Buttons
```css
/* Success Button - Positive Actions */
.btn-success {
  @apply bg-green-500 hover:bg-green-600 active:bg-green-700
         text-white font-medium rounded-lg px-4 py-2.5
         transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2;
}

/* Usage: Approve Application, Mark as Responded */
```

#### Danger Buttons
```css
/* Danger Button - Destructive Actions */
.btn-danger {
  @apply bg-red-500 hover:bg-red-600 active:bg-red-700
         text-white font-medium rounded-lg px-4 py-2.5
         transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2;
}

/* Usage: Delete Property, Reject Application */
```

#### Button Sizes
```css
/* Small Button */
.btn-sm {
  @apply px-3 py-2 text-sm;
}

/* Large Button */
.btn-lg {
  @apply px-6 py-3 text-lg;
}

/* Full Width Button */
.btn-full {
  @apply w-full justify-center;
}
```

#### Disabled State
```css
.btn:disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}
```

### Form Components

#### Input Fields
```css
/* Text Input */
.input {
  @apply block w-full rounded-lg border border-gray-300 px-3 py-2.5
         text-gray-900 placeholder-gray-400 focus:border-blue-500
         focus:ring-1 focus:ring-blue-500 transition-colors duration-200;
}

/* Input with Error */
.input-error {
  @apply border-red-300 focus:border-red-500 focus:ring-red-500;
}

/* Input Disabled */
.input:disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}
```

#### Labels
```css
.label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.label-required::after {
  content: '*';
  @apply text-red-500 ml-1;
}
```

#### Form Groups
```css
.form-group {
  @apply space-y-2 mb-4;
}

.form-group-inline {
  @apply flex items-center space-x-4;
}
```

### Card Components

#### Base Card
```css
.card {
  @apply bg-white rounded-lg border border-gray-200 shadow-sm p-6;
}

.card-header {
  @apply border-b border-gray-200 pb-4 mb-4;
}

.card-title {
  @apply text-lg font-semibold text-gray-900;
}

.card-description {
  @apply text-sm text-gray-500 mt-1;
}
```

#### Interactive Card
```css
.card-hover {
  @apply hover:shadow-md transition-shadow duration-200 cursor-pointer;
}

.card-selected {
  @apply ring-2 ring-blue-500 border-blue-500;
}
```

#### Property Card
```css
.property-card {
  @apply bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow;
}

.property-card-status {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.property-card-status.available {
  @apply bg-green-100 text-green-800;
}

.property-card-status.rented {
  @apply bg-gray-100 text-gray-800;
}
```

### Status Badges

#### Badge Base
```css
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

/* Status Variants */
.badge-new {
  @apply bg-blue-100 text-blue-800;
}

.badge-interested {
  @apply bg-yellow-100 text-yellow-800;
}

.badge-applied {
  @apply bg-purple-100 text-purple-800;
}

.badge-approved {
  @apply bg-green-100 text-green-800;
}

.badge-rejected {
  @apply bg-red-100 text-red-800;
}

.badge-closed {
  @apply bg-gray-100 text-gray-800;
}
```

### Loading States

#### Skeleton Loaders
```css
.skeleton {
  @apply animate-pulse bg-gray-200 rounded;
}

.skeleton-text {
  @apply h-4 bg-gray-200 rounded animate-pulse;
}

.skeleton-title {
  @apply h-6 bg-gray-200 rounded animate-pulse;
}

.skeleton-avatar {
  @apply h-10 w-10 bg-gray-200 rounded-full animate-pulse;
}
```

#### Loading Spinners
```css
.spinner {
  @apply animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full;
}

.spinner-sm {
  @apply h-4 w-4;
}

.spinner-lg {
  @apply h-8 w-8;
}
```

### Navigation Components

#### Tab Navigation
```css
.tab-nav {
  @apply border-b border-gray-200;
}

.tab-nav-list {
  @apply flex space-x-8;
}

.tab-nav-item {
  @apply py-2 px-1 border-b-2 border-transparent text-sm font-medium
         text-gray-500 hover:text-gray-700 hover:border-gray-300
         focus:outline-none focus:text-gray-700 focus:border-gray-300;
}

.tab-nav-item.active {
  @apply text-blue-600 border-blue-600;
}
```

#### Breadcrumbs
```css
.breadcrumb {
  @apply flex items-center space-x-2 text-sm text-gray-500;
}

.breadcrumb-item {
  @apply hover:text-gray-700;
}

.breadcrumb-separator {
  @apply text-gray-400;
}

.breadcrumb-current {
  @apply text-gray-900 font-medium;
}
```

---

## Layout Patterns

### Dashboard Layout
```css
.dashboard-layout {
  @apply min-h-screen bg-gray-50;
}

.dashboard-header {
  @apply bg-white border-b border-gray-200 px-6 py-4;
}

.dashboard-main {
  @apply flex-1 p-6;
}

.dashboard-sidebar {
  @apply w-64 bg-white border-r border-gray-200 p-6;
}
```

### Inbox Layout
```css
.inbox-layout {
  @apply flex h-screen bg-gray-50;
}

.inbox-sidebar {
  @apply w-80 bg-white border-r border-gray-200 flex flex-col;
}

.inbox-main {
  @apply flex-1 flex flex-col;
}

.inbox-header {
  @apply border-b border-gray-200 p-4;
}

.inbox-content {
  @apply flex-1 p-6 overflow-y-auto;
}
```

### Property Grid
```css
.property-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.property-grid-item {
  @apply bg-white rounded-lg border border-gray-200 p-6
         hover:shadow-md transition-shadow duration-200;
}
```

---

## Interactive States

### Hover Effects
```css
.hover-lift {
  @apply hover:transform hover:-translate-y-1 transition-transform duration-200;
}

.hover-shadow {
  @apply hover:shadow-lg transition-shadow duration-200;
}

.hover-scale {
  @apply hover:scale-105 transition-transform duration-200;
}
```

### Focus States
```css
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.focus-within-ring {
  @apply focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2;
}
```

### Active States
```css
.active-press {
  @apply active:transform active:scale-95 transition-transform duration-75;
}

.active-darken {
  @apply active:bg-gray-900 active:bg-opacity-20;
}
```

---

## Animation & Transitions

### Standard Transitions
```css
.transition-base {
  @apply transition-all duration-200 ease-in-out;
}

.transition-fast {
  @apply transition-all duration-100 ease-in-out;
}

.transition-slow {
  @apply transition-all duration-300 ease-in-out;
}
```

### Micro-Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
```

---

## Accessibility Guidelines

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements have 3:1 contrast ratio minimum
- Focus indicators are clearly visible

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus order follows logical tab sequence
- Focus indicators are visible and consistent

### Screen Reader Support
- All images have appropriate alt text
- Form labels are properly associated
- Status changes are announced
- Semantic HTML is used throughout

### Implementation Classes
```css
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
}

.focus-visible:focus {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}
```

---

## Implementation Guidelines

### CSS Architecture
```css
/* Utility-First Approach with Tailwind */
1. Use Tailwind utilities for 90% of styling
2. Create component classes for repeated patterns
3. Use CSS custom properties for theming
4. Minimize custom CSS to essential components only
```

### Component Composition
```javascript
// Example Button Component Structure
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-blue-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Development Workflow
1. **Start with Tailwind utilities** for rapid prototyping
2. **Extract patterns** into reusable component classes
3. **Document decisions** in this design system
4. **Test accessibility** at each component level
5. **Optimize performance** by purging unused CSS

### File Organization
```
styles/
├── globals.css          # Tailwind imports, base styles
├── components.css       # Component-specific classes
└── utilities.css        # Custom utility classes

components/
├── ui/                  # Base UI components (Button, Input, Card)
├── forms/               # Form-specific components
└── layout/              # Layout components (Header, Sidebar)
```

---

## MVP Implementation Priority

### Day 1-2: Foundation
- Base color palette and typography
- Button variants (primary, secondary)
- Form components (input, label, button)
- Basic card component

### Day 3-4: Core Components
- Status badges for applicant pipeline
- Loading states and skeletons
- Navigation components
- Email thread display

### Day 5: Polish
- Hover and focus states
- Micro-animations
- Responsive adjustments
- Accessibility improvements

### Day 6: Testing & Refinement
- Cross-browser testing
- Accessibility audit
- Performance optimization
- Documentation updates

---

This design system provides implementation-ready specifications for building a professional tenant management platform. All components are optimized for rapid development while maintaining high visual standards and accessibility compliance.