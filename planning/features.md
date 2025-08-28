# Features & Scope - 6-Day MVP Prioritization
Version: 1.0-MVP
Last Updated: 2025-08-28

## 6-DAY MVP STRATEGY

**Core Problem to Solve:** Landlords spend too much time manually responding to tenant inquiries via email. 

**MVP Success Criteria:**
- Landlords can create properties with unique email addresses
- AI automatically processes and responds to tenant inquiries 
- Landlords can review, edit, and send AI-generated responses
- Basic applicant tracking from email to application status

---

## MVP FEATURE SET (Must Have - Days 1-4)

### Day 1-2: Foundation & Core Infrastructure

**A1. Minimal Property Management**
- Property creation form (address, rent, basic details only)
- Auto-generated unique email per property (property-{id}-{slug}@platform.com)
- Simple property list view (no grid, just table)
- Property status: Available/Rented only

**A2. Email Processing Core**
- Webhook endpoint to receive emails at unique addresses
- Email parsing (sender, subject, body)
- Store emails in database with property association
- Basic email display in simple list

### Day 3-4: AI Response System

**B1. AI Email Analysis & Response**
- OpenAI integration for email intent classification
- Basic categories: Viewing Request, General Question, Application Interest
- AI-generated response templates based on intent
- Manual review and approval workflow (no auto-send)

**B2. Basic Communication Interface**
- Simple inbox showing received emails by property
- Click to view full email thread
- Text area to edit AI-generated response
- Send email functionality via Resend
- Mark emails as responded/closed

---

## QUICK WINS (Should Have - Day 5)

**C1. Basic Applicant Tracking**
- Convert email inquiries to "Applicant" records
- Simple status: New → Interested → Applied → Closed
- Basic applicant info extraction from emails
- One-click status updates

**C2. Response Templates**
- 3-5 pre-written response templates
- Template variables (property address, rent, contact info)
- Quick template selection in response composer

**C3. Dashboard Improvements**
- Basic stats: Total Properties, Unread Emails, Active Applicants
- Recent activity feed
- Property cards instead of table view

---

## POST-MVP (Won't Have - Future Sprints)

**Deferred to Sprint 2:**
- Visual kanban pipeline (complex drag-and-drop)
- Document management system
- Calendar scheduling integration
- Advanced AI routing and automation
- Email threading and conversation view
- Bulk actions and filtering
- Real-time notifications
- Mobile responsive design

**Deferred to Sprint 3+:**
- Multi-property management at scale
- Advanced analytics and reporting
- Integration with external services
- Background checks and credit reports
- Lease generation
- Payment processing
- Multi-user/team features

---

## TECHNICAL IMPLEMENTATION ORDER

### Day 1: Project Setup & Database
```
Priority 1 Tasks:
- Next.js 14 app setup with TypeScript
- Supabase project setup and database schema
- Basic authentication (email/password only)
- Property creation form and model
- Email webhook endpoint setup
```

### Day 2: Email Infrastructure
```
Priority 1 Tasks:
- Email parsing and storage system
- Unique email generation logic  
- Resend integration for sending emails
- Basic property-email association
- Simple email list view
```

### Day 3: AI Integration
```
Priority 1 Tasks:
- OpenAI API integration
- Email intent classification
- Response generation based on property details
- AI response review interface
- Manual send functionality
```

### Day 4: Core User Experience
```
Priority 1 Tasks:
- Inbox interface for email management
- Email thread display
- Response composer with AI integration
- Email status tracking (unread/responded)
- Basic property dashboard
```

### Day 5: Polish & Quick Wins
```
Priority 2 Tasks:
- Basic applicant record creation
- Response templates system
- Dashboard statistics
- UI improvements and bug fixes
- Basic error handling
```

### Day 6: Testing & Deployment
```
Priority 3 Tasks:
- End-to-end testing of core workflow
- Bug fixes and stability improvements
- Production deployment to Vercel
- Documentation for handoff
```

---

## IMPLEMENTATION CONSTRAINTS

### Technical Debt Decisions
- No complex UI components (keep forms simple)
- Minimal error handling (just basic try/catch)
- No user onboarding flow (just signup and start)
- No data validation beyond required fields
- Single user only (no multi-tenancy)
- No email authentication/verification beyond webhook security

### Feature Simplifications
- **Property Management:** Just CRUD operations, no advanced features
- **AI Responses:** Review-required only, no auto-send
- **Applicant Tracking:** Basic status updates, no pipeline visualization  
- **Email Interface:** Simple list view, no threading or search
- **Templates:** Static templates, no dynamic content beyond basic variables

---

## RISK MITIGATION

### Day 1-2 Risks
**Risk:** Email webhook complexity
**Mitigation:** Use simple webhook with basic parsing, defer advanced features

**Risk:** Unique email generation conflicts
**Mitigation:** Use UUID suffix, simple validation

### Day 3-4 Risks  
**Risk:** OpenAI API integration issues
**Mitigation:** Have fallback templates ready, manual composition always available

**Risk:** Email sending failures
**Mitigation:** Queue system not needed for MVP, just retry logic

### Day 5-6 Risks
**Risk:** Scope creep from stakeholders
**Mitigation:** Document exactly what MVP delivers, defer all "nice to have" requests

**Risk:** Performance issues
**Mitigation:** Limit to 100 emails per property for MVP

---

## SUCCESS CRITERIA

### MVP Completion Checklist
- [ ] Landlord can create account and add property
- [ ] Property gets unique email address that works
- [ ] External emails to property address are received and displayed
- [ ] AI generates response suggestions for emails  
- [ ] Landlord can review, edit, and send responses
- [ ] Email status updates to show responded/unread
- [ ] Basic dashboard shows properties and email counts

### User Acceptance Criteria
- Landlord can complete full workflow: Create property → Receive email → Send AI-assisted response in under 5 minutes
- System handles at least 10 emails per property without breaking
- AI response quality is "good enough" for 80% of common inquiries
- Zero data loss during the 6-day development window

---

## TECH STACK (Simplified)

**Frontend:** Next.js 14 with App Router, TypeScript, Tailwind CSS, Shadcn/ui (basic components only)
**Backend:** Supabase (Auth, Database, Realtime subscriptions)
**AI:** OpenAI API (GPT-4 for email processing)
**Email:** Resend for sending, webhook for receiving
**Deployment:** Vercel
**Database:** PostgreSQL (via Supabase)

**NOT INCLUDED IN MVP:**
- Calendar integrations
- Document storage/processing
- Advanced UI components
- Real-time features beyond basic updates
- Comprehensive error handling
- Performance optimizations
- Security beyond basic auth