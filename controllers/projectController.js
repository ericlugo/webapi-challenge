const actionDb = require(`../data/helpers/actionModel.js`);
const projectDb = require(`../data/helpers/projectModel.js`);
const projectController = (module.exports = {});

projectController.createProject = async function(request, response) {
  try {
    const newProject = await projectDb.insert(request.body);

    newProject
      ? response.status(200).json({
          success: true,
          message: `Success. Project Submitted.`,
          newProject,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to add project.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to add project.\n${error}`,
    });
  }
};

projectController.createAction = async function(request, response) {
  try {
    const newAction = await actionDb.insert({ ...request.body, project_id: request.project });

    newAction
      ? response.status(200).json({
          success: true,
          message: `Success. Action Submitted.`,
          newAction,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to add action.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to add action.\n${error}`,
    });
  }
};

projectController.getProjects = async function(request, response) {
  try {
    const projects = await projectDb.get();

    projects
      ? response.status(200).json({
          success: true,
          message: `Success. Projects retrieved.`,
          projects,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to find projects.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to find projects.\n${error}`,
    });
  }
};

projectController.getProject = async function(request, response) {
  try {
    const project = await projectDb.get(request.project);

    project
      ? response.status(200).json({
          success: true,
          message: `Success. Project retrieved.`,
          project,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to find project.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to find project.\n${error}`,
    });
  }
};

projectController.getActions = async function(request, response) {
  try {
    const actions = await projectDb.getProjectActions(request.project);

    actions
      ? response.status(200).json({
          success: true,
          message: `Success. Project actions retrieved.`,
          actions,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to find project actions.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to find project actions.\n${error}`,
    });
  }
};

projectController.updateProject = async function(request, response) {
  try {
    const updatedProject = await projectDb.update(request.project, { ...request.body });

    updatedProject
      ? response.status(200).json({
          success: true,
          message: `Success. Project Updated.`,
          updatedProject,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to update project.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to update project.\n${error}`,
    });
  }
};

projectController.deleteProject = async function(request, response) {
  try {
    const deletedProject = await projectDb.get(request.project);
    deletedProject.actions.forEach((action) => {
      request.action = action.id;
      actionDb.remove(action.id);
    });
    const deleted = await projectDb.remove(request.project);

    deleted
      ? response.status(200).json({
          success: true,
          message: `Success. Project Deleted.`,
          deletedProject,
        })
      : response.status(400).json({
          success: false,
          message: `Error: Unable to delete project.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error. Unable to delete project.\n${error}`,
    });
  }
};
