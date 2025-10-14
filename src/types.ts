export interface Proposal {
  id: string;
  title: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'under-review' | 'reviewed' | 'approved' | 'rejected';
  fileName: string;
}

export interface EvaluationMetric {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

export interface ProposalEvaluation {
  proposalId: string;
  summary: string;
  metrics: EvaluationMetric[];
  overallScore: number;
  recommendation: string;
}
