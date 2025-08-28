export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyAddress: string;
  stage: 'new' | 'screening' | 'documents' | 'approved' | 'rejected';
  daysInStage: number;
  aiScore?: number;
  appliedDate: Date;
  lastActivity: Date;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
  documents?: {
    creditCheck: boolean;
    incomeVerification: boolean;
    employment: boolean;
    references: boolean;
  };
}

export interface PipelineStage {
  id: string;
  title: string;
  count: number;
  color: string;
  description: string;
}

export interface PipelineFilters {
  propertyId?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
  status?: string;
}

export interface PipelineStats {
  totalApplicants: number;
  averageTimeInPipeline: number;
  conversionRate: number;
  mostActiveProperty: string;
}