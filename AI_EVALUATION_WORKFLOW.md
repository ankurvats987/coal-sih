# AI Evaluation Workflow - PRISM

## Overview

PRISM uses an AI-powered evaluation system to streamline the proposal review process. All proposals are first evaluated by AI before being assigned to human reviewers.

## Workflow Steps

### 1. Proposal Submission

- Applicant submits proposal through the system
- Status: **PENDING**
- All documents and metadata are captured

### 2. AI Evaluation

- AI model analyzes the proposal against Coal India R&D guidelines
- Vector database contains:
  - Coal India R&D guidelines and policies
  - Successful proposal examples
  - Strategic priorities and goals
  - Technical feasibility criteria
  - Budget justification standards

### 3. AI Assessment Includes:

#### **Comprehensive Summary**

- Detailed analysis of proposal content
- Alignment with Coal India's objectives
- Assessment of methodology and approach

#### **Key Strengths**

- Identified strong points
- Innovative aspects
- Team qualifications
- Strategic alignment

#### **Areas of Concern**

- Potential weaknesses
- Implementation challenges
- Budget concerns
- Timeline issues

#### **Evaluation Metrics** (scored 0-10)

1. **Scientific Merit** - Innovation and research quality
2. **Technical Feasibility** - Implementation practicality
3. **Team Qualifications** - Expertise and experience
4. **Budget Justification** - Cost effectiveness
5. **Impact Potential** - Expected outcomes
6. **Alignment with Coal India R&D Goals** - Strategic fit

#### **Alignment Score** (0-100)

- Measures how well the proposal aligns with Coal India's guidelines
- Based on multiple criteria including objectives, methodology, and expected outcomes

#### **AI Recommendation**

- **Strongly Recommend** - Exceptional quality, high alignment
- **Recommend** - Good quality, meets standards
- **Conditional** - Requires revisions
- **Not Recommend** - Does not meet criteria

#### **Suggested Improvements**

- Specific actionable recommendations
- Areas needing clarification
- Additional information required

### 4. Assignment to Reviewer

- Status: **UNDER REVIEW**
- Proposal assigned to human reviewer
- Reviewer receives:
  - Complete proposal with all documents
  - Full AI evaluation report
  - Evaluation metrics and scores
  - Suggested improvements

### 5. Human Review

- Reviewer considers AI assessment
- Evaluates proposal independently
- Makes final recommendation
- Status changes to: **REVIEWED**, **APPROVED**, or **REJECTED**

## Benefits

### For Applicants

- Faster initial screening
- Consistent evaluation criteria
- Clear feedback on strengths and weaknesses
- Suggestions for improvement

### For Reviewers

- Comprehensive AI analysis to guide review
- Standardized evaluation metrics
- Highlighted key areas to focus on
- More efficient review process

### For Coal India

- Consistent evaluation standards
- Reduced review time
- Better alignment with strategic goals
- Data-driven decision making

## AI Model Training

The AI evaluation model is trained on:

- Coal India R&D guidelines and policies
- Historical proposal data
- Successful project outcomes
- Domain expertise in mining and energy sector
- Technical feasibility criteria
- Budget justification standards

The model is continuously updated based on:

- Reviewer feedback
- Project outcomes
- Updated guidelines
- New strategic priorities
