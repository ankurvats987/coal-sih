import { useState } from "react";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  User,
} from "lucide-react";
import { Proposal } from "../types";
import ProposalForm from "./ProposalForm";
import ProposalDetail from "./ProposalDetail";
import UserProfile from "./UserProfile";

interface UserDashboardProps {
  proposals: Proposal[];
  onAddProposal: (proposal: Proposal) => void;
}

export default function UserDashboard({
  proposals,
  onAddProposal,
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"proposals" | "profile">(
    "proposals"
  );
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );

  const handleSubmitProposal = (data: any) => {
    const newProposal: Proposal = {
      id: `P${(proposals.length + 1).toString().padStart(3, "0")}`,
      title: data.projectTitle,
      submittedBy: "Dr. John Doe", // Current logged-in user
      submittedDate: new Date().toISOString().split("T")[0],
      status: "pending",
      fileName: "proposal-package.zip",
      projectTitle: data.projectTitle,
      principalInvestigator: "Dr. John Doe", // Submitter is the PI
      coInvestigators: data.coInvestigators || [],
      duration: data.duration,
      fundingRequested: data.fundingRequested,
      researchArea: data.researchArea,
      keywords: data.keywords
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean),
      abstract: data.abstract,
      documents: data.documents.map((doc: any) => ({
        id: doc.id,
        name: doc.label,
        type: doc.type,
        fileName: doc.file.name,
        fileSize: `${(doc.file.size / 1024).toFixed(1)} KB`,
        uploadedDate: new Date().toISOString().split("T")[0],
      })),
    };
    onAddProposal(newProposal);
    setShowProposalForm(false);
  };

  const getStatusIcon = (status: Proposal["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "under-review":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "reviewed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Proposal["status"]) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Tab Navigation */}
      <div className="mb-6 flex gap-1 border-b border-gray-200 -mx-6 px-6">
        <button
          onClick={() => setActiveTab("proposals")}
          className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "proposals"
              ? "text-blue-600 border-blue-600"
              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Proposals</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "profile"
              ? "text-blue-600 border-blue-600"
              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </div>
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && <UserProfile />}

      {/* Proposals Tab */}
      {activeTab === "proposals" && (
        <div className="space-y-6">
          {/* AI Evaluation Info Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  AI-Powered Proposal Review
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  All submitted proposals are first evaluated by our AI system
                  trained on Coal India R&D guidelines. The AI analyzes your
                  proposal for scientific merit, technical feasibility, team
                  qualifications, budget justification, and alignment with Coal
                  India's strategic goals. Once AI evaluation is complete, your
                  proposal will be assigned to a human reviewer with the AI's
                  comprehensive assessment to guide their review.
                </p>
              </div>
            </div>
          </div>

          {/* New Proposal Button */}
          <button
            onClick={() => setShowProposalForm(true)}
            className="w-full border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-5 text-center hover:border-blue-500 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Submit New Proposal
            </span>
          </button>

          {/* Proposals List */}
          <div className="bg-white border border-gray-200">
            <div className="px-5 py-3 border-b bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900">
                My Proposals ({proposals.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          {proposal.projectTitle || proposal.title}
                        </h4>
                        <div className="space-y-1 text-xs text-gray-600 mb-3">
                          <p>
                            <span className="font-medium">Submitted:</span>{" "}
                            {new Date(
                              proposal.submittedDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-gray-500">
                            <span className="font-medium">Documents:</span>{" "}
                            {proposal.documents?.length || 0} file(s)
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedProposal(proposal)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getStatusIcon(proposal.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          proposal.status
                        )}`}
                      >
                        {getStatusText(proposal.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showProposalForm && (
        <ProposalForm
          onClose={() => setShowProposalForm(false)}
          onSubmit={handleSubmitProposal}
        />
      )}

      {selectedProposal && (
        <ProposalDetail
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
        />
      )}
    </div>
  );
}
