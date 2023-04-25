import React from "react";

const CourseItem = ({ id, position, title, description, thumb_url, video_url }) => {
  return (
    <div className="course_item">
      <p className="position">{position}</p>
      <img className="thumb" src={thumb_url} alt="thumbnail" />
      <div className="course_details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CourseItem;
