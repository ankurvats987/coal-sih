import { useState, useEffect } from "react";
import { X, File, Trash2, Plus } from "lucide-react";
import { CoInvestigator } from "../types";

interface ProposalFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface UploadedFile {
  id: string;
  type: string;
  file: File;
  label: string;
}

export default function ProposalForm({ onClose, onSubmit }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    projectTitle: "",
    duration: "",
    fundingRequested: "",
    researchArea: "",
    keywords: "",
    abstract: "",
  });

  const [coInvestigators, setCoInvestigators] = useState<CoInvestigator[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const fillWithDemoData = () => {
    // Fill form data
    setFormData({
      projectTitle:
        "Sustainable Coal Mining with AI-Powered Environmental Monitoring",
      duration: "36 months",
      fundingRequested: "₹85,00,000",
      researchArea: "environment", // Using valid dropdown option
      keywords:
        "Sustainable mining, Environmental monitoring, Machine learning, Real-time analytics, Carbon footprint reduction",
      abstract:
        "This project aims to develop an AI-powered environmental monitoring system for sustainable coal mining operations. The system will use advanced machine learning algorithms to analyze real-time environmental data, predict potential hazards, and optimize mining processes to minimize ecological impact. By integrating IoT sensors, satellite imagery, and predictive analytics, we will create a comprehensive solution that ensures compliance with environmental regulations while improving operational efficiency. The expected outcomes include a 30% reduction in environmental incidents, improved air quality monitoring, and significant cost savings through preventive maintenance. This research directly supports Coal India's commitment to sustainable mining practices and environmental stewardship.",
    });

    // Fill co-investigators
    setCoInvestigators([
      {
        name: "Dr. Priya Sharma",
        institution: "IIT Bombay",
        department: "Environmental Engineering",
        email: "priya.sharma@iitb.ac.in",
      },
      {
        name: "Prof. Amit Verma",
        institution: "IIT Delhi",
        department: "Computer Science & AI",
        email: "amit.verma@iitd.ac.in",
      },
    ]);

    // Create mock files (these are just placeholder File objects for demo)
    const mockFiles: UploadedFile[] = [
      {
        id: Math.random().toString(36).substr(2, 9),
        type: "proposal",
        file: new (File as any)(
          ["Demo proposal content"],
          "Technical_Proposal.pdf",
          { type: "application/pdf" }
        ),
        label: "Technical Proposal Document",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: "budget",
        file: new (File as any)(
          ["Demo budget content"],
          "Budget_Breakdown.xlsx",
          { type: "application/vnd.ms-excel" }
        ),
        label: "Detailed Budget Plan",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: "cv",
        file: new (File as any)(["Demo CV content"], "PI_CV.pdf", {
          type: "application/pdf",
        }),
        label: "Principal Investigator CV",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        type: "support-letter",
        file: new (File as any)(
          ["Demo letter content"],
          "Institution_Support_Letter.pdf",
          { type: "application/pdf" }
        ),
        label: "Institution Support Letter",
      },
    ];
    setUploadedFiles(mockFiles);
  };

  // Add keyboard shortcut: Ctrl+Shift+D to fill demo data
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        fillWithDemoData();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [uploadedFiles]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    label: string
  ) => {
    const files = e.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        type,
        file,
        label,
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, coInvestigators, documents: uploadedFiles });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Submit New Proposal
            </h2>
            <button
              type="button"
              onClick={fillWithDemoData}
              className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
              title="Fill form with demo data for quick testing (Ctrl+Shift+D)"
            >
              <span>Fill Demo Data</span>
              <span className="text-[10px] opacity-70">(Ctrl+Shift+D)</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the full project title"
                />
              </div>
            </div>
          </div>

          {/* Co-Investigators */}
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b">
              <h3 className="text-sm font-semibold text-gray-900">
                Co-Investigators (Optional)
              </h3>
              <button
                type="button"
                onClick={() =>
                  setCoInvestigators([
                    ...coInvestigators,
                    { name: "", institution: "", department: "", email: "" },
                  ])
                }
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Co-Investigator
              </button>
            </div>
            {coInvestigators.length === 0 ? (
              <p className="text-sm text-gray-500">
                No co-investigators added yet.
              </p>
            ) : (
              <div className="space-y-4">
                {coInvestigators.map((coInv, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        Co-Investigator {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          setCoInvestigators(
                            coInvestigators.filter((_, i) => i !== index)
                          )
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-xs font-medium text-gray-700 mb-1 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={coInv.name}
                          onChange={(e) => {
                            const updated = [...coInvestigators];
                            updated[index].name = e.target.value;
                            setCoInvestigators(updated);
                          }}
                          required={coInvestigators.length > 0}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Dr. John Smith"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block">
                          Institution *
                        </label>
                        <input
                          type="text"
                          value={coInv.institution}
                          onChange={(e) => {
                            const updated = [...coInvestigators];
                            updated[index].institution = e.target.value;
                            setCoInvestigators(updated);
                          }}
                          required={coInvestigators.length > 0}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="IIT Delhi"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block">
                          Department *
                        </label>
                        <input
                          type="text"
                          value={coInv.department}
                          onChange={(e) => {
                            const updated = [...coInvestigators];
                            updated[index].department = e.target.value;
                            setCoInvestigators(updated);
                          }}
                          required={coInvestigators.length > 0}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Mining Engineering"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-medium text-gray-700 mb-1 block">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={coInv.email}
                          onChange={(e) => {
                            const updated = [...coInvestigators];
                            updated[index].email = e.target.value;
                            setCoInvestigators(updated);
                          }}
                          required={coInvestigators.length > 0}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="john.smith@institution.edu"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
              Project Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 24 months"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Funding Requested *
                </label>
                <input
                  type="text"
                  name="fundingRequested"
                  value={formData.fundingRequested}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ₹50,00,000"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Research Area *
                </label>
                <select
                  name="researchArea"
                  value={formData.researchArea}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select research area</option>
                  <option value="coal-mining">Coal Mining Technology</option>
                  <option value="safety">Mining Safety</option>
                  <option value="environment">Environmental Impact</option>
                  <option value="automation">Automation & AI</option>
                  <option value="geology">Geology & Exploration</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Keywords *
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Comma-separated keywords"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Abstract *
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide a brief summary of your research proposal (max 300 words)"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
              Required Documents
            </h3>
            <div className="space-y-3">
              {/* Proposal Document */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Technical Proposal *{" "}
                  <span className="text-gray-500 font-normal">
                    (PDF, DOC, DOCX)
                  </span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileUpload(e, "proposal", "Technical Proposal")
                  }
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Budget Document */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Detailed Budget *{" "}
                  <span className="text-gray-500 font-normal">
                    (Excel, PDF)
                  </span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.xls,.xlsx"
                  onChange={(e) =>
                    handleFileUpload(e, "budget", "Budget Document")
                  }
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* CV */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  CV of Principal Investigator *{" "}
                  <span className="text-gray-500 font-normal">(PDF)</span>
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileUpload(e, "cv", "Principal Investigator CV")
                  }
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Support Letters */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Support Letters (Optional){" "}
                  <span className="text-gray-500 font-normal">(PDF)</span>
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) =>
                    handleFileUpload(e, "support-letter", "Support Letter")
                  }
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Other Documents */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Other Supporting Documents (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    handleFileUpload(e, "other", "Supporting Document")
                  }
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <File className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.label}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {file.file.name} (
                            {(file.file.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white rounded transition-colors ${
                uploadedFiles.length < 3
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={uploadedFiles.length < 3}
              title={
                uploadedFiles.length < 3
                  ? `Please upload at least 3 documents (${uploadedFiles.length}/3 uploaded)`
                  : "Submit your proposal"
              }
            >
              Submit Proposal
            </button>
          </div>
          {uploadedFiles.length < 3 && (
            <p className="text-xs text-red-600 text-right mt-2">
              * At least 3 documents required (Proposal, Budget, CV)
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
