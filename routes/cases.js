const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Case = require('../models/Case');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Get all cases
router.get('/', async (req, res) => {
  try {
    const { status, caseType, priority } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (caseType) filter.caseType = caseType;
    if (priority) filter.priority = priority;

    const cases = await Case.find(filter)
      .populate('client', 'firstName lastName email phone')
      .populate('assignedLawyer', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ cases, count: cases.length });
  } catch (error) {
    console.error('Get cases error:', error);
    res.status(500).json({ message: 'Server error while fetching cases' });
  }
});

// Get single case by ID
router.get('/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id)
      .populate('client', 'firstName lastName email phone address')
      .populate('assignedLawyer', 'name email phone')
      .populate('createdBy', 'name email')
      .populate('notes.addedBy', 'name');
    
    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }
    
    res.json({ case: caseData });
  } catch (error) {
    console.error('Get case error:', error);
    res.status(500).json({ message: 'Server error while fetching case' });
  }
});

// Create new case
router.post('/', [
  body('caseNumber').notEmpty().withMessage('Case number is required'),
  body('title').notEmpty().withMessage('Case title is required'),
  body('description').notEmpty().withMessage('Case description is required'),
  body('client').notEmpty().withMessage('Client is required'),
  body('caseType').notEmpty().withMessage('Case type is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const caseData = {
      ...req.body,
      assignedLawyer: req.body.assignedLawyer || req.user._id,
      createdBy: req.user._id
    };

    const newCase = new Case(caseData);
    await newCase.save();

    const populatedCase = await Case.findById(newCase._id)
      .populate('client', 'firstName lastName email phone')
      .populate('assignedLawyer', 'name email')
      .populate('createdBy', 'name email');

    res.status(201).json({ 
      message: 'Case created successfully', 
      case: populatedCase 
    });
  } catch (error) {
    console.error('Create case error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Case number already exists' });
    }
    res.status(500).json({ message: 'Server error while creating case' });
  }
});

// Update case
router.put('/:id', async (req, res) => {
  try {
    const caseData = await Case.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
      .populate('client', 'firstName lastName email phone')
      .populate('assignedLawyer', 'name email')
      .populate('createdBy', 'name email');

    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.json({ message: 'Case updated successfully', case: caseData });
  } catch (error) {
    console.error('Update case error:', error);
    res.status(500).json({ message: 'Server error while updating case' });
  }
});

// Add note to case
router.post('/:id/notes', [
  body('content').notEmpty().withMessage('Note content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const caseData = await Case.findById(req.params.id);
    
    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }

    caseData.notes.push({
      content: req.body.content,
      addedBy: req.user._id,
      addedAt: Date.now()
    });

    await caseData.save();

    const populatedCase = await Case.findById(caseData._id)
      .populate('notes.addedBy', 'name');

    res.json({ 
      message: 'Note added successfully', 
      case: populatedCase 
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Server error while adding note' });
  }
});

// Delete case
router.delete('/:id', async (req, res) => {
  try {
    const caseData = await Case.findByIdAndDelete(req.params.id);

    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.json({ message: 'Case deleted successfully' });
  } catch (error) {
    console.error('Delete case error:', error);
    res.status(500).json({ message: 'Server error while deleting case' });
  }
});

// Get case statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalCases = await Case.countDocuments();
    const openCases = await Case.countDocuments({ status: 'Open' });
    const inProgressCases = await Case.countDocuments({ status: 'In Progress' });
    const closedCases = await Case.countDocuments({ status: 'Closed' });
    
    const casesByType = await Case.aggregate([
      { $group: { _id: '$caseType', count: { $sum: 1 } } }
    ]);

    const casesByPriority = await Case.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.json({
      totalCases,
      openCases,
      inProgressCases,
      closedCases,
      casesByType,
      casesByPriority
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
});

module.exports = router;
