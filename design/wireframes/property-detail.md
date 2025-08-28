# Property Detail Wireframe

## Overview
The property detail page provides comprehensive management for individual properties, including unique email configuration, AI response settings, applicant tracking, viewing management, and performance metrics.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Header Bar                                     │
│  Logo    [Dashboard] [Pipeline] [Inbox] [Properties*]    User Avatar Logout │
├─────────────────────────────────────────────────────────────────────────────┤
│ ← Back to Properties                     Property: 123 Oak Street, Unit 2A  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌─────────────────────────────────────────┐ ┌─────────────────────────────┐ │
│ │          Property Information           │ │      Unique Email &         │ │
│ │                                         │ │    AI Configuration         │ │
│ │  [Property Photo Gallery]               │ │                             │ │
│ │                                         │ │                             │ │
│ │  Address, Rent, Features, etc.          │ │                             │ │
│ │                                         │ │                             │ │
│ └─────────────────────────────────────────┘ └─────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────┐ ┌─────────────────────────────┐ │
│ │        Active Applicants                │ │      Viewing Calendar       │ │
│ │                                         │ │                             │ │
│ │  [Applicant List with Status]           │ │  [Calendar Widget]          │ │
│ │                                         │ │                             │ │
│ │                                         │ │                             │ │
│ └─────────────────────────────────────────┘ └─────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                         Property Metrics & Analytics                    │ │
│ │                                                                         │ │
│ │  [Charts and KPIs]                                                      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### 1. Property Information Panel

#### Header Section:
```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to Properties                                           │
│                                                                 │
│ 123 Oak Street, Unit 2A                                       │
│ San Francisco, CA 94105                      [Edit Property]   │
│                                                                 │
│ Status: [Active] [Occupied] [Available: Mar 1]                │
└─────────────────────────────────────────────────────────────────┘
```

#### Photo Gallery:
```
┌─────────────────────────────────────────┐
│ [Main Property Photo - Large Display]   │
│                                         │
│                                         │
│                                         │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │Th 1│ │Th 2│ │Th 3│ │+5  │        │ ← Thumbnails
│ └─────┘ └─────┘ └─────┘ └─────┘        │
│                                         │
│ [📷 Add Photos] [✏️ Edit Gallery]       │
└─────────────────────────────────────────┘
```

#### Property Details:
```
┌─────────────────────────────────────────┐
│ BASIC INFORMATION                       │
├─────────────────────────────────────────┤
│ 🏠 Type: 1 Bedroom Apartment           │
│ 💰 Rent: $3,200/month                  │
│ 📐 Size: 850 sq ft                     │
│ 🛏️  Bed/Bath: 1 bed, 1 bath            │
│                                         │
│ FEATURES & AMENITIES                    │
│ ✅ In-unit laundry                      │
│ ✅ Pet-friendly (cats)                  │
│ ✅ Parking included                     │
│ ✅ Balcony                              │
│ ✅ Updated kitchen                      │
│                                         │
│ REQUIREMENTS                            │
│ • Income: 3x rent minimum               │
│ • Credit Score: 650+                   │
│ • Security Deposit: $3,200             │
│ • Move-in: First month + deposit        │
│                                         │
│ [✏️ Edit Details]                       │
└─────────────────────────────────────────┘
```

### 2. Unique Email & AI Configuration Panel

#### Email Settings:
```
┌─────────────────────────────────────────┐
│ PROPERTY EMAIL                          │
├─────────────────────────────────────────┤
│ 📧 property-123-oak@platform.com       │
│ [📋 Copy Email] [🔄 Regenerate]         │
│                                         │
│ EMAIL FORWARDING                        │
│ ✅ Forward to: your.email@gmail.com     │
│ ⚙️ [Manage Forwarding Rules]            │
│                                         │
│ NOTIFICATION SETTINGS                   │
│ ✅ Instant notifications                │
│ ✅ Daily digest at 8:00 AM              │
│ ⚠️  Weekend mode: Delayed responses      │
└─────────────────────────────────────────┘
```

