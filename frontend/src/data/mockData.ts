import { Proposal, ProposalEvaluation } from "../types";

export const mockProposals: Proposal[] = [
  {
    id: "P001",
    title: "AI-Powered Coal Seam Mapping and Resource Estimation",
    submittedBy: "Dr. John Doe",
    submittedDate: "2025-10-10",
    status: "under-review", // AI evaluation complete, waiting for human reviewer decision
    fileName: "proposal-package.zip",
    projectTitle: "AI-Powered Coal Seam Mapping and Resource Estimation",
    principalInvestigator: "Dr. John Doe",
    coInvestigators: [
      {
        name: "Dr. Rajesh Kumar",
        institution: "IIT Kharagpur",
        department: "Computer Science",
        email: "rajesh.kumar@iitkgp.ac.in",
      },
      {
        name: "Prof. Amit Verma",
        institution: "IIT Delhi",
        department: "Mining Engineering",
        email: "amit.verma@iitd.ac.in",
      },
    ],
    duration: "24 months",
    fundingRequested: "₹85,00,000",
    researchArea: "automation",
    keywords: [
      "artificial intelligence",
      "coal seam mapping",
      "resource estimation",
      "machine learning",
    ],
    abstract:
      "This research proposes the development of an advanced AI-based system for automated coal seam mapping and resource estimation. By leveraging deep learning algorithms and remote sensing data, we aim to improve the accuracy and efficiency of coal reserve assessment. The project will integrate geological survey data, satellite imagery, and historical mining records to create predictive models that can identify optimal mining zones and estimate coal reserves with unprecedented precision.",
    documents: [
      {
        id: "doc1",
        name: "Technical Proposal Document",
        type: "proposal",
        fileName: "AI_Coal_Seam_Mapping_Technical_Proposal.pdf",
        fileSize: "2.3 MB",
        uploadedDate: "2025-10-10",
      },
      {
        id: "doc2",
        name: "Detailed Budget Breakdown",
        type: "budget",
        fileName: "Budget_Breakdown_24_Months.xlsx",
        fileSize: "156.4 KB",
        uploadedDate: "2025-10-10",
      },
      {
        id: "doc3",
        name: "Principal Investigator CV",
        type: "cv",
        fileName: "Dr_Sarah_Johnson_CV.pdf",
        fileSize: "487.2 KB",
        uploadedDate: "2025-10-10",
      },
      {
        id: "doc4",
        name: "Support Letter - IIT Delhi",
        type: "support-letter",
        fileName: "Support_Letter_IIT_Delhi.pdf",
        fileSize: "98.5 KB",
        uploadedDate: "2025-10-10",
      },
      {
        id: "doc5",
        name: "Equipment Specifications",
        type: "other",
        fileName: "Equipment_Technical_Specs.pdf",
        fileSize: "1.8 MB",
        uploadedDate: "2025-10-10",
      },
    ],
  },
  {
    id: "P002",
    title: "Real-Time Mine Safety Monitoring System Using IoT Sensors",
    submittedBy: "Dr. John Doe",
    submittedDate: "2025-10-12",
    status: "under-review",
    fileName: "proposal-package.zip",
    projectTitle: "Real-Time Mine Safety Monitoring System Using IoT Sensors",
    principalInvestigator: "Dr. John Doe",
    coInvestigators: [
      {
        name: "Dr. Priya Sharma",
        institution: "Indian School of Mines, Dhanbad",
        department: "Electronics Engineering",
        email: "priya.sharma@ismdhanbad.ac.in",
      },
      {
        name: "Dr. Vikram Singh",
        institution: "NIT Rourkela",
        department: "Electrical Engineering",
        email: "vikram.singh@nitr.ac.in",
      },
    ],
    duration: "18 months",
    fundingRequested: "₹62,50,000",
    researchArea: "safety",
    keywords: [
      "IoT",
      "mine safety",
      "real-time monitoring",
      "sensor networks",
      "early warning system",
    ],
    abstract:
      "This project aims to develop a comprehensive IoT-based safety monitoring system for underground coal mines. The system will deploy a network of sensors to continuously monitor critical parameters including gas concentrations, temperature, humidity, and structural stability. Advanced analytics will enable real-time hazard detection and automated alert generation, significantly enhancing miner safety and reducing accident risks.",
    documents: [
      {
        id: "doc6",
        name: "Technical Proposal",
        type: "proposal",
        fileName: "IoT_Safety_System_Proposal.pdf",
        fileSize: "1.9 MB",
        uploadedDate: "2025-10-12",
      },
      {
        id: "doc7",
        name: "Project Budget",
        type: "budget",
        fileName: "Project_Budget_18_Months.xlsx",
        fileSize: "124.8 KB",
        uploadedDate: "2025-10-12",
      },
      {
        id: "doc8",
        name: "PI Curriculum Vitae",
        type: "cv",
        fileName: "Prof_Michael_Chen_CV.pdf",
        fileSize: "392.1 KB",
        uploadedDate: "2025-10-12",
      },
      {
        id: "doc9",
        name: "Industry Collaboration Letter",
        type: "support-letter",
        fileName: "Industry_Support_Letter.pdf",
        fileSize: "76.3 KB",
        uploadedDate: "2025-10-12",
      },
    ],
  },
  {
    id: "P003",
    title:
      "Environmental Impact Assessment of Coal Mining Using Remote Sensing",
    submittedBy: "Dr. John Doe",
    submittedDate: "2025-10-13",
    status: "pending", // AI evaluation in progress, not yet assigned to reviewer
    fileName: "proposal-package.zip",
    projectTitle:
      "Environmental Impact Assessment of Coal Mining Using Remote Sensing",
    principalInvestigator: "Dr. John Doe",
    coInvestigators: [
      {
        name: "Dr. Anil Gupta",
        institution: "NIT Rourkela",
        department: "Earth Sciences",
        email: "anil.gupta@nitr.ac.in",
      },
    ],
    duration: "30 months",
    fundingRequested: "₹95,00,000",
    researchArea: "environment",
    keywords: [
      "remote sensing",
      "environmental impact",
      "coal mining",
      "GIS",
      "sustainability",
    ],
    abstract:
      "This research focuses on developing advanced remote sensing methodologies for comprehensive environmental impact assessment of coal mining activities. Using multi-temporal satellite imagery, GIS analysis, and field validation, we will create predictive models to assess land degradation, water quality changes, air pollution, and biodiversity impacts. The project will deliver actionable insights for sustainable mining practices.",
    documents: [
      {
        id: "doc10",
        name: "Full Technical Proposal",
        type: "proposal",
        fileName: "Environmental_Assessment_Proposal.pdf",
        fileSize: "3.1 MB",
        uploadedDate: "2025-10-13",
      },
      {
        id: "doc11",
        name: "Budget and Timeline",
        type: "budget",
        fileName: "Budget_30_Months.xlsx",
        fileSize: "178.9 KB",
        uploadedDate: "2025-10-13",
      },
      {
        id: "doc12",
        name: "Dr. Rodriguez CV",
        type: "cv",
        fileName: "Dr_Emily_Rodriguez_CV.pdf",
        fileSize: "523.7 KB",
        uploadedDate: "2025-10-13",
      },
    ],
  },
  {
    id: "P004",
    title:
      "Automated Mineral Identification in Coal Samples Using Deep Learning",
    submittedBy: "Dr. John Doe",
    submittedDate: "2025-10-14",
    status: "pending", // AI evaluation in progress, not yet assigned to reviewer
    fileName: "proposal-package.zip",
    projectTitle:
      "Automated Mineral Identification in Coal Samples Using Deep Learning",
    principalInvestigator: "Dr. John Doe",
    coInvestigators: [
      {
        name: "Dr. Neha Patel",
        institution: "BIT Mesra",
        department: "Computer Science",
        email: "neha.patel@bitmesra.ac.in",
      },
      {
        name: "Prof. Suresh Reddy",
        institution: "IIT Hyderabad",
        department: "Materials Engineering",
        email: "suresh.reddy@iith.ac.in",
      },
      {
        name: "Dr. Kavita Joshi",
        institution: "CSIR-CIMFR",
        department: "Mineral Processing",
        email: "kavita.joshi@cimfr.res.in",
      },
    ],
    duration: "20 months",
    fundingRequested: "₹72,00,000",
    researchArea: "geology",
    keywords: [
      "deep learning",
      "mineral identification",
      "computer vision",
      "coal quality",
      "automation",
    ],
    abstract:
      "This project proposes an innovative deep learning framework for automated mineral identification and coal quality assessment. By training convolutional neural networks on microscopic images of coal samples, we aim to develop a rapid, accurate, and cost-effective alternative to traditional laboratory analysis methods. The system will enable real-time quality control and optimize coal processing operations.",
    documents: [
      {
        id: "doc13",
        name: "Technical Proposal Document",
        type: "proposal",
        fileName: "Mineral_Identification_Proposal.pdf",
        fileSize: "2.7 MB",
        uploadedDate: "2025-10-14",
      },
      {
        id: "doc14",
        name: "Financial Budget Plan",
        type: "budget",
        fileName: "Financial_Plan_20_Months.xlsx",
        fileSize: "145.2 KB",
        uploadedDate: "2025-10-14",
      },
      {
        id: "doc15",
        name: "PI Academic CV",
        type: "cv",
        fileName: "Dr_James_Williams_CV.pdf",
        fileSize: "411.8 KB",
        uploadedDate: "2025-10-14",
      },
      {
        id: "doc16",
        name: "University Support Letter",
        type: "support-letter",
        fileName: "BIT_Support_Letter.pdf",
        fileSize: "89.4 KB",
        uploadedDate: "2025-10-14",
      },
      {
        id: "doc17",
        name: "Laboratory Equipment List",
        type: "other",
        fileName: "Lab_Equipment_Details.pdf",
        fileSize: "654.3 KB",
        uploadedDate: "2025-10-14",
      },
      {
        id: "doc18",
        name: "Previous Research Publications",
        type: "other",
        fileName: "Related_Publications.pdf",
        fileSize: "1.2 MB",
        uploadedDate: "2025-10-14",
      },
    ],
  },
];

