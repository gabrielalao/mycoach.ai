import React from "react";
import useCouseStore from "../store/useCourseStore";

const CourseItem = ({ id, position, title, description, thumb_url, video_url }) => {
  const { setActiveVideo } = useCouseStore();

  const onThumbClick = () => {
    setActiveVideo({
      id,
      position,
      title,
      description,
      thumb_url,
      video_url
    });
  }

  return (
    <div className="course_item">
      <p className="position">{position}</p>
      <img
        className="thumb"
        src={thumb_url}
        alt="thumbnail"
        onClick={onThumbClick}
      />
      <div className="course_details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CourseItem;
