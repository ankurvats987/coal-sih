import { Router } from 'express';
import { ProposalEvaluation } from '../models/proposal-evaluation.model';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

// Create a new proposal evaluation
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const evaluation = new ProposalEvaluation(req.body);
    await evaluation.save();
    res.status(201).json(evaluation);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
});

// Get all proposal evaluations
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const evaluations = await ProposalEvaluation.find().populate('proposalId');
    res.json(evaluations);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
});

// Get a single proposal evaluation by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const evaluation = await ProposalEvaluation.findById(req.params.id).populate('proposalId');
    if (!evaluation) {
      return res.status(404).json({ msg: 'Evaluation not found' });
    }
    res.json(evaluation);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
});

// Update a proposal evaluation by ID
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const evaluation = await ProposalEvaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evaluation) {
      return res.status(404).json({ msg: 'Evaluation not found' });
    }
    res.json(evaluation);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
});

// Delete a proposal evaluation by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const evaluation = await ProposalEvaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ msg: 'Evaluation not found' });
    }
    res.json({ msg: 'Evaluation deleted' });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
