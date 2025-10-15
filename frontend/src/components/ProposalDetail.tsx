import {
  X,
  FileText,
  Download,
  Calendar,
  User,
  Clock,
  IndianRupee,
} from "lucide-react";
import { Proposal } from "../types";

interface ProposalDetailProps {
  proposal: Proposal;
  onClose: () => void;
}

export default function ProposalDetail({
  proposal,
  onClose,
}: ProposalDetailProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      "under-review": "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      proposal: "Technical Proposal",
      budget: "Budget Document",
      cv: "Curriculum Vitae",
      "support-letter": "Support Letter",
      other: "Supporting Document",
    };
    return labels[type as keyof typeof labels] || "Document";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {proposal.projectTitle || proposal.title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                  proposal.status
                )}`}
              >
                {proposal.status.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                Submitted: {proposal.submittedDate}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
              Project Information
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Principal Investigator
                </p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">
                    {proposal.principalInvestigator || "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">
                    {proposal.duration || "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Funding Requested</p>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">
                    {proposal.fundingRequested || "N/A"}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Research Area</p>
                <p className="text-sm text-gray-900">
                  {proposal.researchArea || "N/A"}
                </p>
              </div>
              {proposal.coInvestigators &&
                proposal.coInvestigators.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-2">
                      Co-Investigators
                    </p>
                    <div className="space-y-2">
                      {proposal.coInvestigators.map((coInv, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded p-3 bg-gray-50"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {coInv.name}
                          </p>
                          <div className="mt-1 space-y-0.5 text-xs text-gray-600">
                            <p>
                              {coInv.institution} • {coInv.department}
                            </p>
                            <p>{coInv.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              {proposal.keywords && proposal.keywords.length > 0 && (
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proposal.keywords.map((keyword, idx) => (
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
          {proposal.abstract && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
                Abstract
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {proposal.abstract}
              </p>
            </div>
          )}

          {/* Documents */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
              Submitted Documents ({proposal.documents?.length || 0})
            </h3>
            {proposal.documents && proposal.documents.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {proposal.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-blue-50 rounded">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {getDocumentTypeLabel(doc.type)} • {doc.fileName}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                            <span>{doc.fileSize}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{doc.uploadedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                        onClick={() => {
                          // Handle download
                          console.log("Download", doc.fileName);
                        }}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No documents attached</p>
            )}
          </div>

          {/* Status History - placeholder for future enhancement */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
              Status History
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-gray-900">Proposal Submitted</p>
                  <p className="text-xs text-gray-500">
                    {proposal.submittedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
