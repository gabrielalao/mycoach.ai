import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import CourseService from "../services/CourseService";
import postConverter from "../utils/converter";
import useCouseStore from "../store/useCourseStore";
import { serverTimestamp } from "../firebase";

const Courses = () => {
  const [courses] = useCollectionData(
    CourseService
      .getAll()
      .orderBy("created_at", "asc")
      .withConverter(postConverter)
  );
  const { activeCourse, setActiveCourse, setIsLoading } = useCouseStore();
  
  const onClickNew = () => {
    const title = prompt("Please input a new course name");
    if (!title)
      return;
    
    var data = {
      title: title,
      created_at: serverTimestamp()
    };

    setIsLoading(true);
    CourseService.create(data)
      .then(() => {
        console.log("New course created");
      })
      .catch(e => {
        alert("Error occured, Please try again.");
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="col-35">
        <p>Your Courses</p>
        <div id="courses">
          {courses && courses.map((course) => (
            <h3
              key={course.id}
              className={
                "course_select" + (activeCourse && activeCourse.id === course.id ? " active" : "")
              }
              onClick={() => setActiveCourse(course)}
            >
              {course.title}
            </h3>
          ))}
        </div>
        <button
          id="new-course"
          className="btn"
          onClick={onClickNew}
        >
          Create New Course
        </button>
      </div>
  );
};

export default Courses;
