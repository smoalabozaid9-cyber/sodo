const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ clients, count: clients.length });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Server error while fetching clients' });
  }
});

// Get single client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.json({ client });
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({ message: 'Server error while fetching client' });
  }
});

// Create new client
router.post('/', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const clientData = {
      ...req.body,
      createdBy: req.user._id
    };

    const client = new Client(clientData);
    await client.save();

    const populatedClient = await Client.findById(client._id)
      .populate('createdBy', 'name email');

    res.status(201).json({ 
      message: 'Client created successfully', 
      client: populatedClient 
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ message: 'Server error while creating client' });
  }
});

// Update client
router.put('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client updated successfully', client });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Server error while updating client' });
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ message: 'Server error while deleting client' });
  }
});

module.exports = router;
