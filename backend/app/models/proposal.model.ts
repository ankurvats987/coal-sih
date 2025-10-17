import { Schema, model, Document } from 'mongoose';

interface IProposalDocument {
  name: string;
  type: 'proposal' | 'budget' | 'cv' | 'support-letter' | 'other';
  fileName: string;
  fileSize: string;
  uploadedDate: string;
}

interface ICoInvestigator {
  name: string;
  institution: string;
  department: string;
  email: string;
}

interface IProposal extends Document {
  title: string;
  submittedBy: string;
  submittedDate: Date;
  status: 'pending' | 'under-review' | 'reviewed' | 'approved' | 'rejected';
  fileName: string;
  projectTitle: string;
  principalInvestigator: string;
  coInvestigators?: ICoInvestigator[];
  duration: string;
  fundingRequested: string;
  researchArea: string;
  keywords: string[];
  abstract: string;
  documents: IProposalDocument[];
}

const proposalDocumentSchema = new Schema<IProposalDocument>({
  name: { type: String, required: true },
  type: { type: String, enum: ['proposal', 'budget', 'cv', 'support-letter', 'other'], required: true },
  fileName: { type: String, required: true },
  fileSize: { type: String, required: true },
  uploadedDate: { type: String, required: true },
});

const coInvestigatorSchema = new Schema<ICoInvestigator>({
  name: { type: String, required: true },
  institution: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
});

const proposalSchema = new Schema<IProposal>({
  title: { type: String, required: true },
  submittedBy: { type: String, required: true },
  submittedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'under-review', 'reviewed', 'approved', 'rejected'], default: 'pending' },
  fileName: { type: String, required: true },
  projectTitle: { type: String, required: true },
  principalInvestigator: { type: String, required: true },
  coInvestigators: [coInvestigatorSchema],
  duration: { type: String, required: true },
  fundingRequested: { type: String, required: true },
  researchArea: { type: String, required: true },
  keywords: [{ type: String }],
  abstract: { type: String, required: true },
  documents: [proposalDocumentSchema],
});

export const Proposal = model<IProposal>('Proposal', proposalSchema);
