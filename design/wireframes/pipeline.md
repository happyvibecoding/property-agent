# Pipeline Wireframe

## Overview
The pipeline provides a Kanban-style board for managing applicant progression through the screening process. Landlords can drag applicants between stages, perform bulk actions, and track application status in real-time.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Header Bar                                     │
│  Logo    [Dashboard] [Pipeline*] [Inbox] [Properties]    User Avatar Logout │
├─────────────────────────────────────────────────────────────────────────────┤
│                              Filters & Actions Bar                          │
│ 🏠 [All Properties ▼] 📅 [This Week ▼] 👥 [All Status ▼] [Bulk Actions ▼] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │   NEW   │ │SCREENING│ │DOCUMENTS│ │APPROVED │ │REJECTED │              │
│  │  (12)   │ │   (8)   │ │   (5)   │ │   (3)   │ │   (7)   │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ [Card1] │ │ [Card3] │ │ [Card7] │ │ [Card9] │ │ [Card11]│              │
│  │ [Card2] │ │ [Card4] │ │ [Card8] │ │ [Card10]│ │ [Card12]│              │
│  │   ...   │ │ [Card5] │ │   ...   │ │   ...   │ │   ...   │              │
│  │         │ │ [Card6] │ │         │ │         │ │         │              │
│  │         │ │   ...   │ │         │ │         │ │         │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### 1. Header Bar
Same as Dashboard with Pipeline highlighted as active section

### 2. Filters & Actions Bar
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Property Filter   Date Range     Status Filter    Bulk Actions             │
│ 🏠 [Oak Street ▼] 📅 [Last 7 ▼] 👥 [Active ▼]   [Select All] [Actions ▼]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Filter Options:**
- **Property Filter**: All Properties, specific addresses
- **Date Range**: Today, This Week, This Month, Custom Range
- **Status Filter**: All, New Applications, In Review, Pending Documents
- **Search**: Name, email, or application ID

**Bulk Actions Menu:**
- Move to Stage
- Send Template Email
- Download Documents
- Export Applications
- Archive Selected

### 3. Kanban Board Columns

#### Column Layout:
Each column represents a stage in the application process:

```
┌─────────────────┐
│ STAGE NAME (##) │  ← Count badge
├─────────────────┤
│ [+ Add Card]    │  ← Quick add button
├─────────────────┤
│                 │
│ [Applicant Card]│  ← Draggable cards
│ [Applicant Card]│
│ [Applicant Card]│
│       ...       │
│                 │
│ [Load More...]  │  ← Pagination
└─────────────────┘
```

**Stage Columns:**
1. **NEW** - Recently submitted applications
2. **SCREENING** - Under background/credit check
3. **DOCUMENTS** - Awaiting additional documentation
4. **APPROVED** - Ready for lease signing
5. **REJECTED** - Applications that didn't qualify

### 4. Applicant Card Design

#### Standard Card Layout:
```
┌─────────────────────────────────────┐
│ [📋] Sarah Johnson                  │
│ 📧 sarah.j@email.com               │ 
│                                     │
│ 🏠 123 Oak Street, Unit 2A         │
│ 💰 $3,200/month                    │
│                                     │
│ ⏰ 3 days in stage                 │
│ 📅 Applied: Mar 15, 2024           │
│                                     │
│ 📊 Score: 8.5/10                   │
│ ✅ Credit: Excellent               │
│ ⚠️  Missing: Pay Stubs             │
│                                     │
│ [View] [Message] [Move ▼]          │
└─────────────────────────────────────┘
```

#### Card States and Visual Indicators:
- **Priority Indicator**: Red/Orange/Green border
- **Document Status**: Icons showing complete/missing docs
- **Days in Stage**: Time tracking with urgency colors
- **AI Score**: Computed qualification score
- **Action Needed**: Warning badges for required actions

### 5. Drag & Drop Functionality

#### Visual Feedback:
```
During Drag:
┌─────────────────────────────────────┐
│ [👤] Sarah Johnson (DRAGGING)      │  ← Semi-transparent
│ 📧 sarah.j@email.com               │
│ 🏠 123 Oak Street                  │
└─────────────────────────────────────┘

Drop Zone Highlight:
┌─────────────────┐
│ SCREENING (8)   │
├─────────────────┤  ← Highlighted border
│ ┌─────────────┐ │
│ │[Drop Here]  │ │  ← Drop indicator
│ └─────────────┘ │
│ [Existing Card] │
└─────────────────┘
```

## Key Interaction Points

