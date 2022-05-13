import {ffmpegConcatController} from './ffmpeg.controller';
import {videoFlowController} from './videoflow.controller';
import {videosourceController} from './videosources.controller';
import {videoStatusController} from './videostatus.controller';


class TASKFLOW {
  async initProcess(arrayFilesVideos:Array<string>) {
    try {
      const pathOutput = '/Users/rosi/Documents/Joan/Bootcamp-Krowdy/01.BackEnd/Tarea/src/internalapp/output';

      // Unir los videos de dos archivos txt
      const pathsVideos = await ffmpegConcatController.processVideo(arrayFilesVideos, pathOutput);

      // Crear archivo con los videos nuevos
      const txtFile = await ffmpegConcatController.createFileTxt(pathsVideos);

      // Unir videos del nuevo archivo txt
      await ffmpegConcatController.ffmpegConcat(txtFile, pathOutput);
    } catch (err) {
      throw err;
    }
  }
}

const TaskController = new TASKFLOW();

export {
  TaskController,
};
