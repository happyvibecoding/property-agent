# Dashboard Wireframe

## Overview
The dashboard provides landlords with a centralized view of all properties, key metrics, and quick access to critical actions. It serves as the primary landing page after login.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        Header Bar                               │
│  Logo    Navigation Menu                    User Avatar  Logout │
├─────────────────────────────────────────────────────────────────┤
│ Sidebar │                Main Content Area                      │
│         │                                                       │
│ Nav     │  ┌─────────────────────────────────────────┐         │
│ Menu    │  │          Stats Widgets Row              │         │
│         │  │  [Active]  [Apps]  [Msgs]  [Vacant]    │         │
│         │  └─────────────────────────────────────────┘         │
│         │                                                       │
│         │  ┌─────────────────────────────────────────┐         │
│         │  │         Quick Actions Bar               │         │
│         │  │  [Add Property] [View Pipeline] [Inbox] │         │
│         │  └─────────────────────────────────────────┘         │
│         │                                                       │
│         │  ┌─────────────────────────────────────────┐         │
│         │  │           Properties Grid               │         │
│         │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │         │
│         │  │  │Card1│ │Card2│ │Card3│ │Card4│        │         │
│         │  │  └─────┘ └─────┘ └─────┘ └─────┘        │         │
│         │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │         │
│         │  │  │Card5│ │Card6│ │Card7│ │Card8│        │         │
│         │  │  └─────┘ └─────┘ └─────┘ └─────┘        │         │
│         │  └─────────────────────────────────────────┘         │
│         │                                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### 1. Header Bar
- **Logo/Brand**: Platform name and icon
- **Navigation Menu**: Main sections (Dashboard, Pipeline, Inbox, Properties, Settings)
- **User Profile**: Avatar with dropdown (Profile, Settings, Logout)

### 2. Sidebar Navigation
- **Dashboard** (active state)
- **Pipeline** (with badge showing pending count)
- **Inbox** (with unread message count)
- **Properties** (expandable to show recent)
- **Analytics** (reports and insights)
- **Settings** (account and preferences)

### 3. Stats Widgets Row
Four key metric widgets displayed horizontally:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ ACTIVE      │  │ TOTAL       │  │ UNREAD      │  │ VACANT      │
│ LISTINGS    │  │ APPLICATIONS│  │ MESSAGES    │  │ PROPERTIES  │
│             │  │             │  │             │  │             │
│    12       │  │     47      │  │     8       │  │     3       │
│             │  │             │  │             │  │             │
│ ↗ +2 this   │  │ ↗ +15 this  │  │ ⚠ Needs     │  │ ⚡ Urgent   │
│   week      │  │   week      │  │   attention │  │   action    │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

### 4. Quick Actions Bar
Three primary action buttons:
- **Add Property**: Opens property creation modal
- **View Pipeline**: Navigate to applicant pipeline
- **Check Messages**: Navigate to inbox with filter for unread

### 5. Properties Grid
Responsive grid layout showing property cards:

#### Property Card Layout:
```
┌─────────────────────────────────────┐
│  [Property Photo/Thumbnail]         │
│                                     │
│  123 Oak Street, Unit 2A            │
│  San Francisco, CA 94105            │
│                                     │
│  $3,200/month                       │
│                                     │
│  Status: [Active] [Occupied]        │
│                                     │
│  📧 property-123-oak@platform.com   │
│  [Copy Email] [View Details]        │
│                                     │
│  ┌─────────┬─────────┬─────────┐    │
│  │ 5 Apps  │ 2 Msgs  │ 3 Views │    │
│  └─────────┴─────────┴─────────┘    │
│                                     │
│  [Manage] [Pipeline] [Edit]         │
└─────────────────────────────────────┘
```

## Key Interaction Points

### 1. Stats Widgets
- **Click**: Navigate to filtered view
- **Hover**: Show additional details
- **Real-time updates**: Auto-refresh every 30 seconds

### 2. Property Cards
- **Click card**: Open property detail page
- **Copy email**: One-click copy unique email to clipboard
- **Quick actions**: 
  - Manage: Access property settings
  - Pipeline: View applicants for this property
  - Edit: Modify property details

### 3. Search and Filters
```
┌─────────────────────────────────────────────────────────────────┐
│ 🔍 Search properties...  [All Status ▼] [All Types ▼] [Reset]   │
└─────────────────────────────────────────────────────────────────┘
```
- Search by address, rent amount, or property features
- Filter by status (Active, Inactive, Occupied, Vacant)
- Filter by property type (Apartment, House, Condo, etc.)

## Mobile Responsive Considerations

### Tablet (768px - 1024px)
- Collapse sidebar to icons only
- Stack stats widgets 2x2 instead of 1x4
- Reduce property grid to 2 columns

### Mobile (320px - 767px)
- Hide sidebar, replace with hamburger menu
- Stack stats widgets vertically
- Single column property grid
- Simplify property cards to essential info only
- Convert quick actions to floating action button

### Mobile Property Card (Simplified):
```
┌─────────────────────────┐
│ [Photo]                 │
│                         │
│ 123 Oak Street         │
│ $3,200/month           │
│                         │
│ [Active] 5 Apps 2 Msgs │
│                         │
│ [Manage ▼]             │
└─────────────────────────┘
```

## Information Architecture

### Primary Navigation Flow:
1. Dashboard → Property Selection → Property Detail
2. Dashboard → Quick Actions → Pipeline/Inbox
3. Dashboard → Stats Widgets → Filtered Views

### Data Priority Hierarchy:
1. **Critical**: Property status, unread messages, pending applications
2. **Important**: Property details, unique emails, recent activity
3. **Contextual**: Historical data, detailed metrics, secondary actions

## Accessibility Features

- **Keyboard Navigation**: Tab order through cards and actions
- **Screen Reader Support**: Alt text for images, ARIA labels for interactive elements
- **Color Contrast**: High contrast for status indicators and text
- **Focus Indicators**: Clear visual focus states for all interactive elements

## Performance Considerations

- **Lazy Loading**: Property images load as they come into viewport
- **Pagination**: Load 12 properties initially, infinite scroll for more
- **Caching**: Cache frequently accessed property data
- **Real-time Updates**: WebSocket connection for live stats and notifications

## Error States

- **No Properties**: Empty state with "Add Your First Property" CTA
- **Loading State**: Skeleton cards while data loads
- **Network Error**: Retry banner with offline indicator
- **Failed Actions**: Toast notifications for failed operations

## Success Metrics to Track

- **Time to Key Action**: How quickly users find what they need
- **Card Click-through Rate**: Which properties get the most attention
- **Quick Action Usage**: Most used shortcuts
- **Mobile vs Desktop Usage**: Responsive design effectiveness