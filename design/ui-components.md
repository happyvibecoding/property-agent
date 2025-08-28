# Tenant Management Platform - UI Components

**Version:** 1.0-MVP  
**Target:** 6-Day Sprint Implementation  
**Updated:** 2025-08-28

---

## Component Design Overview

These UI components are designed for rapid development while maintaining professional aesthetics that convey trust and efficiency. Each component includes visual hierarchy specifications, interactive states, responsive variations, and implementation-ready Tailwind CSS classes.

---

## 1. Property Card with Email Badge

### Visual Hierarchy & Layout

```
┌─────────────────────────────────────┐
│  [Property Photo - 320x200px]      │
│                                     │
├─────────────────────────────────────┤
│ 123 Oak Street, Unit 2A             │  ← H3 Title
│ San Francisco, CA 94105             │  ← Small Secondary
│                                     │
│ $3,200/month                        │  ← H2 Price
│                                     │
│ [Available] [Occupied]              │  ← Status Badges
│                                     │
│ 📧 property-123-oak@platform.com    │  ← Email Badge Row
│ [📋 Copy] [⚡ Quick Actions ▼]      │
│                                     │
│ ┌─────────┬─────────┬─────────┐    │  ← Stats Row
│ │ 5 Apps  │ 2 Msgs  │ 12 Views│    │
│ └─────────┴─────────┴─────────┘    │
├─────────────────────────────────────┤
│ [Edit] [View Pipeline] [Archive]    │  ← Hover Actions
└─────────────────────────────────────┘
```

### Base Component Classes

```css
.property-card {
  @apply bg-white rounded-lg border border-gray-200 overflow-hidden
         hover:shadow-md hover:border-gray-300 transition-all duration-200
         focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2;
}

.property-card-image {
  @apply w-full h-48 object-cover bg-gray-100;
}

.property-card-content {
  @apply p-6 space-y-4;
}

.property-card-title {
  @apply text-xl font-semibold text-gray-900 leading-tight;
}

.property-card-address {
  @apply text-sm text-gray-500;
}

.property-card-price {
  @apply text-2xl font-bold text-gray-900;
}
```

### Status Indicators

```css
.status-badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.status-badge.available {
  @apply bg-green-100 text-green-800;
}

.status-badge.pending {
  @apply bg-amber-100 text-amber-800;
}

.status-badge.rented {
  @apply bg-blue-100 text-blue-800;
}

.status-badge.maintenance {
  @apply bg-red-100 text-red-800;
}
```

### Email Badge with Copy-to-Clipboard

```css
.email-badge {
  @apply flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200
         hover:bg-gray-100 transition-colors duration-200;
}

.email-text {
  @apply text-sm font-mono text-gray-700 flex-1 truncate;
}

.copy-button {
  @apply ml-3 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white 
         text-xs font-medium rounded transition-colors duration-200
         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.copy-success {
  @apply bg-green-500 hover:bg-green-600;
}
```

### Quick Stats Row

```css
.stats-row {
  @apply grid grid-cols-3 gap-4;
}

.stat-item {
  @apply text-center py-2 bg-gray-50 rounded;
}

.stat-number {
  @apply text-lg font-semibold text-gray-900;
}

.stat-label {
  @apply text-xs text-gray-500 uppercase tracking-wide;
}
```

### Interactive States

#### Default State
```css
.property-card-default {
  @apply bg-white border-gray-200 shadow-sm;
}
```

#### Hover State
```css
.property-card:hover {
  @apply shadow-md border-gray-300 transform translate-y-0.5;
}

.property-card:hover .card-actions {
  @apply opacity-100 translate-y-0;
}
```

#### Active/Selected State
```css
.property-card.selected {
  @apply ring-2 ring-blue-500 border-blue-500;
}
```

#### Disabled State
```css
.property-card.disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}
```

### Responsive Variations

#### Mobile (320px-767px)
```css
.property-card-mobile {
  @apply p-4;
}

.property-card-mobile .property-card-image {
  @apply h-40;
}

.property-card-mobile .stats-row {
  @apply grid-cols-2 gap-2;
}

.property-card-mobile .card-actions {
  @apply flex-col space-y-2 space-x-0;
}
```

#### Tablet (768px-1023px)
```css
.property-card-tablet {
  @apply p-5;
}
```

#### Desktop (1024px+)
```css
.property-card-desktop {
  @apply p-6;
}
```

### Implementation Notes

