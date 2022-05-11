import {Router} from 'restify-router';
import ProfileRoute from './profile.routes';
import UserRoute from './user.routes';
import FlowRoute from './flowvideo.routes';
import TaskFlow from './taskflow.routes';


const routerInstance = new Router();
const listOfRouter = new Router();

listOfRouter.add('/profile', ProfileRoute);
listOfRouter.add('/user', UserRoute);
listOfRouter.add('/flowvideos', FlowRoute);
listOfRouter.add('/taskflow', TaskFlow);


routerInstance.add('/api/v1', listOfRouter);


export default routerInstance;
