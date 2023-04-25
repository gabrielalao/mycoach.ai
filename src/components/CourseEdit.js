import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import CourseItem from "./CourseItem";
import VideoService from "../services/VideoService";
import postConverter from "../utils/converter";
import useCouseStore from "../store/useCourseStore";
import CourseUpload from "./CourseUpload";

const CourseEdit = () => {
  const { activeCourse } = useCouseStore();
  const [videos, loading] = useCollectionData(
    VideoService
      .getAll()
      .where("course_id", "==", activeCourse ? activeCourse.id : "")
      .orderBy("created_at", "asc")
      .withConverter(postConverter)
  );

  if (activeCourse == null) {
    return (
      <div className="col-65">
        <div id="course-edit">
          <input type="text" defaultValue="Please select the course first" className="course-edit_title" />
        </div>
      </div>
    )
  }

  return (
    <div className="col-65">
      <div id="course-edit">
        <CourseUpload/>
        {
          loading ? (
            <div className="label-center">Loading course items...</div>
          ) : (
            videos && videos.length > 0 ? (
              videos.map((video) => (
                <CourseItem
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  description={video.description}
                  video_url={video.video_url}
                  thumb_url={video.thumb_url}
                />
            )))
            : (
              <div className="label-center">Empty course items</div>
            )
          )
        }
      </div>
    </div>
  );
};

export default CourseEdit;
