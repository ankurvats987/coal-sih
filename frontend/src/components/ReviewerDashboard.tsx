import { useState } from "react";
import {
  FileText,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Proposal, ProposalEvaluation } from "../types";

interface ReviewerDashboardProps {
  proposals: Proposal[];
  evaluations: Record<string, ProposalEvaluation>;
  onUpdateProposalStatus: (
    proposalId: string,
    newStatus: Proposal["status"]
  ) => void;
}

export default function ReviewerDashboard({
  proposals,
  evaluations,
  onUpdateProposalStatus,
}: ReviewerDashboardProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<
    "approve" | "conditional" | "reject" | "request-info" | null
  >(null);
  const [actionText, setActionText] = useState("");

  const selectedEvaluation = selectedProposal
    ? evaluations[selectedProposal.id]
    : null;

  const handleActionSubmit = () => {
    if (!actionType || !selectedProposal) return;

    // Update the proposal status based on action
    const statusMap: Record<string, Proposal["status"]> = {
      approve: "approved",
      conditional: "reviewed",
      reject: "rejected",
      "request-info": "under-review",
    };

    const newStatus = statusMap[actionType];

    // Update proposal status via App.tsx
    onUpdateProposalStatus(selectedProposal.id, newStatus);

    // Update selected proposal locally to reflect change immediately
    setSelectedProposal({ ...selectedProposal, status: newStatus });

    const messages: Record<string, string> = {
      approve:
        "✅ Proposal approved successfully! Status updated to 'Approved'.",
      conditional: `⚠️ Conditional approval recorded! Status updated to 'Reviewed'.\nConditions: "${actionText}"`,
      reject: `❌ Proposal rejected. Status updated to 'Rejected'.\nReason: "${actionText}"`,
      "request-info": `📄 Information request sent to applicant.\nRequest: "${actionText}"`,
    };

    alert(
      `${messages[actionType]}\n\nThe proposal list has been updated. In production, the applicant would be notified.`
    );

    setShowActionModal(false);
    setActionType(null);
    setActionText("");
  };

  const openActionModal = (
    type: "approve" | "conditional" | "reject" | "request-info"
  ) => {
    setActionType(type);
    setActionText("");
    setShowActionModal(true);
  };

  const getStatusIcon = (status: Proposal["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "under-review":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "reviewed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: Proposal["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under-review":
        return "bg-blue-100 text-blue-800";
      case "reviewed":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Reviewer Dashboard
        </h2>
        <p className="text-gray-600">Review and evaluate submitted proposals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Submitted Proposals
            </h3>
          </div>

          <div className="divide-y divide-gray-200 max-h-[calc(100vh-16rem)] overflow-y-auto">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedProposal?.id === proposal.id
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedProposal(proposal)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                        {proposal.projectTitle || proposal.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">
                        by {proposal.submittedBy}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(proposal.submittedDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {proposal.documents?.length || 0} document(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(proposal.status)}
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                          proposal.status
                        )}`}
                      >
                        {proposal.status.toUpperCase()}
                      </span>
                    </div>
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selectedProposal ? (
            <div className="space-y-6">
              {/* Proposal Details Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-5 py-4 border-b bg-gray-50 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">
                    Proposal Details
                  </h3>
                  {selectedEvaluation && (
                    <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">
                        {selectedEvaluation.overallScore.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-600">/10</span>
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-6 max-h-[calc(100vh-32rem)] overflow-y-auto">
                  {/* Project Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
                      Project Information
                    </h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500 mb-1">
                          Project Title
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedProposal.projectTitle ||
                            selectedProposal.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Principal Investigator
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedProposal.principalInvestigator || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                        <p className="text-sm text-gray-900">
                          {selectedProposal.duration || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Funding Requested
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedProposal.fundingRequested || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Research Area
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedProposal.researchArea || "N/A"}
                        </p>
                      </div>
                      {selectedProposal.coInvestigators &&
                        selectedProposal.coInvestigators.length > 0 && (
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500 mb-2">
                              Co-Investigators
                            </p>
                            <div className="space-y-2">
                              {selectedProposal.coInvestigators.map(
                                (coInv, idx) => (
                                  <div
                                    key={idx}
                                    className="border border-gray-200 rounded p-2 bg-gray-50"
                                  >
                                    <p className="text-sm font-medium text-gray-900">
                                      {coInv.name}
                                    </p>
                                    <div className="mt-0.5 space-y-0.5 text-xs text-gray-600">
                                      <p>
                                        {coInv.institution} • {coInv.department}
                                      </p>
                                      <p>{coInv.email}</p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {selectedProposal.keywords &&
                        selectedProposal.keywords.length > 0 && (
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500 mb-1">
                              Keywords
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedProposal.keywords.map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Abstract */}
                  {selectedProposal.abstract && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
                        Abstract
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedProposal.abstract}
                      </p>
                    </div>
                  )}

                  {/* Documents */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
                      Submitted Documents (
                      {selectedProposal.documents?.length || 0})
                    </h4>
                    {selectedProposal.documents &&
                    selectedProposal.documents.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3">
                        {selectedProposal.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="border border-gray-200 rounded p-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <FileText className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">
                                    {doc.name}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {doc.fileName}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span>{doc.fileSize}</span>
                                    <span>•</span>
                                    <span>{doc.uploadedDate}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No documents attached
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Evaluation Section */}
              {selectedEvaluation && (
                <>
                  {/* AI Summary and Alignment Score */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        AI-Generated Evaluation Summary
                      </h4>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Alignment Score</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedEvaluation.alignmentScore}
                          <span className="text-sm text-gray-600">/100</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedEvaluation.aiSummary}
                    </p>
                  </div>

                  {/* Key Strengths */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Key Strengths Identified
                    </h4>
                    <ul className="space-y-2">
                      {selectedEvaluation.keyStrengths.map((strength, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-green-600 font-bold mt-0.5">
                            •
                          </span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas of Concern */}
                  {selectedEvaluation.areasOfConcern.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        Areas of Concern
                      </h4>
                      <ul className="space-y-2">
                        {selectedEvaluation.areasOfConcern.map(
                          (concern, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-yellow-600 font-bold mt-0.5">
                                •
                              </span>
                              <span>{concern}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Evaluation Metrics */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                      Detailed Evaluation Metrics
                    </h4>
                    <div className="space-y-4">
                      {selectedEvaluation.metrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {metric.name}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              {metric.score.toFixed(1)}
                              <span className="text-xs text-gray-500 font-normal">
                                {" "}
                                / {metric.maxScore}
                              </span>
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full transition-all ${
                                metric.score >= 9
                                  ? "bg-green-600"
                                  : metric.score >= 8
                                  ? "bg-blue-600"
                                  : metric.score >= 7
                                  ? "bg-yellow-500"
                                  : "bg-orange-500"
                              }`}
                              style={{
                                width: `${
                                  (metric.score / metric.maxScore) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {metric.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Improvements */}
                  {selectedEvaluation.suggestedImprovements &&
                    selectedEvaluation.suggestedImprovements.length > 0 && (
                      <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          AI-Suggested Improvements
                        </h4>
                        <ul className="space-y-2">
                          {selectedEvaluation.suggestedImprovements.map(
                            (improvement, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 flex items-start gap-2"
                              >
                                <span className="text-blue-600 font-bold mt-0.5">
                                  {idx + 1}.
                                </span>
                                <span>{improvement}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Final Recommendation */}
                  <div
                    className={`rounded-lg border-2 p-5 ${
                      selectedEvaluation.recommendation === "strongly-recommend"
                        ? "bg-green-50 border-green-300"
                        : selectedEvaluation.recommendation === "recommend"
                        ? "bg-blue-50 border-blue-300"
                        : selectedEvaluation.recommendation === "conditional"
                        ? "bg-yellow-50 border-yellow-300"
                        : "bg-red-50 border-red-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        {selectedEvaluation.recommendation ===
                        "strongly-recommend" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : selectedEvaluation.recommendation ===
                          "recommend" ? (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        ) : selectedEvaluation.recommendation ===
                          "conditional" ? (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        AI Recommendation
                      </h4>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold uppercase ${
                          selectedEvaluation.recommendation ===
                          "strongly-recommend"
                            ? "bg-green-200 text-green-800"
                            : selectedEvaluation.recommendation === "recommend"
                            ? "bg-blue-200 text-blue-800"
                            : selectedEvaluation.recommendation ===
                              "conditional"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {selectedEvaluation.recommendation.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedEvaluation.recommendationReason}
                    </p>
                  </div>

                  {/* Reviewer Action Buttons - Only show for under-review status */}
                  {selectedProposal.status === "under-review" ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-2">
                        Submit Your Review
                      </h4>
                      <p className="text-sm text-gray-600 mb-5">
                        Based on the AI evaluation and your independent
                        assessment
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Approve Button */}
                        <button
                          onClick={() => openActionModal("approve")}
                          className="border-2 border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Approve</span>
                        </button>

                        {/* Conditional Approval Button */}
                        <button
                          onClick={() => openActionModal("conditional")}
                          className="border-2 border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Conditional</span>
                        </button>

                        {/* Reject Button */}
                        <button
                          onClick={() => openActionModal("reject")}
                          className="border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm">Reject</span>
                        </button>

                        {/* Request More Info Button */}
                        <button
                          onClick={() => openActionModal("request-info")}
                          className="border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">Request Info</span>
                        </button>
                      </div>

                      {/* Reviewer Notes Section */}
                      <div className="mt-5 pt-5 border-t border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Add Review Notes (Optional)
                        </label>
                        <textarea
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                          placeholder="Add your observations and comments..."
                        />
                        <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Show completion message for reviewed/approved/rejected proposals
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300 p-8 text-center">
                      <div className="mb-4">
                        {selectedProposal.status === "approved" && (
                          <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                        )}
                        {selectedProposal.status === "rejected" && (
                          <XCircle className="h-16 w-16 text-red-600 mx-auto" />
                        )}
                        {selectedProposal.status === "reviewed" && (
                          <CheckCircle className="h-16 w-16 text-blue-600 mx-auto" />
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Review Complete
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        This proposal has been{" "}
                        <span className="font-semibold text-gray-900">
                          {selectedProposal.status
                            .replace("-", " ")
                            .toUpperCase()}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-4">
                        No further action required from your side
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                Select a proposal to view details and evaluation
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && actionType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {actionType === "approve" && "Approve Proposal"}
                {actionType === "conditional" && "Conditional Approval"}
                {actionType === "reject" && "Reject Proposal"}
                {actionType === "request-info" && "Request Information"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedProposal?.projectTitle}
              </p>
            </div>

            <div className="p-6">
              {actionType === "approve" ? (
                <p className="text-sm text-gray-700">
                  Are you sure you want to approve this proposal for funding?
                  This action will notify the applicant and begin the funding
                  allocation process.
                </p>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {actionType === "conditional" &&
                      "Specify conditions or revisions required:"}
                    {actionType === "reject" && "Provide reason for rejection:"}
                    {actionType === "request-info" &&
                      "What information do you need?"}
                  </label>
                  <textarea
                    value={actionText}
                    onChange={(e) => setActionText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder={
                      actionType === "conditional"
                        ? "e.g., Please revise budget section and add more details about timeline..."
                        : actionType === "reject"
                        ? "e.g., The proposal does not align with Coal India's R&D priorities..."
                        : "e.g., Please provide more details about your methodology..."
                    }
                  />
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setActionType(null);
                  setActionText("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleActionSubmit}
                disabled={
                  actionType !== "approve" && actionText.trim().length === 0
                }
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : actionType === "conditional"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : actionType === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {actionType === "approve" && "Approve Proposal"}
                {actionType === "conditional" && "Submit Conditions"}
                {actionType === "reject" && "Reject Proposal"}
                {actionType === "request-info" && "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
