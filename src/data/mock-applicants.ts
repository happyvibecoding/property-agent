import type { Applicant, PipelineStage, PipelineStats } from '@/types/pipeline';

export const mockApplicants: Applicant[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    propertyId: 'prop-1',
    propertyAddress: '123 Oak Street, Unit 2A',
    stage: 'new',
    daysInStage: 2,
    aiScore: 8.5,
    appliedDate: new Date('2024-03-15'),
    lastActivity: new Date('2024-03-17'),
    priority: 'high',
    documents: {
      creditCheck: false,
      incomeVerification: true,
      employment: true,
      references: false
    }
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@gmail.com',
    phone: '(555) 234-5678',
    propertyId: 'prop-1',
    propertyAddress: '123 Oak Street, Unit 2A',
    stage: 'screening',
    daysInStage: 5,
    aiScore: 9.2,
    appliedDate: new Date('2024-03-10'),
    lastActivity: new Date('2024-03-16'),
    priority: 'high',
    documents: {
      creditCheck: true,
      incomeVerification: true,
      employment: true,
      references: true
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@outlook.com',
    phone: '(555) 345-6789',
    propertyId: 'prop-2',
    propertyAddress: '456 Pine Avenue, Unit 1B',
    stage: 'documents',
    daysInStage: 3,
    aiScore: 7.8,
    appliedDate: new Date('2024-03-12'),
    lastActivity: new Date('2024-03-15'),
    priority: 'medium',
    documents: {
      creditCheck: true,
      incomeVerification: false,
      employment: true,
      references: true
    }
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'j.wilson@company.com',
    phone: '(555) 456-7890',
    propertyId: 'prop-1',
    propertyAddress: '123 Oak Street, Unit 2A',
    stage: 'approved',
    daysInStage: 1,
    aiScore: 9.5,
    appliedDate: new Date('2024-03-08'),
    lastActivity: new Date('2024-03-16'),
    priority: 'high',
    documents: {
      creditCheck: true,
      incomeVerification: true,
      employment: true,
      references: true
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    phone: '(555) 567-8901',
    propertyId: 'prop-2',
    propertyAddress: '456 Pine Avenue, Unit 1B',
    stage: 'rejected',
    daysInStage: 7,
    aiScore: 4.2,
    appliedDate: new Date('2024-03-05'),
    lastActivity: new Date('2024-03-12'),
    priority: 'low',
    documents: {
      creditCheck: false,
      incomeVerification: false,
      employment: false,
      references: false
    }
  },
  {
    id: '6',
    name: 'David Martinez',
    email: 'david.martinez@email.com',
    phone: '(555) 678-9012',
    propertyId: 'prop-3',
    propertyAddress: '789 Elm Drive, Unit 3C',
    stage: 'new',
    daysInStage: 1,
    aiScore: 8.1,
    appliedDate: new Date('2024-03-16'),
    lastActivity: new Date('2024-03-16'),
    priority: 'medium',
    documents: {
      creditCheck: false,
      incomeVerification: true,
      employment: false,
      references: false
    }
  },
  {
    id: '7',
    name: 'Amanda Foster',
    email: 'amanda.f@domain.com',
    phone: '(555) 789-0123',
    propertyId: 'prop-2',
    propertyAddress: '456 Pine Avenue, Unit 1B',
    stage: 'screening',
    daysInStage: 4,
    aiScore: 7.5,
    appliedDate: new Date('2024-03-11'),
    lastActivity: new Date('2024-03-15'),
    priority: 'medium',
    documents: {
      creditCheck: true,
      incomeVerification: true,
      employment: false,
      references: true
    }
  },
  {
    id: '8',
    name: 'Robert Kim',
    email: 'robert.kim@tech.com',
    phone: '(555) 890-1234',
    propertyId: 'prop-1',
    propertyAddress: '123 Oak Street, Unit 2A',
    stage: 'documents',
    daysInStage: 6,
    aiScore: 8.9,
    appliedDate: new Date('2024-03-09'),
    lastActivity: new Date('2024-03-15'),
    priority: 'high',
    documents: {
      creditCheck: true,
      incomeVerification: true,
      employment: true,
      references: false
    }
  }
];

export const pipelineStages: PipelineStage[] = [
  {
    id: 'new',
    title: 'New',
    count: mockApplicants.filter(a => a.stage === 'new').length,
    color: 'blue',
    description: 'Recently submitted applications'
  },
  {
    id: 'screening',
    title: 'Screening',
    count: mockApplicants.filter(a => a.stage === 'screening').length,
    color: 'yellow',
    description: 'Under background/credit check'
  },
  {
    id: 'documents',
    title: 'Documents',
    count: mockApplicants.filter(a => a.stage === 'documents').length,
    color: 'orange',
    description: 'Awaiting additional documentation'
  },
  {
    id: 'approved',
    title: 'Approved',
    count: mockApplicants.filter(a => a.stage === 'approved').length,
    color: 'green',
    description: 'Ready for lease signing'
  },
  {
    id: 'rejected',
    title: 'Rejected',
    count: mockApplicants.filter(a => a.stage === 'rejected').length,
    color: 'red',
    description: 'Applications that didn\'t qualify'
  }
];

export const pipelineStats: PipelineStats = {
  totalApplicants: mockApplicants.length,
  averageTimeInPipeline: 4.2,
  conversionRate: 68,
  mostActiveProperty: '123 Oak Street, Unit 2A'
};

export const mockProperties = [
  { id: 'prop-1', address: '123 Oak Street, Unit 2A' },
  { id: 'prop-2', address: '456 Pine Avenue, Unit 1B' },
  { id: 'prop-3', address: '789 Elm Drive, Unit 3C' }
];