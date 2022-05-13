/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */

import {spawn} from 'child_process';
import {videoStatusController} from './videostatus.controller';
import {writeFile} from 'node:fs';
import path from 'path';

const AsyncFFMPEG = ( principalCommand: any, args: any, options: any ) =>
  new Promise((resolve, reject)=> {
    const child = spawn(principalCommand, args, options);

    child.stdout.on('data', (data) => {
      console.log(`Output: ${data}`);
    });

    child.stderr.on('data', (data: any) => {
      console.log(`LogLevel: ${data}`);
      if (data.includes('Error')) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Error al procesar archivo');
      };
    });

    child.on('close', (code) => {
      resolve(code);
    });
  });

class FFMPEGMANAGER {
  // cambiar comando a ffprobe y validar si el video el corrupto
  // usar este codigo
  async ffprobe() {
    // const inputVideoSrc = `${__dirname}/${inputVideoSource}`;
    // const outputVideoSrc = createPathTemp(inputVideoSource, 'mp4');

    // const principalCommand = 'ffprobe';
    // const args = [
    //   '-fflags',
    //   '+genpts',
    //   '-i',
    //   `${inputVideoSrc}`,
    //   '-r',
    //   '24',
    //   `${outputVideoSrc}`];
    // const options = {
    //   shell: true,
    // };

    // const child = spawn(principalCommand, args, options);

    // child.stdout.on('data', (data) => {
    //   console.log(`Output: ${data}`);
    // });

    // child.stderr.on('data', (data) => {
    //   console.log(`LogLevel: ${data}`);
    // });

    // child.on('close', (code) => {
    //   console.log('🚀 ~ file: index.ts ~ line 25 ~ child.on ~ code', code);
    // });

    // console.log(outputVideoSrc);
    return true;
  }

  async ffmpeg(inputVideoSource: string, outputVideoSrc: string) {
    try {
      const inputVideoSrc = `${inputVideoSource}`;
      const principalCommand = 'ffmpeg';
      const args = [
        '-fflags',
        '+genpts',
        '-i',
        `${inputVideoSrc}`,
        '-r',
        '24',
        `${outputVideoSrc}`];
      const options = {
        shell: true,
      };

      await AsyncFFMPEG(principalCommand, args, options);
      return outputVideoSrc;
    } catch (error) {
      throw error;
    }
  }

  async processVideo(
      inputVideoSource: string,
      outputVideoSrc: string,
      context: any,
      videoSourceId: string) {
    try {
      const isValidFile = await this.ffprobe();
      if (!isValidFile) {
        throw new Error('El archivo es corrupto');
      };
      // // generar mas status de procesamiento de video

      await videoStatusController.createVideoStatus(
          videoSourceId,
          context,
          'doing',
      );

      const outPutPath = await this.ffmpeg(inputVideoSource, outputVideoSrc);
      return outPutPath;
    } catch (error) {
      throw error;
    }
  }
}

class FFMPEGCONCAT {
  async ffmpegConcat(fileInput:string, outputVideoSrc: string) {
    try {
      const inputVideosSrc = fileInput;

      const principalCommand = 'ffmpeg';
      const args = [
        '-f',
        'concat',
        '-safe',
        '0',
        '-i',
        `${inputVideosSrc}`,
        '-c',
        'copy',
        `${outputVideoSrc}.mp4`];
      const options = {
        shell: true,
      };
      await AsyncFFMPEG(principalCommand, args, options);

      return `${outputVideoSrc}.mp4`;
    } catch (error) {
      throw error;
    }
  }

  async createFileTxt(arrayOfVideos:Array<string>) {
    try {
      const [path1, path2] = arrayOfVideos;
      const commandTxt = 'file ' + path1 + '\nfile ' + path2;
      const outputFile = 'output3.txt';
      const outputPath = path.join(__dirname, '../../internalapp', outputFile);

      writeFile(outputPath, commandTxt, function(err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });

      return outputPath;
    } catch (error) {
      throw error;
    }
  }

  async processVideo(
      arrayFilesVideos:Array<string>,
      outputVideoSrc: string) {
    const arrayVideos = [];

    for (let i = 0; i < 2; i++) {
      const outPutPath = await this.ffmpegConcat(arrayFilesVideos[i], outputVideoSrc + (i + 1));
      arrayVideos.push(outPutPath);
    }

    return arrayVideos;
  } catch(error:any) {
    throw error;
  }
}


const ffmpegController = new FFMPEGMANAGER();
const ffmpegConcatController = new FFMPEGCONCAT();

export {
  ffmpegController,
  ffmpegConcatController,
};
