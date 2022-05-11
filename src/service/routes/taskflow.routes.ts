import {Router} from 'restify-router';
import {TaskController} from '../controllers/taskflow.controller';

const routerTaskInstance = new Router();


routerTaskInstance.post('/processvideo', async (req, res) => {
  try {
    const {listOfVideos} = req.body;
    res.json({listOfVideos});
    await TaskController.initProcess(listOfVideos);
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.json({success: false, error: true, message: errorMessage});
  }
});


export default routerTaskInstance;
