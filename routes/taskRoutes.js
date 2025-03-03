const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/create', async (req, res) => {
  const { projectId, name, description, assignee, dueDate } = req.body;

  try {
    const task = new Task({
      projectId,
      name,
      description,
      assignee,
      dueDate
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId }).populate('assignee');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, assignee, status, dueDate } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, {
      name,
      description,
      assignee,
      status,
      dueDate
    }, { new: true });
    
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
