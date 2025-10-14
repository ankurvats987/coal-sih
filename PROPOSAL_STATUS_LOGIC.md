# Proposal Status Logic - PRISM

## Status Flow Based on AI Evaluation

### 1. **PENDING** 🟡

**When:** Proposal just submitted, AI evaluation in progress

**Criteria:**

- Proposal has been submitted by applicant
- AI model is analyzing the proposal
- No evaluation data exists yet in the system
- Proposal not yet assigned to any human reviewer

**What's Happening:**

- AI is analyzing against Coal India R&D guidelines
- Generating evaluation metrics, summary, strengths, concerns
- Calculating alignment score
- Preparing recommendation

**Example:** P003 and P004 in current system

---

### 2. **UNDER-REVIEW** 🔵

**When:** AI evaluation complete, assigned to human reviewer

**Criteria:**

- AI evaluation is complete (all metrics calculated)
- Proposal has been assigned to a human reviewer
- Reviewer can see the AI evaluation report
- Reviewer hasn't submitted final decision yet

**What's Happening:**

- Reviewer is reading the proposal
- Reviewing AI's assessment (summary, metrics, recommendations)
- Considering AI's suggested improvements
- Preparing their own independent evaluation

**Example:** P001 and P002 in current system (both have AI evaluations available)

---

### 3. **REVIEWED** ✅

**When:** Reviewer has completed their evaluation

**Criteria:**

- AI evaluation exists
- Reviewer has submitted their review
- Final recommendation has been recorded
- Waiting for administrative decision

**What's Happening:**

- Review is complete
- Waiting for final approval from committee/authority
- May require additional documentation or clarifications

**Future Implementation:** When reviewer adds their own notes/decision

---

### 4. **APPROVED** ✅

**When:** Proposal has been approved for funding

**Criteria:**

- All reviews complete
- Committee/authority has approved
- Funding has been allocated
- Ready for project initiation

**What's Happening:**

- Applicant notified of approval
- Funding disbursement process initiated
- Project timeline activated

---

### 5. **REJECTED** ❌

**When:** Proposal has been rejected

**Criteria:**

- Reviews complete
- Did not meet funding criteria
- Committee/authority decided against funding

**What's Happening:**

- Applicant notified with reasons
- Feedback provided for future submissions
- May be eligible for resubmission with revisions

---

## Automatic Status Updates

In a real implementation, status would automatically update based on:

### From PENDING → UNDER-REVIEW

**Trigger:** AI evaluation completes

```javascript
if (aiEvaluationExists(proposalId)) {
  updateStatus(proposalId, "under-review");
  assignToReviewer(proposalId, selectBestReviewer());
  notifyReviewer(proposalId);
}
```

### From UNDER-REVIEW → REVIEWED

**Trigger:** Reviewer submits their evaluation

```javascript
if (reviewerEvaluationSubmitted(proposalId)) {
  updateStatus(proposalId, "reviewed");
  notifyCommittee(proposalId);
}
```

### From REVIEWED → APPROVED/REJECTED

**Trigger:** Committee makes final decision

```javascript
if (committeeMakesDecision(proposalId)) {
  updateStatus(proposalId, decision); // "approved" or "rejected"
  notifyApplicant(proposalId, decision);
}
```

---

## Current Mock Data Status

| Proposal ID | Title                            | Status       | Reason                                       |
| ----------- | -------------------------------- | ------------ | -------------------------------------------- |
| P001        | AI-Powered Coal Seam Mapping     | UNDER-REVIEW | AI evaluation complete, assigned to reviewer |
| P002        | Real-Time Mine Safety Monitoring | UNDER-REVIEW | AI evaluation complete, assigned to reviewer |
| P003        | Environmental Impact Assessment  | PENDING      | AI evaluation in progress                    |
| P004        | Automated Mineral Identification | PENDING      | AI evaluation in progress                    |

---

## Status Colors & Icons

- 🟡 **PENDING**: Yellow - Clock icon
- 🔵 **UNDER-REVIEW**: Blue - AlertCircle icon
- ✅ **REVIEWED**: Green - CheckCircle icon
- ✅ **APPROVED**: Green - CheckCircle icon
- ❌ **REJECTED**: Red - XCircle icon

---

## For Applicants

### What each status means for you:

- **PENDING**: Your proposal is being analyzed by our AI system. This typically takes a few hours.
- **UNDER-REVIEW**: AI analysis complete! Your proposal has been assigned to an expert reviewer.
- **REVIEWED**: The reviewer has completed their evaluation. Waiting for final decision.
- **APPROVED**: Congratulations! Your proposal has been approved for funding.
- **REJECTED**: Unfortunately, your proposal was not selected. You'll receive detailed feedback.

---

## For Reviewers

### What you see at each status:

- **PENDING**: Not visible to reviewers yet (AI still working)
- **UNDER-REVIEW**: Full proposal + AI evaluation visible, awaiting your review
- **REVIEWED**: Your review is submitted, visible to committee
- **APPROVED/REJECTED**: Final decision made, visible to all parties

---

## Reviewer Actions

When reviewing a proposal (status: UNDER-REVIEW), reviewers have the following action buttons:

### 1. **Approve for Funding** ✅

- **Action**: Approve the proposal without conditions
- **Result**: Status changes to "approved"
- **Notification**: Applicant receives approval notification
- **Next Steps**: Funding allocation and project initiation

### 2. **Conditional Approval (Requires Revisions)** ⚠️

- **Action**: Approve with specific conditions that must be met
- **Input Required**: Reviewer must specify conditions/revisions needed
- **Result**: Status changes to "reviewed" with conditions
- **Notification**: Applicant receives conditional approval with required changes
- **Next Steps**: Applicant submits revisions → Re-review → Final approval

### 3. **Reject Proposal** ❌

- **Action**: Reject the proposal
- **Input Required**: Reviewer must provide detailed reason for rejection
- **Result**: Status changes to "rejected"
- **Notification**: Applicant receives rejection with detailed feedback
- **Next Steps**: Applicant may revise and resubmit in future cycles

### 4. **Request Additional Information** 📄

- **Action**: Request clarifications or additional documents from applicant
- **Input Required**: Specific questions or requirements
- **Result**: Status remains "under-review"
- **Notification**: Applicant receives information request
- **Next Steps**: Applicant provides info → Review continues

### 5. **Reviewer Notes** 📝

- **Action**: Add personal notes and observations
- **Privacy**: Notes are stored internally for reviewer reference
- **Usage**: Can be referenced during committee meetings
- **Optional**: Not required but recommended for detailed evaluations
