# Inbox Wireframe

## Overview
The inbox provides a unified communication hub where landlords can manage all email conversations with prospective tenants. It features AI-generated responses, conversation threading, and integrated applicant details.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Header Bar                                     │
│  Logo    [Dashboard] [Pipeline] [Inbox*] [Properties]    User Avatar Logout │
├─────────────────────────────────────────────────────────────────────────────┤
│ Sidebar │                Main Content                    │ Detail Sidebar │
│         │                                               │                 │
│ ┌─────┐ │ ┌─────────────────────────────────────────┐   │ ┌─────────────┐ │
│ │🔍   │ │ │            Conversation Thread          │   │ │  Applicant  │ │
│ │     │ │ │                                         │   │ │   Details   │ │
│ └─────┘ │ └─────────────────────────────────────────┘   │ │             │ │
│         │                                               │ │             │ │
│ ┌─────┐ │ ┌─────────────────────────────────────────┐   │ │             │ │
│ │Conv1│ │ │           Response Composer             │   │ │             │ │
│ │Conv2│ │ │                                         │   │ │             │ │
│ │Conv3│ │ │  [AI Draft] [Template ▼] [Send]        │   │ │             │ │
│ │...  │ │ └─────────────────────────────────────────┘   │ └─────────────┘ │
│ └─────┘ │                                               │                 │
│         │                                               │ ┌─────────────┐ │
│         │                                               │ │Quick Actions│ │
│         │                                               │ │             │ │
│         │                                               │ │             │ │
│         │                                               │ └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### 1. Left Sidebar - Conversation List

#### Search & Filter Bar:
```
┌─────────────────────────────────────┐
│ 🔍 Search conversations...          │
├─────────────────────────────────────┤
│ [All] [Unread] [Flagged] [Today]   │
└─────────────────────────────────────┘
```

#### Conversation List Item:
```
┌─────────────────────────────────────┐
│ ● Sarah Johnson                     │  ← Unread indicator
│ 🏠 123 Oak Street                   │
│                                     │
│ "Hi, I'm interested in viewing..."  │
│                                     │
│ 2:30 PM • Today                    │
│ 📧 property-123-oak@platform.com   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Mike Chen                         │  ← Read message
│ 🏠 456 Pine Avenue                  │
│                                     │
│ "Thanks for the quick response!"    │
│                                     │
│ Yesterday • 4:15 PM                │
│ 📧 property-456-pine@platform.com  │
└─────────────────────────────────────┘
```

**Visual Indicators:**
- **Unread**: Bold text + colored dot
- **Starred/Flagged**: Star icon
- **AI Response Pending**: Robot icon
- **High Priority**: Red border/badge
- **Property Association**: Property address visible

### 2. Main Content Area - Conversation Thread

#### Message Thread Layout:
```
┌─────────────────────────────────────────────────────────────────┐
│ Conversation: Sarah Johnson • 123 Oak Street                   │
│ 📧 property-123-oak@platform.com                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────────────────────────────────┐                    │ ← Incoming
│ │ Sarah Johnson                           │                    │
│ │ sarah.j@email.com                      │                    │
│ │                                         │                    │
│ │ Hi! I'm very interested in the 1BR at  │                    │
│ │ 123 Oak Street. Is it still available? │                    │
│ │ I can view this weekend if possible.    │                    │
│ │                                         │                    │
│ │ Today, 2:30 PM                         │                    │
│ └─────────────────────────────────────────┘                    │
│                                                                 │
│                    ┌─────────────────────────────────────────┐  │ ← AI Response
│                    │ 🤖 AI Response (Pending Your Review)   │  │
│                    │                                         │  │
│                    │ Hi Sarah,                               │  │
│                    │                                         │  │
│                    │ Thank you for your interest in 123 Oak │  │
│                    │ Street! Yes, the property is still     │  │
│                    │ available. I'd be happy to schedule a  │  │
│                    │ viewing this weekend.                   │  │
│                    │                                         │  │
│                    │ [Edit] [Approve & Send] [Reject]       │  │
│                    └─────────────────────────────────────────┘  │
│                                                                 │
│                    ┌─────────────────────────────────────────┐  │ ← Sent
│                    │ You                                     │  │
│                    │                                         │  │
│                    │ Hi Sarah, thanks for reaching out!     │  │
│                    │ The property is available and I can    │  │
│                    │ show it Saturday at 2 PM or Sunday     │  │
│                    │ at 10 AM. Let me know what works!      │  │
│                    │                                         │  │
│                    │ Yesterday, 3:45 PM ✓✓                  │  │
│                    └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

#### Response Composer:
```
┌─────────────────────────────────────────────────────────────────┐
│ Compose Response                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Hi Sarah,                                                   │ │
│ │                                                             │ │
│ │ [Type your message here...]                                 │ │
│ │                                                             │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [🤖 Generate AI Response] [📝 Template ▼] [📎 Attach] [Send]    │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Right Sidebar - Applicant Details & Actions

#### Applicant Profile Card:
```
┌─────────────────────────────────────┐
│ CONTACT DETAILS                     │
├─────────────────────────────────────┤
│ 👤 Sarah Johnson                   │
│ 📧 sarah.j@email.com               │
│ 📱 (555) 123-4567                  │
│                                     │
│ APPLICATION STATUS                  │
│ ● New Inquiry                       │
│ 📅 First Contact: Today            │
│                                     │
│ PROPERTY INTEREST                   │
│ 🏠 123 Oak Street, Unit 2A         │
│ 💰 $3,200/month                    │
│ 📊 Match Score: 8.5/10             │
└─────────────────────────────────────┘
```

