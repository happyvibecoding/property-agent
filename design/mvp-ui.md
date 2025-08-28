# Tenant Management Platform - MVP UI Design Specs
**AI Email Feature Only - Radical Simplification**

## Design Philosophy
Strip everything away except the magic: AI-powered email conversations for tenant management. Two screens. Maximum impact. Zero complexity.

## Color System
```css
/* Primary Colors */
--primary: #3B82F6      /* Blue - CTAs and magic elements */
--primary-light: #EFF6FF /* Light blue backgrounds */

/* Neutrals */
--gray-50: #F9FAFB      /* Page background */
--gray-100: #F3F4F6     /* Card backgrounds */
--gray-400: #9CA3AF     /* Secondary text */
--gray-600: #4B5563     /* Body text */
--gray-900: #111827     /* Primary text */

/* AI Magic */
--ai-gradient: linear-gradient(135deg, #667EEA 0%, #764BA2 100%)
--ai-border: #E0E7FF    /* Subtle AI response borders */

/* Status Colors */
--success: #10B981      /* Active conversations */
--warning: #F59E0B      /* Pending states */
```

## Typography Scale
```css
/* Headers */
H1: 32px/40px, font-weight: 700 (Property names, main headings)
H2: 24px/32px, font-weight: 600 (Section headers)
H3: 18px/28px, font-weight: 600 (Card titles, names)

/* Body */
Body: 16px/24px, font-weight: 400 (Default text)
Small: 14px/20px, font-weight: 400 (Timestamps, secondary)
Tiny: 12px/16px, font-weight: 500 (Labels, badges)
```

## Spacing System
- 4px: Tight spacing (badges, inline elements)
- 8px: Small gaps (form elements)
- 16px: Default spacing (cards, sections)
- 24px: Section separation
- 32px: Page margins
- 48px: Hero sections

---

## SCREEN 1: HOMEPAGE (Dashboard)

### Layout Structure
```
[Header: Logo + User Avatar]
[Main Content Area with max-width: 1200px, centered]
```

### Empty State (No Properties)
**Hero Section:**
- Centered layout with generous whitespace (48px all around)
- H1: "Add Your First Property"
- Subtitle: "Generate a magic email address to start receiving tenant applications"
- Primary CTA button: "Add Property" (56px height, rounded-lg)

### Properties List State
**Property Cards:**
- Grid layout: 1 column mobile, 2 columns tablet, 3 columns desktop
- Card style: White background, subtle shadow, 16px border radius
- Each card contains:
  - Property name (H3)
  - Address (Small text, gray-400)
  - Magic email with sparkle icon (✨)
  - Copy button (prominent, secondary style)
  - Active conversations badge (if > 0)

**Magic Email Display:**
```
✨ 123-elm-st@tenantai.com
[Copy] button (always visible, not on hover)
```

**Conversations Badge:**
- Positioned top-right of card
- Circular, primary color background
- White text, bold
- Only show if count > 0

---

## SCREEN 2: CONVERSATION VIEW

### Layout Structure (Desktop)
```
[Header: Back arrow + Property name]
[3-column layout:]
  - Left Sidebar (300px): Conversation list
  - Center (flex-1): Message thread  
  - Right Panel (320px): AI assistant
```

### Mobile Layout
- Stacked single column
- Swipe between conversations/messages/AI panel
- Bottom tab navigation between sections

### Left Sidebar: Conversation List
**Conversation Items:**
- Full-width clickable rows
- Avatar placeholder (circle, initials)
- Name (H3)
- Last message preview (truncated, gray-400)
- Timestamp (Small, gray-400)
- Active state: primary background with white text

### Center: Message Thread
**Header:**
- Applicant name (H2)
- Email address (Small, gray-400)

**Messages:**
- Human messages: Right-aligned, primary blue background, white text
- AI messages: Left-aligned, gray-100 background, gradient border-left (3px)
- Timestamps below each message cluster
- Generous spacing between message groups (24px)

**AI Message Styling:**
```css
.ai-message {
  background: var(--gray-100);
  border-left: 3px solid;
  border-image: var(--ai-gradient) 1;
  padding: 16px;
  border-radius: 0 12px 12px 0;
}
```

### Right Panel: AI Assistant
**Always visible elements:**
- "AI Suggested Response" header
- Generated response text area (readonly, styled like AI message)
- Three action buttons (stacked):
  - "Send Response" (Primary, full-width)
  - "Edit Response" (Secondary, full-width)  
  - "Generate New" (Ghost, full-width)

**Loading State:**
- Skeleton loader in response area
- Buttons disabled with loading spinner

---

## Component Specifications

### Buttons
**Primary Button:**
```css
background: var(--primary);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
height: 48px;
hover: brightness(110%);
```

**Secondary Button:**
```css
background: white;
border: 2px solid var(--primary);
color: var(--primary);
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
height: 48px;
```

**Copy Button (Special):**
```css
background: var(--primary-light);
color: var(--primary);
padding: 8px 16px;
border-radius: 6px;
font-weight: 500;
height: 36px;
border: 1px solid var(--primary);
```

### Cards
```css
.property-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid var(--gray-100);
}
```

### Magic Email Display
```css
.magic-email {
  font-family: 'SF Mono', 'Monaco', monospace;
  background: var(--primary-light);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px dashed var(--primary);
  display: flex;
  align-items: center;
  gap: 8px;
}
```

---

## Interaction Patterns

### Copy to Clipboard
- Instant feedback: Button text changes to "Copied!" for 2 seconds
- Visual feedback: Brief success color flash

### AI Response Generation
- Loading state with skeleton in response area
- Buttons disabled during generation
- Error state: "Try again" button if generation fails

### Navigation
- Back button always visible in conversation view
- Breadcrumbs: Property name in header
- Mobile: Swipe gestures between panels

### Real-time Updates
- New messages appear with subtle slide-in animation
- Conversation list updates automatically
- Badge counts update in real-time

---

## Mobile Adaptations

### Homepage
- Single column property cards
- Larger touch targets (48px minimum)
- Magic email display stacks vertically

### Conversation View
- Bottom tab bar: "Chats", "Messages", "AI"
- Swipe gestures between tabs
- AI panel slides up as modal when needed

---

## Key Visual Moments (TikTok-worthy)

1. **Magic Email Generation**: Sparkle animation when email is created
2. **AI Response Typing**: Typewriter effect when AI generates response
3. **Copy Success**: Satisfying confirmation animation
4. **New Message**: Smooth slide-in with gentle bounce

---

## Development Notes

### Tech Stack Alignment
- Built for Tailwind CSS rapid implementation
- Uses standard Tailwind spacing scale
- Component-based architecture ready
- Mobile-first responsive design

### Quick Implementation Wins
- Use Heroicons for all icons
- Tailwind UI components as base
- Radix UI for interactions (copy, tooltips)
- Simple CSS animations, no complex libraries needed

### Performance Considerations
- Minimal JavaScript for core functionality
- CSS-only animations where possible
- Lazy load conversation history
- Optimistic UI updates for copy actions

---

This design prioritizes the core magic: AI-powered email conversations. Everything else is stripped away to create maximum impact with minimum complexity. The UI is designed to be implemented rapidly while still feeling polished and modern.