#### AI Response Configuration:
```
┌─────────────────────────────────────────┐
│ 🤖 AI AUTO-RESPONSE SETTINGS            │
├─────────────────────────────────────────┤
│ Response Mode: [Review Required ▼]     │
│ Response Tone: [Professional ▼]        │
│ Language: [English ▼]                  │
│                                         │
│ AUTO-INCLUDE INFORMATION                │
│ ✅ Property details & rent              │
│ ✅ Viewing availability                 │
│ ✅ Application requirements             │
│ ✅ Pet policy & parking info            │
│                                         │
│ CUSTOM RESPONSE TEMPLATE                │
│ ┌─────────────────────────────────────┐ │
│ │ Thank you for your interest in 123  │ │
│ │ Oak Street! This beautiful 1BR      │ │
│ │ apartment features...               │ │
│ │                                     │ │
│ │ [Edit Template]                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ QUALIFICATION CRITERIA                  │
│ • Auto-approve viewings for prospects  │
│   with 700+ credit score indication    │
│ • Flag applications with pets (review) │
│ • Require income verification upfront  │
│                                         │
│ [💾 Save Settings] [🧪 Test Response]   │
└─────────────────────────────────────────┘
```

### 3. Active Applicants Panel

#### Applicant List:
```
┌─────────────────────────────────────────┐
│ CURRENT APPLICANTS (8)                  │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 👤 Sarah Johnson                   │ │
│ │ 📧 sarah.j@email.com               │ │
│ │ 📊 Score: 8.5/10                   │ │
│ │ ⏰ Stage: Screening (3 days)        │ │
│ │ [View Details] [Pipeline] [Message]│ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 👤 Mike Chen                       │ │
│ │ 📧 mike.c@email.com                │ │
│ │ 📊 Score: 9.2/10                   │ │
│ │ ⏰ Stage: Documents (1 day)         │ │
│ │ [View Details] [Pipeline] [Message]│ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 👤 Lisa Wang                       │ │
│ │ 📧 lisa.w@email.com                │ │
│ │ 📊 Score: 7.8/10                   │ │
│ │ ⏰ Stage: New (< 1 day)             │ │
│ │ [View Details] [Pipeline] [Message]│ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [View All Applicants] [Export List]    │
└─────────────────────────────────────────┘
```

#### Quick Stats:
```
┌─────────────────────────────────────────┐
│ APPLICANT PIPELINE SUMMARY              │
├─────────────────────────────────────────┤
│ New: 3 | Screening: 2 | Docs: 2 | Approved: 1 │
│                                         │
│ 📈 Conversion Rate: 68%                 │
│ ⏱️ Avg. Processing Time: 5.2 days       │
│ 🎯 Next Action: Review Mike Chen docs   │
└─────────────────────────────────────────┘
```

### 4. Viewing Calendar Widget

#### Calendar Display:
```
┌─────────────────────────────────────────┐
│ VIEWING SCHEDULE                        │
├─────────────────────────────────────────┤
│                                         │
│   March 2024                           │
│ S  M  T  W  T  F  S                    │
│             1  2  3                     │
│ 4  5  6  7  8  9  10                   │
│ 11 12 13 14 ●● ●● 17  ← Booked slots   │
│ 18 19 20 21 22 23 24                   │
│ 25 26 27 28 29 30 31                   │
│                                         │
│ UPCOMING VIEWINGS                       │
│ ┌─────────────────────────────────────┐ │
│ │ Today, 2:00 PM                     │ │
│ │ Sarah Johnson + 1 guest            │ │
│ │ [Contact] [Reschedule] [Cancel]    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Tomorrow, 10:00 AM                 │ │
│ │ Mike Chen                          │ │
│ │ [Contact] [Reschedule] [Cancel]    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [📅 Manage Schedule] [⚙️ Set Availability] │
└─────────────────────────────────────────┘
```

### 5. Property Metrics & Analytics

