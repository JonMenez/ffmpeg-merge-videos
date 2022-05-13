import {Router} from 'restify-router';
import {TaskController} from '../controllers/taskflow.controller';

const routerTaskInstance = new Router();


routerTaskInstance.post('/processvideo', async (req, res) => {
  try {
    const arrayFilesVideos = req.body.inputVideos;
    res.json(arrayFilesVideos);
    await TaskController.initProcess(arrayFilesVideos);
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.json({success: false, error: true, message: errorMessage});
  }
});


export default routerTaskInstance;
