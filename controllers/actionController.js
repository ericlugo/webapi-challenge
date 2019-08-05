const actionDb = require(`../data/helpers/actionModel.js`);
const actionController = (module.exports = {});

actionController.getActions = async function(request, response) {
  try {
    const actions = await actionDb.get();

    actions
      ? response.status(200).json({
          success: true,
          message: `Success. Actions retrieved.`,
          actions,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to find actions.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to find actions.\n${error}`,
    });
  }
};

actionController.getAction = async function(request, response) {
  try {
    const action = await actionDb.get(request.action);

    action
      ? response.status(200).json({
          success: true,
          message: `Success. Action retrieved.`,
          action,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to find action.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to find action.\n${error}`,
    });
  }
};

actionController.updateAction = async function(request, response) {
  try {
    const updatedAction = await actionDb.update(request.action, { ...request.body });

    updatedAction
      ? response.status(200).json({
          success: true,
          message: `Success. Action Updated.`,
          updatedAction,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to update action.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to update action.\n${error}`,
    });
  }
};

actionController.deleteAction = async function(request, response) {
  try {
    const deletedAction = await actionDb.get(request.action);
    const deleted = await actionDb.remove(request.action);

    deleted
      ? response.status(200).json({
          success: true,
          message: `Success. Action Deleted.`,
          deletedAction,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to delete action.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to delete action.\n${error}`,
    });
  }
};
