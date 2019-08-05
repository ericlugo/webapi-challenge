const actions = require(`../data/helpers/actionModel.js`);
const projects = require(`../data/helpers/projectModel.js`);
const validations = (module.exports = {});

validations.validateProjectId = async function(request, response, next) {
  try {
    const project_id = request.params.project_id;
    const project = await projects.get(project_id);

    project
      ? ((request.project_id = project_id), next())
      : response.status(400).json({
          success: false,
          message: `Invalid Project ID`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to validate Project ID.\n${error}`,
    });
  }
};

validations.validateActionId = async function(request, response, next) {
  try {
    const action_id = request.params.action_id;
    const action = await actions.get(action_id);

    action
      ? ((request.action_id = action_id), next())
      : response.status(400).json({
          success: false,
          message: `Invalid Action ID`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to validate Action ID.\n${error}`,
    });
  }
};

validations.validateProject = function(request, response, next) {
  try {
    const newProject = { ...request.body };

    newProject.name
      ? newProject.description
        ? next()
        : response.status(400).json({
            success: false,
            message: `Missing Required. "Name"`,
          })
      : response.status(400).json({
          success: false,
          message: `Missing Required. "Description"`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to validate Project.\n${error}`,
    });
  }
};

validations.validateAction = function(request, response, next) {
  try {
    const newAction = { ...request.body, ...request.project_id };

    newAction.description
      ? newAction.notes
        ? next()
        : response.status(400).json({
            success: false,
            message: `Missing Required. "Notes"`,
          })
      : response.status(400).json({
          success: false,
          message: `Missing Required. "Description"`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to validate Action.\n${error}`,
    });
  }
};
