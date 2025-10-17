import { Schema, model, Document } from 'mongoose';

interface IEvaluationMetric {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

interface IProposalEvaluation extends Document {
  proposalId: Schema.Types.ObjectId;
  aiSummary: string;
  keyStrengths: string[];
  areasOfConcern: string[];
  metrics: IEvaluationMetric[];
  overallScore: number;
  alignmentScore: number;
  recommendation: 'strongly-recommend' | 'recommend' | 'conditional' | 'not-recommend';
  recommendationReason: string;
  suggestedImprovements?: string[];
}

const evaluationMetricSchema = new Schema<IEvaluationMetric>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  description: { type: String, required: true },
});

const proposalEvaluationSchema = new Schema<IProposalEvaluation>({
  proposalId: { type: Schema.Types.ObjectId, ref: 'Proposal', required: true },
  aiSummary: { type: String, required: true },
  keyStrengths: [{ type: String }],
  areasOfConcern: [{ type: String }],
  metrics: [evaluationMetricSchema],
  overallScore: { type: Number, required: true },
  alignmentScore: { type: Number, required: true },
  recommendation: { type: String, enum: ['strongly-recommend', 'recommend', 'conditional', 'not-recommend'], required: true },
  recommendationReason: { type: String, required: true },
  suggestedImprovements: [{ type: String }],
});

export const ProposalEvaluation = model<IProposalEvaluation>('ProposalEvaluation', proposalEvaluationSchema);