```javascript
// Property Card Component Structure
const PropertyCard = ({ property, onCopyEmail, onEdit, onViewPipeline }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  
  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(property.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="property-card">
      <img src={property.image} className="property-card-image" alt={property.title} />
      <div className="property-card-content">
        <h3 className="property-card-title">{property.address}</h3>
        <p className="property-card-address">{property.city}, {property.state}</p>
        <p className="property-card-price">${property.rent}/month</p>
        
        <div className="flex gap-2">
          <span className={`status-badge ${property.status.toLowerCase()}`}>
            {property.status}
          </span>
          {property.isOccupied && (
            <span className="status-badge rented">Occupied</span>
          )}
        </div>
        
        <div className="email-badge">
          <span className="email-text">{property.email}</span>
          <button 
            className={`copy-button ${emailCopied ? 'copy-success' : ''}`}
            onClick={handleCopyEmail}
          >
            {emailCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">{property.applications}</div>
            <div className="stat-label">Apps</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{property.messages}</div>
            <div className="stat-label">Msgs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{property.views}</div>
            <div className="stat-label">Views</div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 2. Applicant Pipeline Card

### Visual Hierarchy & Layout

```
┌─────────────────────────────────────┐
│ [≡] Sarah Johnson              [⋮] │  ← Drag Handle + Menu
│ 👤 sarah.j@email.com               │  ← Contact Info
│                                     │
│ 🏠 123 Oak Street, Unit 2A         │  ← Property Info
│ 💰 $3,200/month                    │
│                                     │
│ ⏰ 3 days in stage                 │  ← Time Tracking
│ 📅 Applied: Mar 15, 2024           │
│                                     │
│ 📊 Score: 8.5/10                   │  ← AI Score
│ ✅ Credit: Excellent               │  ← Status Items
│ ⚠️  Missing: Pay Stubs             │
│                                     │
│ [🔥] Priority                      │  ← Priority Indicator
│                                     │
│ [Message] [Approve] [Reject]       │  ← Quick Actions
└─────────────────────────────────────┘
```

### Base Component Classes

```css
.pipeline-card {
  @apply bg-white rounded-lg border border-gray-200 p-4 mb-3
         hover:shadow-md transition-all duration-200 cursor-grab
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.pipeline-card.dragging {
  @apply opacity-50 transform rotate-3 cursor-grabbing;
}

.pipeline-card-header {
  @apply flex items-start justify-between mb-3;
}

.drag-handle {
  @apply text-gray-400 hover:text-gray-600 cursor-grab mr-2;
}

.applicant-name {
  @apply font-semibold text-gray-900 text-base flex-1;
}

.menu-button {
  @apply text-gray-400 hover:text-gray-600 p-1 rounded
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}
```

### Contact & Property Information

```css
.contact-info {
  @apply flex items-center text-sm text-gray-600 mb-2;
}

.contact-info-icon {
  @apply w-4 h-4 mr-2 text-gray-400;
}

.property-info {
  @apply space-y-1 mb-3 pb-3 border-b border-gray-100;
}

.property-address {
  @apply flex items-center text-sm text-gray-700;
}

.property-rent {
  @apply flex items-center text-sm font-medium text-gray-900;
}
```

### Time Tracking & Dates

```css
.time-tracking {
  @apply space-y-2 mb-3;
}

.days-in-stage {
  @apply flex items-center text-sm;
}

.days-in-stage.urgent {
  @apply text-red-600 font-medium;
}

.days-in-stage.warning {
  @apply text-amber-600;
}

.days-in-stage.normal {
  @apply text-gray-600;
}

.application-date {
  @apply flex items-center text-xs text-gray-500;
}
```

### AI Score & Status Items

```css
.ai-score {
  @apply flex items-center justify-between bg-blue-50 rounded-lg p-2 mb-3;
}

.score-value {
  @apply text-lg font-bold text-blue-900;
}

.score-label {
  @apply text-sm text-blue-700;
}

.status-items {
  @apply space-y-1 mb-3;
}

.status-item {
  @apply flex items-center text-sm;
}

.status-item.complete {
  @apply text-green-600;
}

.status-item.missing {
  @apply text-amber-600;
}

.status-item.pending {
  @apply text-blue-600;
}
```

### Priority Indicators

```css
.priority-indicator {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-3;
}

.priority-indicator.high {
  @apply bg-red-100 text-red-800;
}

.priority-indicator.medium {
  @apply bg-amber-100 text-amber-800;
}

.priority-indicator.low {
  @apply bg-gray-100 text-gray-800;
}
```

### Quick Actions

```css
.quick-actions {
  @apply flex gap-2;
}

.action-button {
  @apply flex-1 px-3 py-2 text-sm font-medium rounded-md 
         transition-colors duration-200 text-center
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.action-button.message {
  @apply bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500;
}

.action-button.approve {
  @apply bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-500;
}

.action-button.reject {
  @apply bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500;
}
```

### Interactive States

#### Hover State
```css
.pipeline-card:hover {
  @apply shadow-md border-gray-300;
}
```

#### Dragging State
```css
.pipeline-card.dragging {
  @apply opacity-60 transform scale-105 shadow-lg cursor-grabbing;
}
```

#### Drop Target State
```css
.drop-zone.active {
  @apply border-2 border-blue-400 border-dashed bg-blue-50;
}
```

### Mobile Responsive Variations

#### Mobile Version
```css
.pipeline-card-mobile {
  @apply p-3;
}

.pipeline-card-mobile .applicant-name {
  @apply text-sm;
}

.pipeline-card-mobile .quick-actions {
  @apply flex-col gap-1;
}

.pipeline-card-mobile .action-button {
  @apply text-xs py-1.5;
}
```

### Implementation Notes

```javascript
// Pipeline Card Component
const PipelineCard = ({ applicant, onMove, onMessage, onApprove, onReject }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      default: return 'low';
    }
  };
  
  const getDaysInStageColor = (days) => {
    if (days > 7) return 'urgent';
    if (days > 3) return 'warning';
    return 'normal';
  };
  
  return (
    <div 
      className={`pipeline-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <div className="pipeline-card-header">
        <div className="flex items-center flex-1">
          <div className="drag-handle">≡</div>
          <h4 className="applicant-name">{applicant.name}</h4>
        </div>
        <button className="menu-button">⋮</button>
      </div>
      
      <div className="contact-info">
        <span className="contact-info-icon">📧</span>
        {applicant.email}
      </div>
      
      <div className="property-info">
        <div className="property-address">
          <span className="contact-info-icon">🏠</span>
          {applicant.property.address}
        </div>
        <div className="property-rent">
          <span className="contact-info-icon">💰</span>
          ${applicant.property.rent}/month
        </div>
      </div>
      
      <div className="time-tracking">
        <div className={`days-in-stage ${getDaysInStageColor(applicant.daysInStage)}`}>
          <span className="contact-info-icon">⏰</span>
          {applicant.daysInStage} days in stage
        </div>
        <div className="application-date">
          <span className="contact-info-icon">📅</span>
          Applied: {applicant.applicationDate}
        </div>
      </div>
      
      <div className="ai-score">
        <span className="score-label">AI Score</span>
        <span className="score-value">{applicant.aiScore}/10</span>
      </div>
      
      <div className="status-items">
        {applicant.statusItems.map((item, index) => (
          <div key={index} className={`status-item ${item.status}`}>
            <span className="contact-info-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
      
      {applicant.priority !== 'low' && (
        <div className={`priority-indicator ${getPriorityColor(applicant.priority)}`}>
          🔥 {applicant.priority.toUpperCase()} Priority
        </div>
      )}
      
      <div className="quick-actions">
        <button className="action-button message" onClick={() => onMessage(applicant)}>
          Message
        </button>
        <button className="action-button approve" onClick={() => onApprove(applicant)}>
          Approve
        </button>
        <button className="action-button reject" onClick={() => onReject(applicant)}>
          Reject
        </button>
      </div>
    </div>
  );
};
```

---

## 3. Message Thread Component

### Visual Hierarchy & Layout

```
┌─────────────────────────────────────┐
│ ● Sarah Johnson                     │  ← Unread + Name
│ 🏠 123 Oak Street                   │  ← Property Link
│                                     │
│ "Hi, I'm interested in viewing..."  │  ← Message Preview
│                                     │
│ 2:30 PM • Today                    │  ← Smart Timestamp
│ 📧 property-123-oak@platform.com   │  ← Unique Email
│                                     │
│ [🤖] AI Response Ready             │  ← AI Badge
│ [📎] 2 attachments                 │  ← Attachment Indicator
│                                     │
│ [Reply] [Forward] [Archive]        │  ← Hover Actions
└─────────────────────────────────────┘
```

### Base Component Classes

```css
.message-thread {
  @apply bg-white border-b border-gray-200 p-4 hover:bg-gray-50
         transition-colors duration-200 cursor-pointer
         focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-inset;
}

.message-thread.unread {
  @apply bg-blue-50 border-l-4 border-l-blue-500;
}

.message-thread.selected {
  @apply bg-blue-100 border-l-4 border-l-blue-600;
}

.thread-header {
  @apply flex items-start justify-between mb-2;
}

.thread-sender {
  @apply flex items-center space-x-2;
}
```

### Sender Information

```css
.unread-indicator {
  @apply w-2 h-2 bg-blue-500 rounded-full;
}

.sender-name {
  @apply font-semibold text-gray-900;
}

.sender-name.unread {
  @apply font-bold;
}

.sender-avatar {
  @apply w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700;
}

.property-link {
  @apply flex items-center text-sm text-blue-600 hover:text-blue-800 mb-2
         transition-colors duration-200;
}

.property-icon {
  @apply w-4 h-4 mr-1;
}
```

### Message Preview

```css
.message-preview {
  @apply text-gray-700 mb-3 line-clamp-2 leading-relaxed;
}

.message-preview.unread {
  @apply font-medium text-gray-900;
}
```

### Timestamp with Smart Formatting

```css
.timestamp-row {
  @apply flex items-center justify-between text-sm text-gray-500 mb-2;
}

.timestamp {
  @apply flex items-center space-x-1;
}

.timestamp-icon {
  @apply w-4 h-4;
}

.timestamp.today {
  @apply text-blue-600 font-medium;
}

.timestamp.yesterday {
  @apply text-amber-600;
}
```

### Email & AI Badge

```css
.email-info {
  @apply flex items-center text-xs font-mono text-gray-600 bg-gray-100 
         rounded px-2 py-1 mb-2;
}

.ai-badge {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
         bg-purple-100 text-purple-800;
}

.ai-badge-icon {
  @apply w-3 h-3 mr-1;
}
```

### Attachment Indicators

```css
.attachment-indicator {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
         bg-gray-100 text-gray-700;
}

.attachment-icon {
  @apply w-3 h-3 mr-1;
}

.attachment-count {
  @apply font-semibold;
}
```

### Hover Actions

```css
.hover-actions {
  @apply flex space-x-2 opacity-0 transform translate-y-2 
         transition-all duration-200 mt-2;
}

.message-thread:hover .hover-actions {
  @apply opacity-100 translate-y-0;
}

.action-btn {
  @apply px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.action-btn.reply {
  @apply bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500;
}

.action-btn.forward {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500;
}

.action-btn.archive {
  @apply bg-amber-100 text-amber-700 hover:bg-amber-200 focus:ring-amber-500;
}
```

### Interactive States

#### Unread State
```css
.message-thread.unread {
  @apply bg-blue-50 border-l-4 border-l-blue-500;
}

.message-thread.unread .sender-name {
  @apply font-bold text-blue-900;
}

.message-thread.unread .message-preview {
  @apply font-medium;
}
```

#### Selected/Active State
```css
.message-thread.selected {
  @apply bg-blue-100 border-l-4 border-l-blue-600 ring-1 ring-blue-200;
}
```

#### Hover State
```css
.message-thread:hover {
  @apply bg-gray-50;
}

.message-thread.unread:hover {
  @apply bg-blue-100;
}
```

### Mobile Responsive Variations

```css
.message-thread-mobile {
  @apply p-3;
}

.message-thread-mobile .thread-header {
  @apply flex-col items-start space-y-1;
}

.message-thread-mobile .hover-actions {
  @apply opacity-100 translate-y-0 justify-center;
}

.message-thread-mobile .email-info {
  @apply hidden;
}
```

### Implementation Notes

```javascript
// Message Thread Component
const MessageThread = ({ thread, isSelected, isUnread, onClick, onReply, onForward, onArchive }) => {
  const formatTimestamp = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return { text: messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • Today', class: 'today' };
    } else if (diffInHours < 48) {
      return { text: 'Yesterday', class: 'yesterday' };
    } else {
      return { text: messageDate.toLocaleDateString(), class: 'older' };
    }
  };
  
  const timestamp = formatTimestamp(thread.lastMessageDate);
  
  return (
    <div 
      className={`message-thread ${isUnread ? 'unread' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="thread-header">
        <div className="thread-sender">
          {isUnread && <div className="unread-indicator"></div>}
          <div className="sender-avatar">
            {thread.senderName.charAt(0)}
          </div>
          <span className={`sender-name ${isUnread ? 'unread' : ''}`}>
            {thread.senderName}
          </span>
        </div>
      </div>
      
      <div className="property-link">
        <span className="property-icon">🏠</span>
        {thread.property.address}
      </div>
      
      <p className={`message-preview ${isUnread ? 'unread' : ''}`}>
        {thread.lastMessagePreview}
      </p>
      
      <div className="timestamp-row">
        <div className={`timestamp ${timestamp.class}`}>
          <span className="timestamp-icon">📅</span>
          <span>{timestamp.text}</span>
        </div>
      </div>
      
      <div className="email-info">
        📧 {thread.propertyEmail}
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        {thread.hasAIResponse && (
          <span className="ai-badge">
            <span className="ai-badge-icon">🤖</span>
            AI Response Ready
          </span>
        )}
        
        {thread.attachmentCount > 0 && (
          <span className="attachment-indicator">
            <span className="attachment-icon">📎</span>
            {thread.attachmentCount} attachment{thread.attachmentCount > 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      <div className="hover-actions">
        <button className="action-btn reply" onClick={(e) => { e.stopPropagation(); onReply(thread); }}>
          Reply
        </button>
        <button className="action-btn forward" onClick={(e) => { e.stopPropagation(); onForward(thread); }}>
          Forward
        </button>
        <button className="action-btn archive" onClick={(e) => { e.stopPropagation(); onArchive(thread); }}>
          Archive
        </button>
      </div>
    </div>
  );
};
```

---

## 4. Document Upload Interface

### Visual Hierarchy & Layout

```
┌─────────────────────────────────────┐
│         DRAG & DROP ZONE            │
│                                     │
│         📁 Drop files here          │
│    or click to browse documents     │
│                                     │
│    Supports: PDF, JPG, PNG, DOC    │
│         Max size: 10MB              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ DOCUMENT CHECKLIST                  │
├─────────────────────────────────────┤
│ ✅ Government ID                    │
│ ✅ Proof of Income                  │
│ ⏳ Bank Statements (uploading...)   │
│ ❌ Employment Letter                │
│ ❌ References                       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ UPLOADED FILES                      │
├─────────────────────────────────────┤
│ 📄 driver_license.pdf    2.1 MB ✓  │
│ 📊 pay_stub_march.pdf    1.8 MB ✓  │
│ 📈 bank_statement.pdf [████░░] 67% │
│ ❌ resume.doc - File too large      │
└─────────────────────────────────────┘
```

### Base Component Classes

```css
.document-upload-container {
  @apply space-y-6;
}

.drag-drop-zone {
  @apply border-2 border-dashed border-gray-300 rounded-lg p-8 text-center
         bg-gray-50 hover:bg-gray-100 transition-colors duration-200
         focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2;
}

.drag-drop-zone.active {
  @apply border-blue-400 bg-blue-50;
}

.drag-drop-zone.error {
  @apply border-red-400 bg-red-50;
}

.upload-icon {
  @apply mx-auto h-12 w-12 text-gray-400 mb-4;
}

.upload-text {
  @apply text-lg font-medium text-gray-700 mb-2;
}

.upload-subtext {
  @apply text-sm text-gray-500 mb-4;
}

.file-input {
  @apply sr-only;
}

.browse-button {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 rounded-md
         bg-white text-sm font-medium text-gray-700 hover:bg-gray-50
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}
```

### Document Checklist

```css
.document-checklist {
  @apply bg-white rounded-lg border border-gray-200 p-4;
}

.checklist-title {
  @apply text-lg font-semibold text-gray-900 mb-4;
}

.checklist-items {
  @apply space-y-3;
}

.checklist-item {
  @apply flex items-center justify-between p-3 rounded-lg
         transition-colors duration-200;
}

.checklist-item.complete {
  @apply bg-green-50 border-l-4 border-l-green-500;
}

.checklist-item.uploading {
  @apply bg-amber-50 border-l-4 border-l-amber-500;
}

.checklist-item.missing {
  @apply bg-red-50 border-l-4 border-l-red-500;
}

.checklist-item.optional {
  @apply bg-gray-50 border-l-4 border-l-gray-300;
}

.checklist-label {
  @apply flex items-center space-x-3;
}

.checklist-icon {
  @apply w-5 h-5;
}

.checklist-icon.complete {
  @apply text-green-600;
}

.checklist-icon.uploading {
  @apply text-amber-600;
}

.checklist-icon.missing {
  @apply text-red-600;
}

.checklist-text {
  @apply font-medium;
}

.checklist-text.complete {
  @apply text-green-800;
}

.checklist-text.uploading {
  @apply text-amber-800;
}

.checklist-text.missing {
  @apply text-red-800;
}
```

### File Upload Progress

```css
.uploaded-files {
  @apply bg-white rounded-lg border border-gray-200 p-4;
}

.files-title {
  @apply text-lg font-semibold text-gray-900 mb-4;
}

.file-list {
  @apply space-y-3;
}

.file-item {
  @apply flex items-center justify-between p-3 bg-gray-50 rounded-lg;
}

.file-info {
  @apply flex items-center space-x-3 flex-1;
}

.file-icon {
  @apply w-8 h-8;
}

.file-details {
  @apply flex-1;
}

.file-name {
  @apply text-sm font-medium text-gray-900;
}

.file-size {
  @apply text-xs text-gray-500;
}

.file-status {
  @apply flex items-center space-x-2;
}
```

### Progress Bars

```css
.progress-container {
  @apply w-full bg-gray-200 rounded-full h-2 mt-2;
}

.progress-bar {
  @apply h-2 rounded-full transition-all duration-300;
}

.progress-bar.uploading {
  @apply bg-blue-500;
}

.progress-bar.complete {
  @apply bg-green-500;
}

.progress-bar.error {
  @apply bg-red-500;
}

.progress-text {
  @apply text-xs text-gray-600 mt-1;
}
```

### Validation Messages

```css
.validation-messages {
  @apply mt-4 space-y-2;
}

.validation-message {
  @apply flex items-center p-3 rounded-md text-sm;
}

.validation-message.error {
  @apply bg-red-50 text-red-800 border border-red-200;
}

.validation-message.warning {
  @apply bg-amber-50 text-amber-800 border border-amber-200;
}

.validation-message.success {
  @apply bg-green-50 text-green-800 border border-green-200;
}

.validation-icon {
  @apply w-4 h-4 mr-2;
}
```

### Interactive States

#### Drag Active State
```css
.drag-drop-zone.drag-active {
  @apply border-blue-400 bg-blue-50 scale-102 transform;
}
```

#### Drop Success State
```css
.drag-drop-zone.drop-success {
  @apply border-green-400 bg-green-50;
}

.drag-drop-zone.drop-success .upload-icon {
  @apply text-green-500;
}
```

#### Error State
```css
.drag-drop-zone.error {
  @apply border-red-400 bg-red-50;
}

.drag-drop-zone.error .upload-icon {
  @apply text-red-500;
}
```

### Mobile Responsive Variations

```css
.document-upload-mobile {
  @apply space-y-4;
}

.document-upload-mobile .drag-drop-zone {
  @apply p-6;
}

.document-upload-mobile .upload-icon {
  @apply h-10 w-10;
}

.document-upload-mobile .checklist-item {
  @apply p-2;
}

.document-upload-mobile .file-item {
  @apply p-2;
}
```

### Implementation Notes

```javascript
// Document Upload Component
const DocumentUpload = ({ onUpload, requiredDocuments, maxFileSize = 10 * 1024 * 1024 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword'];
  
  const validateFile = (file) => {
    const errors = [];
    
    if (!allowedTypes.includes(file.type)) {
      errors.push(`${file.name}: File type not supported`);
    }
    
    if (file.size > maxFileSize) {
      errors.push(`${file.name}: File too large (max ${maxFileSize / 1024 / 1024}MB)`);
    }
    
    return errors;
  };
  
  const handleFiles = (files) => {
    const fileList = Array.from(files);
    const allErrors = [];
    
    fileList.forEach(file => {
      const errors = validateFile(file);
      allErrors.push(...errors);
    });
    
    setValidationErrors(allErrors);
    
    if (allErrors.length === 0) {
      fileList.forEach(uploadFile);
    }
  };
  
  const uploadFile = async (file) => {
    const fileId = Date.now() + '-' + file.name;
    
    setUploadProgress(prev => ({
      ...prev,
      [fileId]: { progress: 0, status: 'uploading' }
    }));
    
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({
          ...prev,
          [fileId]: { progress, status: 'uploading' }
        }));
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: { progress: 100, status: 'complete' }
      }));
      
      setUploadedFiles(prev => [
        ...prev,
        {
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'complete'
        }
      ]);
      
      onUpload(file);
    } catch (error) {
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: { progress: 0, status: 'error' }
      }));
    }
  };
  
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('doc')) return '📝';
    return '📋';
  };
  
  return (
    <div className="document-upload-container">
      {/* Drag & Drop Zone */}
      <div
        className={`drag-drop-zone ${dragActive ? 'active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <div className="upload-icon">📁</div>
        <p className="upload-text">Drop files here</p>
        <p className="upload-subtext">or click to browse documents</p>
        <p className="upload-subtext">Supports: PDF, JPG, PNG, DOC | Max size: 10MB</p>
        
        <input
          type="file"
          className="file-input"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => handleFiles(e.target.files)}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="browse-button">
          Browse Files
        </label>
      </div>
      
      {/* Validation Messages */}
      {validationErrors.length > 0 && (
        <div className="validation-messages">
          {validationErrors.map((error, index) => (
            <div key={index} className="validation-message error">
              <span className="validation-icon">❌</span>
              {error}
            </div>
          ))}
        </div>
      )}
      
      {/* Document Checklist */}
      <div className="document-checklist">
        <h3 className="checklist-title">Document Checklist</h3>
        <div className="checklist-items">
          {requiredDocuments.map((doc, index) => (
            <div key={index} className={`checklist-item ${doc.status}`}>
              <div className="checklist-label">
                <span className={`checklist-icon ${doc.status}`}>
                  {doc.status === 'complete' ? '✅' : 
                   doc.status === 'uploading' ? '⏳' : '❌'}
                </span>
                <span className={`checklist-text ${doc.status}`}>
                  {doc.name}
                </span>
              </div>
              {doc.status === 'uploading' && (
                <div className="progress-container">
                  <div className="progress-bar uploading" style={{ width: `${doc.progress}%` }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3 className="files-title">Uploaded Files</h3>
          <div className="file-list">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-info">
                  <span className="file-icon">{getFileIcon(file.type)}</span>
                  <div className="file-details">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                    {uploadProgress[file.id] && uploadProgress[file.id].status === 'uploading' && (
                      <div className="progress-container">
                        <div 
                          className="progress-bar uploading" 
                          style={{ width: `${uploadProgress[file.id].progress}%` }}
                        ></div>
                        <div className="progress-text">
                          {uploadProgress[file.id].progress}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="file-status">
                  {file.status === 'complete' ? '✓' : '⏳'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## 5. Calendar Scheduling Widget

### Visual Hierarchy & Layout

```
┌─────────────────────────────────────┐
│ March 2024           [Today] [Sync] │  ← Header with Actions
├─────────────────────────────────────┤
│ Mon  Tue  Wed  Thu  Fri  Sat  Sun   │  ← Week Header
├─────────────────────────────────────┤
│ 9:00 AM                             │
│ [Available] [Blocked] [Booked] [ ]  │
├─────────────────────────────────────┤
│ 10:00 AM                            │
│ [Available] [ ] [Booked] [Blocked]  │
├─────────────────────────────────────┤
│ 11:00 AM                            │
│ [Available] [Available] [ ] [ ]     │
├─────────────────────────────────────┤
│ ... (more time slots)               │
├─────────────────────────────────────┤
│ 📊 Quick Stats                      │
│ • 12 Available slots this week      │
│ • 3 Booked viewings                 │
│ • Last sync: 2 min ago              │
└─────────────────────────────────────┘

MOBILE FALLBACK:
┌─────────────────────────┐
│ [Date Picker ▼]        │
├─────────────────────────┤
│ March 15, 2024          │
├─────────────────────────┤
│ ✅ 9:00 AM  Available   │
│ 🚫 10:00 AM Blocked     │
│ 📅 11:00 AM Booked      │
│ ❌ 12:00 PM Unavailable │
│ ✅ 1:00 PM  Available   │
└─────────────────────────┘
```

### Base Component Classes

```css
.calendar-widget {
  @apply bg-white rounded-lg border border-gray-200 p-4;
}

.calendar-header {
  @apply flex items-center justify-between mb-6;
}

.calendar-title {
  @apply text-lg font-semibold text-gray-900;
}

.calendar-actions {
  @apply flex space-x-2;
}

.calendar-action-btn {
  @apply px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.calendar-action-btn.today {
  @apply bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500;
}

.calendar-action-btn.sync {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500;
}

.calendar-action-btn.sync.syncing {
  @apply bg-amber-100 text-amber-700;
}
```

### Week View Grid

```css
.calendar-grid {
  @apply mb-6;
}

.week-header {
  @apply grid grid-cols-8 gap-1 mb-2;
}

.week-header-cell {
  @apply text-xs font-medium text-gray-600 text-center py-2;
}

.week-header-time {
  @apply text-right pr-2;
}

.time-row {
  @apply grid grid-cols-8 gap-1 mb-1;
}

.time-label {
  @apply text-xs text-gray-500 text-right pr-2 py-2;
}

.time-slot {
  @apply h-8 rounded cursor-pointer transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-offset-1;
}
```

### Time Slot States

```css
.time-slot.available {
  @apply bg-green-100 hover:bg-green-200 border border-green-300 focus:ring-green-500;
}

.time-slot.blocked {
  @apply bg-red-100 hover:bg-red-200 border border-red-300 focus:ring-red-500;
}

.time-slot.booked {
  @apply bg-blue-100 hover:bg-blue-200 border border-blue-300 focus:ring-blue-500
         cursor-default;
}

.time-slot.unavailable {
  @apply bg-gray-100 border border-gray-200 cursor-not-allowed opacity-50;
}

.time-slot.selected {
  @apply ring-2 ring-blue-500 ring-offset-1;
}
```

### Slot Details Tooltip

```css
.slot-tooltip {
  @apply absolute z-10 bg-gray-900 text-white text-xs rounded-md px-2 py-1
         transform -translate-x-1/2 -translate-y-full mb-2 pointer-events-none
         opacity-0 transition-opacity duration-200;
}

.time-slot:hover .slot-tooltip {
  @apply opacity-100;
}

.tooltip-arrow {
  @apply absolute top-full left-1/2 transform -translate-x-1/2
         border-l-4 border-l-transparent border-r-4 border-r-transparent
         border-t-4 border-t-gray-900;
}
```

### Sync Status Indicator

```css
.sync-status {
  @apply flex items-center space-x-2 text-sm text-gray-600 mt-4;
}

.sync-indicator {
  @apply w-2 h-2 rounded-full;
}

.sync-indicator.connected {
  @apply bg-green-500;
}

.sync-indicator.syncing {
  @apply bg-amber-500 animate-pulse;
}

.sync-indicator.error {
  @apply bg-red-500;
}

.sync-text {
  @apply text-xs;
}
```

### Quick Stats Panel

```css
.calendar-stats {
  @apply bg-gray-50 rounded-lg p-4 mt-4;
}

.stats-title {
  @apply text-sm font-medium text-gray-900 mb-2;
}

.stats-list {
  @apply space-y-1;
}

.stat-item {
  @apply flex items-center text-xs text-gray-600;
}

.stat-icon {
  @apply w-3 h-3 mr-2;
}
```

### Mobile Date Picker Fallback

```css
.mobile-calendar {
  @apply md:hidden;
}

.date-picker-header {
  @apply flex items-center justify-between mb-4;
}

.date-picker-select {
  @apply block w-full rounded-md border border-gray-300 px-3 py-2
         text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500;
}

.mobile-time-list {
  @apply space-y-2;
}

.mobile-time-slot {
  @apply flex items-center justify-between p-3 rounded-lg border
         transition-colors duration-200;
}

.mobile-time-slot.available {
  @apply bg-green-50 border-green-200;
}

.mobile-time-slot.blocked {
  @apply bg-red-50 border-red-200;
}

.mobile-time-slot.booked {
  @apply bg-blue-50 border-blue-200;
}

.mobile-time-info {
  @apply flex items-center space-x-3;
}

.mobile-time-status {
  @apply text-sm font-medium;
}

.mobile-time-status.available {
  @apply text-green-700;
}

.mobile-time-status.blocked {
  @apply text-red-700;
}

.mobile-time-status.booked {
  @apply text-blue-700;
}
```

### Interactive States

#### Hover State
```css
.time-slot:hover {
  @apply transform scale-105 shadow-sm;
}

.time-slot.booked:hover {
  @apply transform scale-100;
}
```

#### Active/Selected State
```css
.time-slot.selected {
  @apply ring-2 ring-blue-500 ring-offset-1 z-10;
}
```

#### Loading State
```css
.calendar-loading {
  @apply animate-pulse;
}

.calendar-loading .time-slot {
  @apply bg-gray-200;
}
```

### Implementation Notes

```javascript
// Calendar Scheduling Widget Component
const CalendarWidget = ({ availability, onSlotClick, onSync, syncStatus }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  
  const getSlotStatus = (day, time) => {
    const slot = availability.find(a => a.day === day && a.time === time);
    return slot ? slot.status : 'unavailable';
  };
  
  const getSlotDetails = (day, time) => {
    const slot = availability.find(a => a.day === day && a.time === time);
    return slot ? slot.details : null;
  };
  
  const toggleSlot = (day, time) => {
    const slotKey = `${day}-${time}`;
    const currentStatus = getSlotStatus(day, time);
    
    if (currentStatus === 'unavailable' || currentStatus === 'booked') return;
    
    const newStatus = currentStatus === 'available' ? 'blocked' : 'available';
    onSlotClick(day, time, newStatus);
  };
  
  const formatSyncStatus = () => {
    switch(syncStatus.status) {
      case 'connected':
        return { icon: 'connected', text: `Last sync: ${syncStatus.lastSync}` };
      case 'syncing':
        return { icon: 'syncing', text: 'Syncing...' };
      case 'error':
        return { icon: 'error', text: 'Sync failed. Click to retry.' };
      default:
        return { icon: 'error', text: 'Not connected' };
    }
  };
  
  const getWeekStats = () => {
    const stats = availability.reduce((acc, slot) => {
      acc[slot.status] = (acc[slot.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      available: stats.available || 0,
      booked: stats.booked || 0,
      blocked: stats.blocked || 0
    };
  };
  
  const syncStatusInfo = formatSyncStatus();
  const weekStats = getWeekStats();
  
  return (
    <div className="calendar-widget">
      {/* Desktop Week View */}
      <div className="hidden md:block">
        <div className="calendar-header">
          <h3 className="calendar-title">
            {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="calendar-actions">
            <button 
              className="calendar-action-btn today"
              onClick={() => setCurrentWeek(new Date())}
            >
              Today
            </button>
            <button 
              className={`calendar-action-btn sync ${syncStatus.status === 'syncing' ? 'syncing' : ''}`}
              onClick={onSync}
              disabled={syncStatus.status === 'syncing'}
            >
              {syncStatus.status === 'syncing' ? 'Syncing...' : 'Sync'}
            </button>
          </div>
        </div>
        
        <div className="calendar-grid">
          <div className="week-header">
            <div className="week-header-cell week-header-time"></div>
            {weekDays.map(day => (
              <div key={day} className="week-header-cell">{day}</div>
            ))}
          </div>
          
          {timeSlots.map(time => (
            <div key={time} className="time-row">
              <div className="time-label">{time}</div>
              {weekDays.map(day => {
                const status = getSlotStatus(day, time);
                const details = getSlotDetails(day, time);
                const slotKey = `${day}-${time}`;
                
                return (
                  <div
                    key={slotKey}
                    className={`time-slot ${status} ${selectedSlots.includes(slotKey) ? 'selected' : ''}`}
                    onClick={() => toggleSlot(day, time)}
                    onMouseEnter={() => setHoveredSlot(slotKey)}
                    onMouseLeave={() => setHoveredSlot(null)}
                    role="button"
                    tabIndex={status !== 'unavailable' ? 0 : -1}
                    aria-label={`${day} ${time} - ${status}`}
                  >
                    {hoveredSlot === slotKey && details && (
                      <div className="slot-tooltip">
                        {details}
                        <div className="tooltip-arrow"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Date Picker Fallback */}
      <div className="mobile-calendar">
        <div className="date-picker-header">
          <select className="date-picker-select">
            <option>Today - March 15, 2024</option>
            <option>Tomorrow - March 16, 2024</option>
            <option>March 17, 2024</option>
          </select>
        </div>
        
        <div className="mobile-time-list">
          {timeSlots.map(time => {
            const status = getSlotStatus(1, time); // Assuming current day
            const details = getSlotDetails(1, time);
            
            return (
              <div
                key={time}
                className={`mobile-time-slot ${status}`}
                onClick={() => toggleSlot(1, time)}
                role="button"
                tabIndex={status !== 'unavailable' ? 0 : -1}
              >
                <div className="mobile-time-info">
                  <span className="w-5">
                    {status === 'available' ? '✅' : 
                     status === 'blocked' ? '🚫' :
                     status === 'booked' ? '📅' : '❌'}
                  </span>
                  <span className="text-sm font-medium">{time}</span>
                </div>
                <span className={`mobile-time-status ${status}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Sync Status */}
      <div className="sync-status">
        <div className={`sync-indicator ${syncStatusInfo.icon}`}></div>
        <span className="sync-text">{syncStatusInfo.text}</span>
      </div>
      
      {/* Quick Stats */}
      <div className="calendar-stats">
        <h4 className="stats-title">Quick Stats</h4>
        <div className="stats-list">
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            {weekStats.available} Available slots this week
          </div>
          <div className="stat-item">
            <span className="stat-icon">📅</span>
            {weekStats.booked} Booked viewings
          </div>
          <div className="stat-item">
            <span className="stat-icon">🚫</span>
            {weekStats.blocked} Blocked time slots
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## Summary & Implementation Guidelines

### Development Priority Order

1. **Day 1**: Property Card and Document Upload components
2. **Day 2**: Message Thread and Pipeline Card components  
3. **Day 3**: Calendar Widget and component integration
4. **Day 4-5**: Responsive optimizations and interactive states
5. **Day 6**: Accessibility testing and final polish

### Key Implementation Notes

1. **Consistent State Management**: All components use similar patterns for hover, active, and disabled states
2. **Mobile-First Approach**: Components degrade gracefully with dedicated mobile variants
3. **Performance Optimized**: Heavy use of CSS transitions instead of JavaScript animations
4. **Accessibility Built-in**: ARIA labels, keyboard navigation, and focus management included
5. **Tailwind-Ready**: All classes are standard Tailwind utilities for rapid implementation

### Cross-Component Patterns

- **Status Badges**: Consistent color coding across all components
- **Hover Actions**: Uniform reveal patterns with smooth transitions  
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Standardized validation and error messaging
- **Interactive Feedback**: Clear visual feedback for all user actions

These components provide a solid foundation for the 6-day MVP sprint while maintaining the professional aesthetic and usability standards required for the tenant management platform.

**File Path**: `/Users/qayo/Documents/tenant-management-platform/design/ui-components.md`

**Key Tailwind Classes Used**:
- Layout: `grid`, `flex`, `space-y-*`, `gap-*`
- Colors: `bg-blue-500`, `text-gray-700`, `border-gray-200`
- Interactions: `hover:*`, `focus:*`, `transition-*`
- Responsive: `md:*`, `lg:*`, `hidden`, `block`
- States: `opacity-50`, `cursor-pointer`, `pointer-events-none`