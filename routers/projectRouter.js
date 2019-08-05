const express = require('express');
const {
  createProject,
  createAction,
  getProjects,
  getProject,
  getActions,
  updateProject,
  deleteProject,
} = require('../controllers/projectController.js');
const { validateProject, validateAction, validateProjectId } = require('../middleware/validation.js');

const router = express.Router();

router.post('/', validateProject, createProject);
router.post('/:project_id/actions', validateAction, createAction);
router.get('/', getProjects);
router.get('/:project_id', validateProjectId, getProject);
router.get('/:project_id/actions', validateProjectId, getActions);
router.put('/:project_id', validateProjectId, validateProject, updateProject);
router.delete('/:project_id', validateProjectId, deleteProject);

module.exports = router;
