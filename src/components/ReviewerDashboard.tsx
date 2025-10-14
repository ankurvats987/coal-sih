import { useState } from 'react';
import { FileText, Eye, TrendingUp } from 'lucide-react';
import { Proposal, ProposalEvaluation } from '../types';

interface ReviewerDashboardProps {
  proposals: Proposal[];
  evaluations: Record<string, ProposalEvaluation>;
}

export default function ReviewerDashboard({ proposals, evaluations }: ReviewerDashboardProps) {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  const selectedEvaluation = selectedProposal ? evaluations[selectedProposal] : null;
  const selectedProposalData = proposals.find(p => p.id === selectedProposal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reviewer Dashboard</h2>
        <p className="text-gray-600">Review and evaluate submitted proposals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Submitted Proposals</h3>
          </div>

          <div className="divide-y divide-gray-200 max-h-[calc(100vh-16rem)] overflow-y-auto">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedProposal === proposal.id
                    ? 'bg-blue-50 border-l-4 border-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedProposal(proposal.id)}
              >
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                      {proposal.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">
                      by {proposal.submittedBy}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(proposal.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Eye className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selectedProposal && selectedEvaluation ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedProposalData?.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedProposalData?.submittedBy} • {selectedProposalData?.submittedDate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">
                      {selectedEvaluation.overallScore.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-600">/10</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">AI-Generated Summary</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedEvaluation.summary}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Metrics</h4>
                <div className="space-y-4">
                  {selectedEvaluation.metrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {metric.name}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {metric.score.toFixed(1)} / {metric.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${(metric.score / metric.maxScore) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-lg border-2 p-6 ${
                selectedEvaluation.recommendation.toLowerCase().includes('strongly recommend')
                  ? 'bg-green-50 border-green-200'
                  : selectedEvaluation.recommendation.toLowerCase().includes('recommend')
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommendation</h4>
                <p className="text-sm text-gray-700">
                  {selectedEvaluation.recommendation}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select a proposal to view evaluation details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
