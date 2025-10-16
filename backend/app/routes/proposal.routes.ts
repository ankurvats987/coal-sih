import { Router } from 'express';
import { Proposal } from '../models/proposal.model';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

// Create a new proposal
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const proposal = new Proposal(req.body);
    await proposal.save();
    res.status(201).json(proposal);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
});

// Get all proposals
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
});

// Get a single proposal by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ msg: 'Proposal not found' });
    }
    res.json(proposal);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
});

// Update a proposal by ID
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proposal) {
      return res.status(404).json({ msg: 'Proposal not found' });
    }
    res.json(proposal);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
});

// Delete a proposal by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (!proposal) {
      return res.status(404).json({ msg: 'Proposal not found' });
    }
    res.json({ msg: 'Proposal deleted' });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
