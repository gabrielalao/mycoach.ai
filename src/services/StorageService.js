
import {
  generateVideoThumbnails,
} from "@rajesh896/video-thumbnails-generator";

import { storage } from "../firebase";

function generateAndUploadThumbnail(videoFile) {
  return new Promise((resolve, reject) => {
    generateVideoThumbnails(videoFile, 1).then((thumbs) => {
      const storageRef = storage.ref(`/thumbs/${videoFile.name}.png`);
      const uploadTask = storageRef.putString(thumbs[0], 'data_url');
  
      uploadTask.on("state_changed", null, (error) => {
        reject(error);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {            
          resolve(downloadURL);
        })
      });
    });
  }) 
}

function uploadVideoFile(videoFile) {
  return new Promise((resolve, reject) => {
    const storageRef = storage.ref(`/videos/${videoFile.name}`);
    const uploadTask = storageRef.put(videoFile);

    uploadTask.on("state_changed", null, (err) => {
        reject(err);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {            
          resolve(downloadURL);
        })
      }
    )
  })
}

const StorageService = {
  generateAndUploadThumbnail,
  uploadVideoFile,
};

export default StorageService;
