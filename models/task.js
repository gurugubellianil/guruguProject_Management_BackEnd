const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  dueDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