#### AI Insights Panel:
```
┌─────────────────────────────────────┐
│ 🤖 AI INSIGHTS                      │
├─────────────────────────────────────┤
│ • Serious prospect - asked specific │
│   questions about lease terms       │
│ • Available for immediate viewing   │
│ • Mentioned stable employment       │
│ • Recommended response tone: Professional │
└─────────────────────────────────────┘
```

#### Quick Actions Panel:
```
┌─────────────────────────────────────┐
│ QUICK ACTIONS                       │
├─────────────────────────────────────┤
│ [🏠 Schedule Viewing]               │
│ [📋 Send Application]               │
│ [⭐ Add to Favorites]               │
│ [🚫 Mark as Spam]                  │
│ [📞 Convert to Phone]              │
│ [📝 Add to Pipeline]               │
└─────────────────────────────────────┘
```

## Key Interaction Points

### 1. Conversation Management
- **Click Conversation**: Load thread in main area
- **Star/Flag**: Mark important conversations
- **Archive**: Remove from active list
- **Search**: Find by name, property, or message content

### 2. AI Response Handling
- **Review AI Draft**: Edit before sending
- **Approve**: Send as-is
- **Reject**: Start from scratch
- **Learn**: Train AI based on edits

### 3. Template System
```
Template Dropdown Menu:
┌─────────────────────────────────────┐
│ [📝] TEMPLATES                      │
├─────────────────────────────────────┤
│ • Initial Response                  │
│ • Viewing Invitation               │
│ • Application Request              │
│ • Property Details                 │
│ • Follow-up After Viewing          │
│ • Document Request                 │
│ • Application Status Update        │
│ ─────────────────────────────────── │
│ [+ Create New Template]            │
└─────────────────────────────────────┘
```

### 4. Real-time Features
- **Live Typing Indicators**: See when prospect is typing
- **Read Receipts**: Know when messages are opened
- **Push Notifications**: Alert for new messages
- **Auto-save Drafts**: Prevent message loss

## Mobile Responsive Considerations

### Tablet (768px - 1024px)
- Collapse right sidebar into slide-over panel
- Maintain three-column layout but with smaller widths
- Touch-friendly message selection and actions

### Mobile (320px - 767px)
- Stack views: List → Thread → Details
- Bottom navigation between views
- Floating compose button
- Swipe gestures for quick actions

#### Mobile Navigation:
```
┌─────────────────────────────────────┐
│ ← Back    Sarah Johnson      Info › │  ← Thread view header
├─────────────────────────────────────┤
│                                     │
│ [Message thread content]            │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ [Type message...] [Send]           │  ← Compose bar
└─────────────────────────────────────┘

Bottom Tab Bar:
┌─────────────────────────────────────┐
│ [Inbox*] [Thread] [Details] [More]  │
└─────────────────────────────────────┘
```

## Advanced Features

### 1. AI Response Configuration
```
┌─────────────────────────────────────┐
│ 🤖 AI RESPONSE SETTINGS             │
├─────────────────────────────────────┤
│ Response Tone: [Professional ▼]    │
│ Auto-send: [Review Required ▼]     │
│ Include Property Info: [✓]         │
│ Suggest Next Steps: [✓]            │
│ Language: [English ▼]              │
│                                     │
│ Custom Instructions:                │
│ ┌─────────────────────────────────┐ │
│ │ Always mention pet policy and   │ │
│ │ parking availability...         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 2. Conversation Analytics
```
┌─────────────────────────────────────┐
│ 📊 CONVERSATION METRICS             │
├─────────────────────────────────────┤
│ • Average Response Time: 1.2 hours │
│ • Conversion Rate: 34%              │
│ • AI Accuracy: 92% approval rate   │
│ • Peak Hours: 6-8 PM weekdays      │
└─────────────────────────────────────┘
```

### 3. Smart Notifications
```
┌─────────────────────────────────────┐
│ 🔔 NOTIFICATION SETTINGS            │
├─────────────────────────────────────┤
│ New Messages: [Immediate ▼]        │
│ High Priority: [Push + Email ▼]    │
│ Working Hours: [9 AM - 6 PM ▼]     │
│ Weekend Mode: [Reduced ▼]          │
│                                     │
│ Custom Rules:                       │
│ • VIP prospects → Instant alert     │
│ • Spam keywords → Auto-filter       │
│ • After hours → Next day summary    │
└─────────────────────────────────────┘
```

## Information Architecture

### Data Priority:
1. **Critical**: Unread messages, high-priority prospects
2. **Important**: Recent conversations, AI-flagged items
3. **Contextual**: Historical threads, archived messages

### Search & Filtering:
- **Global Search**: Across all conversations and content
- **Smart Filters**: Unread, Starred, By Property, By Date
- **Advanced Search**: Sender, Keywords, Attachments

## Accessibility Features

- **Screen Reader**: Full conversation thread navigation
- **Keyboard Shortcuts**: 
  - Arrow keys: Navigate conversations
  - Enter: Open selected thread
  - R: Reply to current message
  - S: Star/unstar conversation
- **High Contrast**: Support for accessibility themes
- **Font Scaling**: Respect system font size preferences

## Performance Considerations

- **Message Pagination**: Load recent messages first
- **Image Optimization**: Compress attachments automatically
- **Background Sync**: Update conversations while app is backgrounded
- **Offline Mode**: Cache recent conversations for offline reading

## Security Features

- **Email Verification**: Confirm sender authenticity
- **Spam Detection**: AI-powered spam filtering
- **Data Encryption**: End-to-end encryption for sensitive data
- **Access Logs**: Track who accessed what conversations

## Success Metrics to Track

- **Response Time**: Average time to respond to inquiries
- **AI Acceptance Rate**: How often AI responses are approved
- **Conversion Rate**: Inquiries that become applications
- **User Satisfaction**: Rating of communication experience
- **Template Usage**: Most effective response templates