#### Performance Dashboard:
```
┌─────────────────────────────────────────────────────────────────┐
│ PROPERTY PERFORMANCE METRICS                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │   VIEWS     │ │ INQUIRIES   │ │ APPLICATIONS│ │ CONVERSION  │ │
│ │             │ │             │ │             │ │             │ │
│ │    127      │ │     23      │ │      8      │ │    35%      │ │
│ │             │ │             │ │             │ │             │ │
│ │ ↗ +12 today │ │ ↗ +3 today  │ │ ↗ +2 today  │ │ ↗ Above avg │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ ACTIVITY TIMELINE (Last 30 Days)                               │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │    📊 [Activity Chart/Graph]                                │ │
│ │                                                             │ │
│ │    Peak Interest: Weekends                                  │ │
│ │    Best Response Time: < 2 hours                            │ │
│ │    Top Source: Craigslist (40%)                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ COMPETITIVE ANALYSIS                                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Your Rent: $3,200    Market Avg: $3,350    Position: Below │ │
│ │ Days on Market: 12   Market Avg: 18        Position: Good  │ │
│ │ Interest Level: High Competition: Medium    Outlook: ↗     │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Key Interaction Points

### 1. Property Management Actions
- **Edit Property**: Modify details, photos, requirements
- **Status Changes**: Active/Inactive, Available/Occupied
- **Photo Management**: Upload, reorder, delete images
- **Clone Property**: Create similar listings quickly

### 2. Email & Communication
- **Copy Email**: One-click copy unique email address
- **Test AI Responses**: Preview automated responses
- **Message Prospects**: Direct communication from property page
- **Template Management**: Edit response templates

### 3. Applicant Management
- **View Details**: Full applicant profile and documents
- **Pipeline Navigation**: Jump to specific applicant in pipeline
- **Bulk Actions**: Process multiple applicants at once
- **Export Data**: Download applicant information

### 4. Viewing Management
- **Schedule Viewings**: Block calendar slots
- **Availability Settings**: Define showing windows
- **Automated Scheduling**: Let prospects book directly
- **Viewing Prep**: Checklists and reminders

## Mobile Responsive Considerations

### Tablet (768px - 1024px)
- Stack panels in 2x2 grid instead of 2x3
- Maintain most functionality with touch optimization
- Collapsible sections for detailed views

### Mobile (320px - 767px)
- Single column layout with tabbed sections
- Priority order: Property Info → Applicants → Calendar → Analytics
- Simplified cards with essential information only
- Bottom sheet overlays for detailed actions

#### Mobile Section Tabs:
```
┌─────────────────────────────────────┐
│ [Info] [Applicants] [Schedule] [📊] │
├─────────────────────────────────────┤
│                                     │
│ [Section content based on tab]      │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

## Advanced Features

### 1. Automated Pricing Suggestions
```
┌─────────────────────────────────────┐
│ 🤖 PRICING INTELLIGENCE             │
├─────────────────────────────────────┤
│ Current Rent: $3,200                │
│ Market Suggestion: $3,350 (+$150)   │
│                                     │
│ Based on:                           │
│ • 3 similar units rented this month │
│ • Recent property improvements       │
│ • High interest/application ratio   │
│                                     │
│ [Apply Suggestion] [Learn More]     │
└─────────────────────────────────────┘
```

### 2. Marketing Optimization
```
┌─────────────────────────────────────┐
│ 📈 MARKETING INSIGHTS                │
├─────────────────────────────────────┤
│ • Add "pet-friendly" to title (+12% views) │
│ • Upload kitchen photo (+8% interest)      │
│ • Mention parking in description           │
│ • Best posting time: Sunday 7 PM          │
│                                     │
│ Auto-post to: [✓] Craigslist       │
│              [✓] Facebook          │
│              [ ] Zillow            │
└─────────────────────────────────────┘
```

### 3. Maintenance & Inspection Tracking
```
┌─────────────────────────────────────┐
│ 🔧 PROPERTY MAINTENANCE              │
├─────────────────────────────────────┤
│ Last Inspection: Feb 15, 2024       │
│ Next Due: May 15, 2024              │
│                                     │
│ Recent Work:                        │
│ • Kitchen faucet repair (Mar 1)     │
│ • HVAC service (Feb 20)             │
│                                     │
│ Upcoming:                           │
│ • Annual inspection due              │
│ • Smoke detector battery check      │
│                                     │
│ [Schedule Service] [View History]   │
└─────────────────────────────────────┘
```

## Information Architecture

### Data Flow:
1. Property Info → Email Configuration → AI Settings
2. Property Info → Current Applicants → Pipeline Management
3. Analytics → Performance Insights → Optimization Suggestions

### Action Hierarchy:
1. **Primary**: Edit property, manage applicants, view messages
2. **Secondary**: Schedule viewings, adjust settings, export data
3. **Tertiary**: Advanced analytics, maintenance tracking

## Accessibility Features

- **Alternative Text**: All images have descriptive alt text
- **Keyboard Navigation**: Full keyboard access to all functions
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader**: Structured headings and landmark regions
- **Color Independence**: Information not conveyed by color alone

## Performance Considerations

- **Image Optimization**: Lazy load property photos and thumbnails
- **Data Caching**: Cache frequently accessed property data
- **Progressive Loading**: Load critical information first
- **Background Updates**: Sync applicant status changes in real-time

## Success Metrics to Track

- **Property Performance**: Views, inquiries, applications per property
- **AI Effectiveness**: Response acceptance rate, prospect satisfaction
- **Time to Lease**: Days from listing to signed lease
- **Management Efficiency**: Time spent per property per week
- **Feature Usage**: Which tools are used most frequently