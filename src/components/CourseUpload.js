import React, { useState } from "react";

import useCouseStore from "../store/useCourseStore";
import { serverTimestamp } from "../firebase";
import StorageService from "../services/StorageService";
import VideoService from "../services/VideoService";

const CourseUpload = () => {
  const { activeCourse, setIsLoading } = useCouseStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile]  = useState(null);

  const resetInputs = () => {
    setTitle("");
    setDescription("");
    setVideoFile(null);
  }
  
  const onFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    e.preventDefault();
  }

  const onUpload = () => {
    if (!title || !description) {
      return alert("Please fill the title and description.");
    }
    if (!videoFile) {
      return alert("Please upload video file.");
    }

    try {
      setIsLoading(true);
      Promise.all([        
        StorageService.uploadVideoFile(videoFile),
        StorageService.generateAndUploadThumbnail(videoFile),
      ]).then(async (urls) => {
        var data = {
          title,
          description,
          video_url: urls[0],
          thumb_url: urls[1],
          course_id: activeCourse.id,
          created_at: serverTimestamp()
        };    
        await VideoService.create(data);
        resetInputs();
      }).catch((e) => {
        alert("Error occured, Please try again.");
        console.log(e);
      }).finally(() => {
        setIsLoading(false);
      })
    } catch (e) {
      console.log("upload video file error", e);
    }
  }

  return (
    <>
      <input
        type="text"
        defaultValue={activeCourse.title}
        className="course-edit_title"
      />
      <div className="course-edit_upload">
        <input
          id="upload-video"
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        <label htmlFor="upload-video">Upload</label>
        <div className="course-edit_upload_details">
          <input
            type="text"
            id="upload-title"
            placeholder="New Video Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            id="upload-desc"
            placeholder="New Video Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="upload-btn"
          id="upload"
          onClick={onUpload}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CourseUpload;
