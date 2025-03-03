const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.post('/create', async (req, res) => {
  const { name, description, startDate, endDate, teamMembers } = req.body;

  try {
    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      teamMembers
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('teamMembers');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, teamMembers } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(id, {
      name,
      description,
      startDate,
      endDate,
      teamMembers
    }, { new: true });
    
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