export const mockEvaluations: Record<string, ProposalEvaluation> = {
  P001: {
    proposalId: "P001",
    aiSummary:
      "This proposal presents a comprehensive approach to developing machine learning infrastructure for climate modeling with direct applications to mining sector environmental management. The research methodology demonstrates strong technical feasibility with innovative use of distributed computing resources. The proposal aligns excellently with Coal India's sustainability goals and R&D priorities. The interdisciplinary team brings relevant expertise in climate science, ML engineering, and mining operations. Budget allocation is well-justified with clear deliverables at each milestone. Timeline is realistic with appropriate risk mitigation strategies.",
    keyStrengths: [
      "Novel ensemble ML approach specifically tailored for mining sector climate prediction",
      "Strong alignment with Coal India's environmental sustainability objectives",
      "Highly experienced interdisciplinary team with proven track record in ML and climate modeling",
      "Comprehensive risk management and contingency planning",
      "Clear pathway to practical implementation in mining operations",
      "Well-structured budget with detailed cost breakdowns and justifications",
    ],
    areasOfConcern: [
      "Data quality and availability from existing mining sites may need validation",
      "Integration with existing Coal India IT infrastructure requires detailed planning",
    ],
    metrics: [
      {
        name: "Scientific Merit",
        score: 9.2,
        maxScore: 10,
        description:
          "Novel approach to climate prediction using ensemble ML methods with strong theoretical foundation",
      },
      {
        name: "Technical Feasibility",
        score: 8.8,
        maxScore: 10,
        description:
          "Strong infrastructure plan with realistic timeline and clear technical milestones",
      },
      {
        name: "Team Qualifications",
        score: 9.5,
        maxScore: 10,
        description:
          "Highly experienced team with proven track record in ML, climate science, and mining applications",
      },
      {
        name: "Budget Justification",
        score: 8.5,
        maxScore: 10,
        description:
          "Well-detailed budget with appropriate resource allocation and clear cost-benefit analysis",
      },
      {
        name: "Impact Potential",
        score: 9.0,
        maxScore: 10,
        description:
          "High potential for advancing climate science and direct benefits to Coal India operations",
      },
      {
        name: "Alignment with Coal India R&D Goals",
        score: 9.3,
        maxScore: 10,
        description:
          "Excellent alignment with sustainability and environmental management priorities",
      },
    ],
    overallScore: 9.0,
    alignmentScore: 93,
    recommendation: "strongly-recommend",
    recommendationReason:
      "This proposal demonstrates exceptional quality across all evaluation criteria with particularly strong alignment to Coal India's sustainability and environmental management goals. The innovative ML approach has clear practical applications for mining operations.",
  },
  P002: {
    proposalId: "P002",
    aiSummary:
      "This proposal explores quantum computing applications in pharmaceutical research with potential crossover applications to material science in mining. While the quantum algorithms proposed are theoretically sound and innovative, there are significant concerns about the current availability of quantum hardware resources and alignment with Coal India's core R&D priorities. The interdisciplinary team brings valuable expertise from both quantum physics and biochemistry, though mining sector experience is limited. Budget estimates for quantum computing access need revision and clarification.",
    keyStrengths: [
      "Innovative quantum algorithms with strong theoretical foundation",
      "Highly qualified interdisciplinary team with complementary skills",
      "Potential long-term applications to material science and mineral processing",
      "Novel approach that could establish Coal India as innovation leader",
    ],
    areasOfConcern: [
      "Limited direct alignment with Coal India's immediate R&D priorities",
      "Quantum hardware availability poses significant implementation challenges",
      "Lack of mining sector expertise in the team composition",
      "Budget estimates for quantum computing resources require validation",
      "Timeline may be overly optimistic given hardware constraints",
      "Unclear pathway to practical mining applications",
    ],
    metrics: [
      {
        name: "Scientific Merit",
        score: 8.5,
        maxScore: 10,
        description:
          "Innovative quantum algorithms for molecular simulation with solid theoretical basis",
      },
      {
        name: "Technical Feasibility",
        score: 7.0,
        maxScore: 10,
        description:
          "Hardware availability poses significant implementation challenges; access to quantum computers uncertain",
      },
      {
        name: "Team Qualifications",
        score: 8.8,
        maxScore: 10,
        description:
          "Strong interdisciplinary team but lacking mining sector expertise",
      },
      {
        name: "Budget Justification",
        score: 7.5,
        maxScore: 10,
        description:
          "Quantum computing costs need revision; several line items require better justification",
      },
      {
        name: "Impact Potential",
        score: 7.5,
        maxScore: 10,
        description:
          "High potential for scientific advancement but uncertain near-term impact on Coal India operations",
      },
      {
        name: "Alignment with Coal India R&D Goals",
        score: 6.5,
        maxScore: 10,
        description:
          "Moderate alignment; potential applications to mining are speculative and long-term",
      },
    ],
    overallScore: 7.6,
    alignmentScore: 65,
    recommendation: "conditional",
    recommendationReason:
      "Recommend for conditional approval pending major revisions. The proposal shows scientific merit but requires significant modifications to align with Coal India's R&D priorities and address feasibility concerns. Team should add mining sector expertise and provide realistic timeline based on quantum hardware availability.",
  },
};
