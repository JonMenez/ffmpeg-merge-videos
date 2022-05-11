import {ffmpegConcatController, ffmpegController} from './ffmpeg.controller';
import {videosourceController} from './videosources.controller';
import {videoStatusController} from './videostatus.controller';


class TASKFLOW {
  async initProcess(listOfVideos:string) {
    try {
      const context = {
        userId: '6275bb583af43b4205af521a',
      };

      const VideosSrc = await videosourceController.createVideoSource(listOfVideos, context);

      await videoStatusController.createVideoStatus(VideosSrc._id, context, 'pending');

      let isVideoAvailable = false;
      try {
        await ffmpegConcatController.processVideo(listOfVideos, VideosSrc.fileSources.tmp, context, VideosSrc._id);
      } catch (error) {
        await videoStatusController.createVideoStatus(VideosSrc._id, context, 'failed');
        isVideoAvailable = true;
      }
      await videoStatusController.createVideoStatus(VideosSrc._id, context, 'completed');
      if (isVideoAvailable) {
        return VideosSrc;
      };
      return {};
    } catch (err) {
      throw err;
    }
  }
}

const TaskController = new TASKFLOW();

export {
  TaskController,
};
