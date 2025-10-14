export interface ProposalDocument {
  id: string;
  name: string;
  type: "proposal" | "budget" | "cv" | "support-letter" | "other";
  fileName: string;
  fileSize: string;
  uploadedDate: string;
}

export interface CoInvestigator {
  name: string;
  institution: string;
  department: string;
  email: string;
}

export interface Proposal {
  id: string;
  title: string;
  submittedBy: string;
  submittedDate: string;
  status: "pending" | "under-review" | "reviewed" | "approved" | "rejected";
  fileName: string;

  // Detailed proposal information
  projectTitle: string;
  principalInvestigator: string;
  coInvestigators?: CoInvestigator[];
  duration: string; // e.g., "24 months"
  fundingRequested: string; // e.g., "₹50,00,000"
  researchArea: string;
  keywords: string[];
  abstract: string;
  documents: ProposalDocument[];
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
