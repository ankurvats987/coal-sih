import { Proposal, ProposalEvaluation } from '../types';

export const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning Infrastructure for Climate Modeling',
    submittedBy: 'Dr. Sarah Johnson',
    submittedDate: '2025-10-10',
    status: 'reviewed',
    fileName: 'climate-ml-proposal.pdf'
  },
  {
    id: '2',
    title: 'Quantum Computing Applications in Drug Discovery',
    submittedBy: 'Prof. Michael Chen',
    submittedDate: '2025-10-12',
    status: 'under-review',
    fileName: 'quantum-drug-discovery.pdf'
  },
  {
    id: '3',
    title: 'Renewable Energy Grid Optimization Using AI',
    submittedBy: 'Dr. Emily Rodriguez',
    submittedDate: '2025-10-13',
    status: 'pending',
    fileName: 'energy-grid-ai.pdf'
  },
  {
    id: '4',
    title: 'Neural Network Approaches to Protein Folding',
    submittedBy: 'Dr. James Williams',
    submittedDate: '2025-10-14',
    status: 'pending',
    fileName: 'protein-folding-nn.pdf'
  }
];

export const mockEvaluations: Record<string, ProposalEvaluation> = {
  '1': {
    proposalId: '1',
    summary: 'This proposal presents a comprehensive approach to developing machine learning infrastructure for climate modeling. The research methodology is well-structured, demonstrating strong technical feasibility and innovative use of distributed computing resources. The team has relevant expertise and the budget allocation is justified. The proposal shows excellent potential for significant environmental impact.',
    metrics: [
      {
        name: 'Scientific Merit',
        score: 9.2,
        maxScore: 10,
        description: 'Novel approach to climate prediction using ensemble ML methods'
      },
      {
        name: 'Technical Feasibility',
        score: 8.8,
        maxScore: 10,
        description: 'Strong infrastructure plan with realistic timeline'
      },
      {
        name: 'Team Qualifications',
        score: 9.5,
        maxScore: 10,
        description: 'Highly experienced team with proven track record'
      },
      {
        name: 'Budget Justification',
        score: 8.5,
        maxScore: 10,
        description: 'Well-detailed budget with appropriate resource allocation'
      },
      {
        name: 'Impact Potential',
        score: 9.0,
        maxScore: 10,
        description: 'High potential for advancing climate science'
      }
    ],
    overallScore: 9.0,
    recommendation: 'Strongly recommend for funding. This proposal demonstrates exceptional quality across all evaluation criteria.'
  },
  '2': {
    proposalId: '2',
    summary: 'The proposal explores quantum computing applications in pharmaceutical research, specifically targeting drug discovery acceleration. While the quantum algorithms proposed are theoretically sound, there are concerns about the current availability of quantum hardware resources. The interdisciplinary team brings valuable expertise from both quantum physics and biochemistry.',
    metrics: [
      {
        name: 'Scientific Merit',
        score: 8.5,
        maxScore: 10,
        description: 'Innovative quantum algorithms for molecular simulation'
      },
      {
        name: 'Technical Feasibility',
        score: 7.0,
        maxScore: 10,
        description: 'Hardware availability poses implementation challenges'
      },
      {
        name: 'Team Qualifications',
        score: 8.8,
        maxScore: 10,
        description: 'Strong interdisciplinary team with complementary skills'
      },
      {
        name: 'Budget Justification',
        score: 7.5,
        maxScore: 10,
        description: 'Quantum computing costs may need revision'
      },
      {
        name: 'Impact Potential',
        score: 9.0,
        maxScore: 10,
        description: 'Could revolutionize drug discovery process'
      }
    ],
    overallScore: 8.2,
    recommendation: 'Recommend for funding with modifications. Address hardware access concerns and revise budget estimates.'
  }
};
