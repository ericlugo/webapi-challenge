const express = require('express');
const { getActions, getAction, updateAction, deleteAction } = require('../controllers/actionController.js');
const { validateAction, validateActionId } = require('../middleware/validation.js');

const router = express.Router();

router.get('/', getActions);
router.get('/:action_id', validateActionId, getAction);
router.put('/:action_id', validateActionId, validateAction, updateAction);
router.delete('/:action_id', validateActionId, deleteAction);

module.exports = router;
