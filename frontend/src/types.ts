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
  duration: string;
  fundingRequested: string;
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
  aiSummary: string; // Comprehensive AI-generated summary
  keyStrengths: string[]; // Key strengths identified by AI
  areasOfConcern: string[]; // Areas needing attention
  metrics: EvaluationMetric[];
  overallScore: number;
  alignmentScore: number; // How well it aligns with Coal India R&D guidelines (0-100)
  recommendation:
    | "strongly-recommend"
    | "recommend"
    | "conditional"
    | "not-recommend";
  recommendationReason: string;
}
