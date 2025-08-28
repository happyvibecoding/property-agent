export interface Conversation {
  id: string;
  participants: string[];
  property: {
    id: string;
    address: string;
    email: string;
  };
  lastMessage: {
    content: string;
    sender: string;
    timestamp: Date;
    isAiGenerated: boolean;
  };
  unreadCount: number;
  applicantId?: string;
  isStarred: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Message {
  id: string;
  conversationId: string;
  sender: string;
  senderEmail: string;
  content: string;
  timestamp: Date;
  isAiGenerated: boolean;
  aiConfidence?: number;
  status: 'sent' | 'delivered' | 'read';
  attachments?: MessageAttachment[];
  isFromLandlord: boolean;
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: 'general' | 'viewing' | 'application' | 'approval' | 'rejection' | 'maintenance';
  subject: string;
  content: string;
  variables: string[];
}

export interface ApplicantDetails {
  id: string;
  name: string;
  email: string;
  phone?: string;
  propertyId: string;
  status: 'new' | 'interested' | 'viewing_scheduled' | 'application_submitted' | 'approved' | 'rejected';
  firstContact: Date;
  lastActivity: Date;
  matchScore?: number;
  notes: string[];
  tags: string[];
}

export interface AiInsight {
  type: 'urgency' | 'intent' | 'sentiment' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}

export interface InboxFilter {
  status: 'all' | 'unread' | 'starred' | 'archived';
  property?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  sender?: string;
  hasAttachment?: boolean;
}