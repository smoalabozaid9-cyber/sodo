const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: [true, 'Case number is required'],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Case title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Case description is required']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client is required']
  },
  assignedLawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caseType: {
    type: String,
    enum: ['Criminal', 'Civil', 'Family', 'Corporate', 'Real Estate', 'Immigration', 'Intellectual Property', 'Labor', 'Tax', 'Other'],
    required: [true, 'Case type is required']
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Pending', 'Closed', 'Won', 'Lost', 'Settled'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  courtName: {
    type: String,
    trim: true
  },
  judgeAssigned: {
    type: String,
    trim: true
  },
  filingDate: {
    type: Date
  },
  nextHearingDate: {
    type: Date
  },
  closingDate: {
    type: Date
  },
  billingAmount: {
    type: Number,
    default: 0
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
caseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Case', caseSchema);