### 1. Card Interactions
- **Single Click**: Select/highlight card
- **Double Click**: Open detailed view
- **Drag**: Move between stages
- **Right Click**: Context menu (Move, Message, Archive, etc.)

### 2. Stage Column Actions
- **Add Button**: Quick add new applicant
- **Column Header**: Sort options (Date, Score, Name)
- **Settings Icon**: Configure stage rules and automation

### 3. Bulk Actions
- **Select All**: Checkbox to select all visible cards
- **Individual Selection**: Checkboxes on each card
- **Actions Menu**: Operations on selected cards

### 4. Real-time Updates
- **Live Sync**: Changes from other users appear in real-time
- **Notification Toast**: "New application received" alerts
- **Badge Updates**: Column counts update automatically

## Mobile Responsive Considerations

### Tablet (768px - 1024px)
- Show 3 columns instead of 5
- Horizontal scroll for additional columns
- Larger touch targets for drag operations
- Simplified card layout

### Mobile (320px - 767px)
- Convert to vertical list view with stage tabs
- Swipe gestures for stage navigation
- Simplified card actions (tap to expand)
- Bottom sheet for bulk actions

#### Mobile Stage Tabs:
```
┌─────────────────────────────────────┐
│ [New] [Screen] [Docs] [Approved]   │  ← Horizontal scroll
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Sarah Johnson                   │ │
│ │ 123 Oak Street • 3 days        │ │
│ │ Score: 8.5 • Missing: Pay Stubs│ │
│ │ [View] [Message] [Move ▼]      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Mike Chen                       │ │
│ │ 456 Pine Ave • 1 day           │ │
│ │ Score: 9.2 • Complete          │ │
│ │ [View] [Message] [Move ▼]      │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## Information Architecture

### Data Hierarchy:
1. **Primary**: Applicant name, property, days in stage
2. **Secondary**: Contact info, application date, AI score
3. **Tertiary**: Document status, notes, history

### Navigation Flow:
1. Pipeline → Card Selection → Detailed View
2. Pipeline → Bulk Actions → Mass Operations
3. Pipeline → Filters → Focused View

## Advanced Features

### 1. Automation Rules
```
┌─────────────────────────────────────┐
│ 🤖 AUTOMATION ACTIVE                │
│                                     │
│ • Auto-move to Screening after      │
│   credit check completion           │
│ • Send reminder emails after 3      │
│   days in Documents stage          │
│ • Flag high-score applications      │
│   for priority review               │
└─────────────────────────────────────┘
```

### 2. Quick Actions Panel
```
┌─────────────────────────────────────┐
│ QUICK ACTIONS                       │
├─────────────────────────────────────┤
│ [📨 Send Template Email]            │
│ [📋 Request Missing Docs]           │
│ [📞 Schedule Call]                  │
│ [🏠 Schedule Viewing]               │
│ [✅ Approve Application]            │
│ [❌ Reject Application]             │
└─────────────────────────────────────┘
```

### 3. Analytics Overlay
```
┌─────────────────────────────────────┐
│ 📊 PIPELINE INSIGHTS                │
├─────────────────────────────────────┤
│ • Average time in Screening: 4 days │
│ • Bottleneck: Documents stage       │
│ • Conversion rate: 68% to approval  │
│ • Peak application time: Weekends   │
└─────────────────────────────────────┘
```

## Accessibility Features

- **Screen Reader Support**: Full ARIA labels for drag operations
- **Keyboard Navigation**: 
  - Tab through cards
  - Space to select
  - Arrow keys to move between columns
  - Enter to open details
- **High Contrast Mode**: Support for system preferences
- **Focus Management**: Clear focus indicators during drag operations

## Performance Considerations

- **Virtual Scrolling**: Handle large numbers of applications efficiently
- **Lazy Loading**: Load card details on demand
- **Optimistic Updates**: Show changes immediately, sync in background
- **Debounced Filtering**: Avoid excessive API calls during typing

## Error States

- **Load Failure**: Retry mechanism for failed column loads
- **Drag Conflicts**: Handle simultaneous moves by multiple users
- **Network Issues**: Offline indicator with sync status
- **Permission Errors**: Clear messaging for unauthorized actions

## Success Metrics to Track

- **Time in Stage**: Monitor bottlenecks and process efficiency
- **Conversion Rates**: Track drop-offs between stages
- **Drag vs Click**: Measure interaction preferences
- **Mobile Usage**: Optimize based on device usage patterns
- **Bulk Action Usage**: Understand workflow patterns